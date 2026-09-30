import os
import re
import logging
import httpx
import uvicorn
import traceback
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("mpjs.p2.backend")

app = FastAPI(title="MP Jan Seva (MPJS) - Main Backend Orchestrator", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

P3_STT_SERVICE_URL = os.getenv("P3_STT_SERVICE_URL", "http://localhost:8000/process-audio")
GRIEVANCES_DB: List[dict] = []


def resolve_department(transcript: str, primary_category: Optional[str]) -> str:
    """Keyword matcher ensuring street lights, water, roads, sanitation map correctly."""
    
    # If P3/Gemini returned a valid specific category, use it
    if primary_category and primary_category.strip().capitalize() in ["Electricity", "Water", "Sanitation", "Roads", "Education", "Healthcare"]:
        return primary_category.strip().capitalize()

    text = transcript.lower()

    # 1. Electricity / Street Lights (Check these FIRST)
    if any(k in text for k in ["light", "street light", "electricity", "power", "transformer", "wire", "बिजली", "लाइट", "स्ट्रीट", "जलती", "करंट", "खंभा", "ट्रांसफॉर्मर"]):
        return "Electricity"
        
    # 2. Water Supply
    elif any(k in text for k in ["water", "drainage", "sewer", "pipeline", "leak", "पानी", "ड्रेनेज", "सीवर", "नळ", "पाइप", "सप्लाई"]):
        return "Water"
        
    # 3. Roads & Traffic
    elif any(k in text for k in ["road", "pothole", "traffic", "street", "highway", "सड़क", "गड्ढा", "ट्रैफिक", "रास्ता", "मार्ग"]):
        return "Roads"
        
    # 4. Sanitation
    elif any(k in text for k in ["garbage", "trash", "clean", "waste", "drain", "कचरा", "सफाई", "गंदगी", "नाली"]):
        return "Sanitation"
        
    # 5. Education
    elif any(k in text for k in ["school", "teacher", "education", "book", "स्कूल", "शिक्षक", "पढ़ाई"]):
        return "Education"
        
    # 6. Healthcare
    elif any(k in text for k in ["hospital", "doctor", "medicine", "health", "अस्पताल", "डॉक्टर", "दवा", "इलाज"]):
        return "Healthcare"

    # Default fallback to General instead of Sanitation
    return "Electricity" if "लाइट" in text or "जलती" in text else "General"


def resolve_language(transcript: str, primary_lang: Optional[str]) -> str:
    """Ensures English complaints are tagged correctly as English."""
    has_devanagari = bool(re.search(r'[\u0900-\u097F]', transcript))
    has_english = bool(re.search(r'[a-zA-Z]', transcript))

    if has_english and not has_devanagari:
        return "English"
    if primary_lang and primary_lang.strip().capitalize() in ["Hindi", "English"]:
        return primary_lang.strip().capitalize()
    return "Hindi"


@app.get("/api/v1/grievances", response_model=List[dict])
async def get_all_grievances():
    return GRIEVANCES_DB


@app.post("/api/v1/grievance/process")
async def receive_and_process_grievance(
    file: UploadFile = File(...),
    latitude: Optional[float] = Form(23.2599),
    longitude: Optional[float] = Form(77.4126),
    district: Optional[str] = Form("Bhopal")
):
    try:
        audio_content = await file.read()
        if not audio_content or len(audio_content) == 0:
            raise HTTPException(status_code=400, detail="Uploaded audio file content is empty.")

        filename = file.filename or "report.wav"
        content_type = file.content_type or "audio/wav"
        files = {"file": (filename, audio_content, content_type)}

        # Forward audio payload to P3 AI Engine (Port 8000)
        async with httpx.AsyncClient(timeout=120.0) as client:
            stt_response = await client.post(P3_STT_SERVICE_URL, files=files)

        if stt_response.status_code != 200:
            logger.error(f"P3 processing failed ({stt_response.status_code}): {stt_response.text}")
            raise HTTPException(status_code=502, detail="P3 Speech Engine returned an error.")

        ai_data = stt_response.json()

        raw_transcript = ai_data.get("transcript", "Complaint registered via voice.")
        raw_category = ai_data.get("category") or ai_data.get("department")
        raw_language = ai_data.get("language")

        department = resolve_department(raw_transcript, raw_category)
        language = resolve_language(raw_transcript, raw_language)
        priority = ai_data.get("priority") or "Medium"

        ticket_id = f"MP-04-{len(GRIEVANCES_DB) + 1001}"
        formatted_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        new_record = {
            "id": ticket_id,
            "citizenName": "Citizen (Voice)",
            "language": language,
            "department": department,
            "description": raw_transcript,
            "urgency": priority.capitalize(),
            "district": district or "Bhopal",
            "lat": float(latitude) if latitude is not None else 23.2599,
            "lon": float(longitude) if longitude is not None else 77.4126,
            "status": "Pending",
            "timestamp": ai_data.get("timestamp") or formatted_time
        }

        GRIEVANCES_DB.insert(0, new_record)
        logger.info(f"Grievance {ticket_id} registered successfully under {department} ({language}).")
        return {"status": "success", "data": new_record}

    except HTTPException:
        raise
    except Exception as err:
        logger.error(f"Error handling voice submission: {err}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(err))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)