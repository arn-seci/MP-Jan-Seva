import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from app.services.asr_transcription import process_audio_file
from app.services.triage_engine import classify_grievance

app = FastAPI(
    title="Aawaaz-MP Core Engine",
    version="1.0.0",
    description="Voice Triage & Dialect Normalization API for MP Civic Grievances"
)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Aawaaz-MP Backend"}

@app.post("/api/v1/grievance/process")
async def process_full_voice_grievance(
    audio: UploadFile = File(...),
    latitude: float = Form(...),
    longitude: float = Form(...)
):
    """
    1. Transcribes rural .wav audio + normalizes MP dialect.
    2. Runs LLM Triage to assign standard Hindi text and department code.
    """
    if not audio.filename.endswith(('.wav', '.mp3', '.m4a')):
        raise HTTPException(status_code=400, detail="Invalid audio format. Please upload .wav or .mp3")

    try:
        # Step 1: Read audio file bytes and run Whisper ASR
        audio_bytes = await audio.read()
        asr_result = await process_audio_file(audio_bytes, audio.filename)

        # Step 2: Run LLM Triage Engine on the normalized text
        triage_result = await classify_grievance(asr_result["normalized_transcript"])

        return {
            "status": "PROCESSED",
            "gps": {"latitude": latitude, "longitude": longitude},
            "transcription": asr_result,
            "triage": triage_result.dict() if hasattr(triage_result, 'dict') else triage_result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")