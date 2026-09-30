"""
MP Jan Seva (MPJS) - P3: AI & Speech-to-Text Processing Engine
Hindi & English Voice Grievance Processing & Triage API

Architecture:
  Primary  -> Gemini 3.5 Flash native multimodal audio understanding
              (Hindi/English language ID + Devanagari/English transcription + category)
  Fallback -> Local CPU Whisper-small ASR + Keyword Rule Engine if Gemini fails.
"""

import io
import os
import re
import json
import asyncio
import logging
import warnings
from typing import Optional
from contextlib import asynccontextmanager

from dotenv import load_dotenv
load_dotenv()

# Silence HF/transformers deprecation clutter BEFORE importing them
os.environ.setdefault("TRANSFORMERS_VERBOSITY", "error")
os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", category=UserWarning, module="transformers")
logging.getLogger("transformers").setLevel(logging.ERROR)
logging.getLogger("huggingface_hub").setLevel(logging.ERROR)
logging.getLogger("google_genai.models").setLevel(logging.ERROR)

import librosa
import numpy as np
import torch
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline, WhisperProcessor, WhisperForConditionalGeneration
from google import genai
from google.genai import types

# ============================================================
# Logging Setup
# ============================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("mpjs.p3.audio-triage")

# ============================================================
# Configuration & Setup
# ============================================================

APP_TITLE = "MP Jan Seva (MPJS) - P3 AI & Speech Processing Engine"
APP_VERSION = "3.5.0"

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY environment variable is not set. "
        "Set it via your process manager / secrets store, e.g.:\n"
        "  export GEMINI_API_KEY='<your-key>'"
    )

ai_client = genai.Client(api_key=GEMINI_API_KEY)

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash") # or gemini-1.5-flash
ASR_MODEL_NAME = os.getenv("ASR_MODEL_NAME", "openai/whisper-small")
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

MAX_AUDIO_BYTES = int(os.getenv("MAX_AUDIO_BYTES", str(25 * 1024 * 1024)))

DEVICE = "cuda:0" if torch.cuda.is_available() else "cpu"
TORCH_DTYPE = torch.float16 if torch.cuda.is_available() else torch.float32

VALID_LANGUAGES = {"Hindi", "English"}
VALID_CATEGORIES = {"Electricity", "Water", "Sanitation", "Roads", "Education", "Healthcare", "Unclassified"}
DEFAULT_LANGUAGE = "Hindi"
DEFAULT_CATEGORY = "Unclassified"

MIME_MAP = {
    "audio/wav": "audio/wav",
    "audio/x-wav": "audio/wav",
    "audio/wave": "audio/wav",
    "audio/mpeg": "audio/mp3",
    "audio/mp3": "audio/mp3",
    "audio/mp4": "audio/mp4",
    "audio/m4a": "audio/mp4",
    "audio/x-m4a": "audio/mp4",
    "audio/ogg": "audio/ogg",
    "audio/webm": "audio/webm",
    "audio/flac": "audio/flac",
    "audio/aac": "audio/aac",
}
EXT_MIME_MAP = {
    ".wav": "audio/wav",
    ".mp3": "audio/mp3",
    ".m4a": "audio/mp4",
    ".mp4": "audio/mp4",
    ".ogg": "audio/ogg",
    ".oga": "audio/ogg",
    ".webm": "audio/webm",
    ".flac": "audio/flac",
    ".aac": "audio/aac",
}
DEFAULT_MIME = "audio/wav"


# ============================================================
# Rule-Based Heuristic Triage Fallback
# ============================================================

def fallback_keyword_triage(text: str) -> dict:
    """Inspects transcript text to recover category and language."""
    lower = text.lower()
    
    # 1. Electricity / Street Lights FIRST
    if any(k in lower for k in ["light", "street light", "electricity", "power", "transformer", "wire", "बिजली", "लाइट", "स्ट्रीट", "जलती", "करंट", "खंभा", "ट्रांसफॉर्मर"]):
        category = "Electricity"
    elif any(k in lower for k in ["water", "drainage", "sewer", "pipeline", "leak", "पानी", "ड्रेनेज", "सीवर", "नळ", "पाइप", "सप्लाई"]):
        category = "Water"
    elif any(k in lower for k in ["road", "pothole", "traffic", "street", "highway", "सड़क", "गड्ढा", "ट्रैफिक", "रास्ता", "मार्ग"]):
        category = "Roads"
    elif any(k in lower for k in ["garbage", "trash", "clean", "waste", "drain", "कचरा", "सफाई", "गंदगी", "नाली"]):
        category = "Sanitation"
    elif any(k in lower for k in ["school", "teacher", "education", "book", "स्कूल", "शिक्षक", "पढ़ाई"]):
        category = "Education"
    elif any(k in lower for k in ["hospital", "doctor", "medicine", "health", "अस्पताल", "डॉक्टर", "दवा", "इलाज"]):
        category = "Healthcare"
    else:
        category = "Electricity" if any(w in lower for w in ["लाइट", "जलती"]) else "Unclassified"

    # 2. Language Detection
    has_devanagari = bool(re.search(r'[\u0900-\u097F]', text))
    has_english = bool(re.search(r'[a-zA-Z]', text))

    if has_english and not has_devanagari:
        language = "English"
    else:
        language = "Hindi"

    return {"category": category, "language": language}

    # 2. Language & Script Cleanup
    # Check for Devanagari script unicode range (\u0900 - \u097F)
    has_devanagari = bool(re.search(r'[\u0900-\u097F]', text))
    has_arabic_urdu = bool(re.search(r'[\u0600-\u06FF]', text))
    has_english = bool(re.search(r'[a-zA-Z]', text))

    if has_english and not has_devanagari and not has_arabic_urdu:
        language = "English"
    else:
        language = "Hindi"

    return {"category": category, "language": language}


# ============================================================
# Startup Pre-loading (Lifespan)
# ============================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Pre-loading local Whisper model to prevent runtime download delays...")
    try:
        await asyncio.to_thread(WhisperProcessor.from_pretrained, ASR_MODEL_NAME)
        await asyncio.to_thread(WhisperForConditionalGeneration.from_pretrained, ASR_MODEL_NAME)
        logger.info("Whisper model pre-loaded successfully.")
    except Exception as e:
        logger.warning(f"Failed to pre-load Whisper: {e}")
    yield


app = FastAPI(title=APP_TITLE, version=APP_VERSION, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TriageResponse(BaseModel):
    status: str
    language: str
    transcript: str
    category: str
    priority: str
    engine: str


def resolve_mime_type(upload: UploadFile) -> str:
    if upload.content_type:
        mapped = MIME_MAP.get(upload.content_type.lower())
        if mapped:
            return mapped
    if upload.filename:
        _, ext = os.path.splitext(upload.filename.lower())
        if ext in EXT_MIME_MAP:
            return EXT_MIME_MAP[ext]
    logger.warning(
        "Could not resolve MIME type from content_type=%r filename=%r; defaulting to %s",
        upload.content_type, upload.filename, DEFAULT_MIME,
    )
    return DEFAULT_MIME


def clamp_language(value: Optional[str]) -> str:
    if isinstance(value, str) and value.strip().capitalize() in VALID_LANGUAGES:
        return value.strip().capitalize()
    return DEFAULT_LANGUAGE


def clamp_category(value: Optional[str]) -> str:
    if isinstance(value, str) and value.strip().capitalize() in VALID_CATEGORIES:
        return value.strip().capitalize()
    return DEFAULT_CATEGORY


# ============================================================
# Local Whisper Fallback Processing
# ============================================================

def preprocess_audio(audio_bytes: bytes) -> np.ndarray:
    audio, _ = librosa.load(io.BytesIO(audio_bytes), sr=16000, mono=True)
    if len(audio) > 160000:
        audio = audio[:160000]
    return audio.astype(np.float32)


def run_local_whisper_sync(audio_bytes: bytes) -> dict:
    processor = AutoProcessor.from_pretrained(ASR_MODEL_NAME)
    model = AutoModelForSpeechSeq2Seq.from_pretrained(
        ASR_MODEL_NAME,
        torch_dtype=TORCH_DTYPE,
        low_cpu_mem_usage=True,
        use_safetensors=True,
    )
    model.to(DEVICE)
    pipeline_device = 0 if torch.cuda.is_available() else -1

    asr = pipeline(
        "automatic-speech-recognition",
        model=model,
        tokenizer=processor.tokenizer,
        feature_extractor=processor.feature_extractor,
        max_new_tokens=64,
        chunk_length_s=15,
        batch_size=8,
        return_timestamps=False,
        torch_dtype=TORCH_DTYPE,
        device=pipeline_device,
    )

    audio_array = preprocess_audio(audio_bytes)
    result = asr(audio_array, generate_kwargs={"task": "transcribe"})
    raw_transcript = (result.get("text") or "").strip()

    fallback_meta = fallback_keyword_triage(raw_transcript)

    return {
        "language": fallback_meta["language"],
        "transcript": raw_transcript or "आवाज स्पष्ट नहीं है",
        "category": fallback_meta["category"],
        "priority": "Medium"
    }


# ============================================================
# Primary Engine: Gemini 3.5 Flash
# ============================================================

GEMINI_PROMPT = """
You are the AI triage engine for MP Jan Seva (MPJS) Citizen Grievance Portal in Madhya Pradesh.
Analyze this voice recording from a citizen and return STRICT JSON output.

STRICT SCRIPT & LANGUAGE RULES:
1. "language": Must be "Hindi" or "English". If citizen speaks in English, output "English".
2. "transcript": MUST be exact verbatim text. 
   - IF SPOKEN IN HINDI: MUST USE DEVANAGARI SCRIPT ONLY (हिंदी). NEVER USE URDU/ARABIC SCRIPT.
   - IF SPOKEN IN ENGLISH: USE ENGLISH LATIN ALPHABET.
3. "category": Must be strictly one of: "Electricity", "Water", "Sanitation", "Roads", "Education", "Healthcare", or "Unclassified".
   - "water", "drainage", "sewer", "पानी", "ड्रेनेज" -> "Water"
   - "light", "electricity", "power", "बिजली", "लाइट" -> "Electricity"
   - "road", "pothole", "सड़क", "गड्ढा" -> "Roads"
   - "garbage", "trash", "कचरा", "सफाई" -> "Sanitation"

JSON Schema:
{
  "language": "Hindi" or "English",
  "category": "Electricity" or "Water" or "Sanitation" or "Roads" or "Education" or "Healthcare" or "Unclassified",
  "priority": "High" or "Medium" or "Low",
  "transcript": "<Exact verbatim transcription>"
}
"""


async def run_gemini_triage(audio_bytes: bytes, mime_type: str) -> dict:
    audio_part = types.Part.from_bytes(data=audio_bytes, mime_type=mime_type)

    response = await ai_client.aio.models.generate_content(
        model=GEMINI_MODEL,
        contents=[audio_part, GEMINI_PROMPT],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.0,
            tool_config=types.ToolConfig(
                function_calling_config=types.FunctionCallingConfig(
                    mode=types.FunctionCallingConfigMode.NONE
                )
            ),
        ),
    )

    raw_text = getattr(response, "text", None)
    if not raw_text:
        raise ValueError("Gemini returned an empty response")

    cleaned_json = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw_text.strip(), flags=re.MULTILINE).strip()
    res_data = json.loads(cleaned_json)

    transcript = (res_data.get("transcript") or "").strip()
    category = clamp_category(res_data.get("category"))
    language = clamp_language(res_data.get("language"))

    # Apply Keyword Fallback Guardrail if Category is Unclassified or Language Mismatched
    fallback_meta = fallback_keyword_triage(transcript)
    if category == "Unclassified" and fallback_meta["category"] != "Unclassified":
        category = fallback_meta["category"]

    if fallback_meta["language"] == "English" and language == "Hindi":
        # Overriding language tag if transcript contains pure English words
        language = "English"

    return {
        "language": language,
        "transcript": transcript,
        "category": category,
        "priority": res_data.get("priority", "Medium")
    }


# ============================================================
# API Routes
# ============================================================

@app.post("/process-audio", response_model=TriageResponse)
@app.post("/process-audio/", response_model=TriageResponse)
async def process_audio(file: UploadFile = File(...)):
    audio_bytes = await file.read()

    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Uploaded audio file is empty.")
    if len(audio_bytes) > MAX_AUDIO_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"Audio exceeds max allowed size of {MAX_AUDIO_BYTES} bytes.",
        )

    mime_type = resolve_mime_type(file)

    # STEP 1: Try Gemini 3.5 Flash with retry loop
    for attempt in range(2):
        try:
            result = await run_gemini_triage(audio_bytes, mime_type)
            logger.info(
                "[P3 Gemini 3.5 OK] language=%s category=%s transcript=%r",
                result["language"], result["category"], result["transcript"],
            )
            return TriageResponse(status="success", engine="gemini-3.5-flash", **result)

        except Exception as gemini_err:
            if attempt == 0:
                logger.warning("[P3 Gemini Retry] Transient error (%s). Retrying in 1s...", gemini_err)
                await asyncio.sleep(1.0)
            else:
                logger.warning("[P3 Gemini Error] %s — falling back to Whisper", gemini_err)

    # STEP 2: Local Whisper Fallback
    try:
        result = await asyncio.to_thread(run_local_whisper_sync, audio_bytes)
        logger.info("[P3 Local Whisper OK] transcript=%r", result["transcript"])
        return TriageResponse(status="success", engine="whisper-small-local", **result)

    except Exception as local_err:
        logger.error("[P3 Local Error] %s", local_err)
        return TriageResponse(
            status="error",
            language=DEFAULT_LANGUAGE,
            transcript="आवाज प्रोसेसिंग में समस्या आई",
            category=DEFAULT_CATEGORY,
            priority="Medium",
            engine="none",
        )


@app.get("/")
@app.get("/health")
def health():
    return {
        "status": "online",
        "service": "MP Jan Seva (MPJS) - P3 AI Processing Engine",
        "engine": "Gemini 3.5 Flash + Local Whisper Fallback",
        "version": APP_VERSION,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=HOST, port=PORT, reload=False)