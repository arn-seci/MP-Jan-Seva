import os
import re
import json
import shutil
import tempfile
import logging
from typing import Dict, List, Tuple
import whisper

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("aawaaz-mp.asr")

WHISPER_MODEL_NAME = os.getenv("WHISPER_MODEL_NAME", "base")  # Use 'base' or 'small' for faster hackathon speed
_model = None

def get_whisper_model():
    global _model
    if _model is None:
        logger.info(f"Loading Whisper model: {WHISPER_MODEL_NAME}")
        _model = whisper.load_model(WHISPER_MODEL_NAME)
    return _model

def load_slang_lexicon() -> Dict[str, str]:
    json_path = os.path.join("app", "data", "mp_slang_lexicon.json")
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def normalize_mp_slang(text: str) -> Tuple[str, List[str]]:
    slang_dict = load_slang_lexicon()
    sorted_keys = sorted(slang_dict.keys(), key=len, reverse=True)
    
    if not sorted_keys:
        return text, []

    pattern = re.compile("|".join(re.escape(k) for k in sorted_keys))
    matched_terms: List[str] = []

    def _replace(match: "re.Match") -> str:
        term = match.group(0)
        matched_terms.append(term)
        return slang_dict[term]

    normalized = pattern.sub(_replace, text)
    return normalized, matched_terms

async def process_audio_file(file_bytes: bytes, filename: str) -> dict:
    tmp_path = None
    try:
        ext = os.path.splitext(filename)[1].lower() or ".wav"
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
            tmp_path = tmp.name
            tmp.write(file_bytes)

        model = get_whisper_model()
        logger.info(f"Transcribing audio file: {filename}")
        
        result = model.transcribe(
            tmp_path,
            language="hi",
            task="transcribe",
            fp16=False,
            verbose=False
        )

        raw_text = (result.get("text") or "").strip()
        detected_lang = result.get("language", "hi")
        normalized_text, matched_terms = normalize_mp_slang(raw_text)

        return {
            "filename": filename,
            "detected_language": detected_lang,
            "raw_transcript": raw_text,
            "normalized_transcript": normalized_text,
            "slang_terms_mapped": matched_terms,
            "whisper_model": WHISPER_MODEL_NAME
        }
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)