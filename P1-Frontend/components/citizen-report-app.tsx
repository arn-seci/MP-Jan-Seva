"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Mic, Square, MapPin, Navigation, CheckCircle2, AlertTriangle, Send, RotateCcw, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { blobToWav } from "@/lib/wav"
import { translations, type Language, type StatusKey } from "@/lib/translations"

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/grievance/process',
        destination: 'http://127.0.0.1:8001/api/v1/grievance/process',
      },
      {
        source: '/api/v1/:path*',
        destination: 'http://127.0.0.1:8001/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;

// Configured for P2 backend on Port 8001
const DEFAULT_ENDPOINT_URL = "/api/v1/grievance/process"
const ENDPOINT_URL = "/api/v1/grievance/process"

const MAX_FILE_BYTES = 25 * 1024 * 1024 // 25 MB

const PREFERRED_MIME_TYPES = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"]

function pickSupportedMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined" || !MediaRecorder.isTypeSupported) return undefined
  return PREFERRED_MIME_TYPES.find((type) => MediaRecorder.isTypeSupported(type))
}

type Coords = { lat: number; lng: number; accuracy: number }

type GrievanceResult = {
  transcript: string
  category: string
  language: string
}

// Labels for Hindi and English voice results feedback
const RESULT_LABELS: Record<Language, { transcript: string; category: string; language: string }> = {
  en: { transcript: "Transcript", category: "Department", language: "Language detected" },
  hi: { transcript: "विवरण", category: "विभाग", language: "भाषा" },
}

function formatLat(lat: number) {
  return `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}`
}

function formatLng(lng: number) {
  return `${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? "E" : "W"}`
}

export function CitizenReportApp() {
  const [lang, setLang] = useState<Language>("en")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [status, setStatus] = useState<StatusKey>("default")
  const [hasRecording, setHasRecording] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [coords, setCoords] = useState<Coords | null>(null)
  const [result, setResult] = useState<GrievanceResult | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioBlobRef = useRef<Blob | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const isSubmittingRef = useRef(false)
  const isMountedRef = useRef(true)

  const t = translations[lang]

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!("geolocation" in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        })
      },
      () => {
        // Bhopal default location fallback
        setCoords({ lat: 23.2599, lng: 77.4126, accuracy: 100 })
      },
      { enableHighAccuracy: true, timeout: 5000 },
    )
  }, [])

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }, [])

  async function startRecording() {
    setErrorMessage(null)
    setStatus("default")
    setResult(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []
      audioBlobRef.current = null

      const mimeType = pickSupportedMimeType()
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream)
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }
      recorder.onstop = () => {
        const recorded = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        })
        stopStream()
        setIsConverting(true)
        blobToWav(recorded)
          .then((wav) => {
            audioBlobRef.current = wav
            setHasRecording(true)
          })
          .catch(() => {
            audioBlobRef.current = null
            setStatus("error")
            setErrorMessage(t.errors.uploadFailed)
          })
          .finally(() => setIsConverting(false))
      }
      recorder.start()
      mediaRecorderRef.current = recorder
      setIsRecording(true)
      setHasRecording(false)
    } catch {
      setStatus("error")
      setErrorMessage(t.errors.micDenied)
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
    mediaRecorderRef.current = null
    setIsRecording(false)
  }

  function handleRecordToggle() {
    if (isProcessing || isConverting) return
    if (isRecording) {
      stopRecording()
    } else {
      void startRecording()
    }
  }

  function getPosition(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve) => {
      if (!("geolocation" in navigator)) {
        resolve({ lat: coords?.lat ?? 23.2599, lng: coords?.lng ?? 77.4126 })
        return
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve({ lat: coords?.lat ?? 23.2599, lng: coords?.lng ?? 77.4126 }),
        { enableHighAccuracy: true, timeout: 5000 },
      )
    })
  }

  async function handleSubmit() {
    const audioBlob = audioBlobRef.current
    if (!audioBlob || isSubmittingRef.current) return

    if (audioBlob.size > MAX_FILE_BYTES) {
      setStatus("error")
      setErrorMessage(t.errors.fileTooLarge)
      return
    }

    isSubmittingRef.current = true
    setErrorMessage(null)
    setIsProcessing(true)

    const activeCoords = await getPosition()

    try {
      const formData = new FormData()
      formData.append("file", audioBlob, "report.wav")
      formData.append("latitude", String(activeCoords.lat))
      formData.append("longitude", String(activeCoords.lng))
      formData.append("district", "Bhopal")

      const response = await fetch(ENDPOINT_URL, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        body: formData,
      })

      if (!response.ok) {
        let detail = `Request failed with status ${response.status}`
        try {
          const errBody = await response.json()
          if (typeof errBody?.detail === "string") {
            detail = errBody.detail
          } else if (errBody?.detail) {
            detail = JSON.stringify(errBody.detail)
          }
        } catch {
          // Non-JSON response body fallback
        }
        throw new Error(detail)
      }

      const resData = await response.json()
      const grievance = resData?.data || resData?.grievance

      if (!isMountedRef.current) return

      setResult({
        transcript: grievance?.description || grievance?.transcript || "Grievance submitted successfully.",
        category: grievance?.department || grievance?.category || "Unclassified",
        language: grievance?.language || "Hindi",
      })
      setStatus("success")
      setHasRecording(false)
      audioBlobRef.current = null
    } catch (err: any) {
      if (!isMountedRef.current) return
      setStatus("error")
      setErrorMessage(typeof err?.message === "string" ? err.message : t.errors.uploadFailed)
    } finally {
      isSubmittingRef.current = false
      if (isMountedRef.current) setIsProcessing(false)
    }
  }

  function handleReset() {
    setStatus("default")
    setHasRecording(false)
    setIsRecording(false)
    setErrorMessage(null)
    setResult(null)
    audioBlobRef.current = null
    chunksRef.current = []
  }

  const helperText = isProcessing
    ? t.processingHelper
    : isConverting
      ? t.processingHelper
      : isRecording
        ? t.recordingHelper
        : t.recordHelper

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background">
      <div className="flex justify-end px-5 pt-5">
        <div
          role="group"
          aria-label="Language selector"
          className="inline-flex items-center rounded-full border border-border bg-card p-1 shadow-sm"
        >
          {(["en", "hi"] as Language[]).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                lang === code
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {translations[code].langLabel}
            </button>
          ))}
        </div>
      </div>

      <header className="px-6 pt-6 pb-2 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MapPin className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="text-balance text-2xl font-bold leading-tight text-foreground">MP Jan Seva (MPJS)</h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{t.appSubtitle}</p>
      </header>

      <section className="px-5 pt-4">
        <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Navigation className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-semibold text-foreground">{t.locationTitle}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <CoordItem label={t.latitude} value={coords ? formatLat(coords.lat) : "—"} />
            <CoordItem label={t.longitude} value={coords ? formatLng(coords.lng) : "—"} />
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-accent py-1.5 text-xs font-medium text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {t.accuracy}: {coords ? `± ${Math.round(coords.accuracy)} m` : "—"}
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        <button
          type="button"
          onClick={handleRecordToggle}
          disabled={isProcessing || isConverting}
          aria-label={isRecording ? t.tapToStop : t.recordHelper}
          className={cn(
            "relative flex h-40 w-40 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 disabled:opacity-60",
            isRecording
              ? "bg-destructive text-white shadow-[0_0_0_12px_oklch(0.577_0.245_27.325_/_0.15)]"
              : "bg-primary text-primary-foreground shadow-[0_0_0_12px_oklch(0.52_0.13_155_/_0.12)] hover:brightness-105",
          )}
        >
          {isRecording && (
            <span className="absolute inset-0 animate-ping rounded-full bg-destructive/30" aria-hidden="true" />
          )}
          {isRecording ? (
            <Square className="h-14 w-14 fill-current" aria-hidden="true" />
          ) : (
            <Mic className="h-16 w-16" aria-hidden="true" />
          )}
        </button>
        <p className="mt-8 text-center text-lg font-semibold leading-snug text-foreground">{helperText}</p>
      </section>

      <div className="px-5">
        {hasRecording && !isProcessing && !isConverting && (status === "default" || status === "error") ? (
          <button
            type="button"
            onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-sm transition-colors hover:brightness-105"
          >
            <Send className="h-5 w-5" aria-hidden="true" />
            {t.submit}
          </button>
        ) : isConverting || isProcessing ? (
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground opacity-70"
          >
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            {t.submitting}
          </button>
        ) : status === "success" || status === "warning" ? (
          <button
            type="button"
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-4 text-base font-bold text-foreground shadow-sm transition-colors hover:bg-accent"
          >
            <RotateCcw className="h-5 w-5" aria-hidden="true" />
            {t.recordAgain}
          </button>
        ) : null}
      </div>

      <section className="px-5 pb-8 pt-4">
        <StatusCard status={status} isProcessing={isProcessing} errorMessage={errorMessage} t={t} />
        {(status === "success" || status === "warning") && result ? (
          <ResultDetails result={result} lang={lang} />
        ) : null}
      </section>
    </div>
  )
}

function CoordItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary px-3 py-2.5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-base font-bold tracking-tight text-foreground">{value}</p>
    </div>
  )
}

function ResultDetails({ result, lang }: { result: GrievanceResult; lang: Language }) {
  const labels = RESULT_LABELS[lang]
  return (
    <div className="mt-3 rounded-3xl border border-border bg-card p-4 shadow-sm">
      <div className="space-y-2.5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {labels.transcript}
          </p>
          <p className="mt-0.5 text-base font-semibold leading-snug text-foreground">
            {result.transcript || "—"}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {labels.category}
            </p>
            <p className="mt-0.5 text-sm font-bold text-primary">{result.category}</p>
          </div>
          {result.language ? (
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {labels.language}
              </p>
              <p className="mt-0.5 text-sm font-bold text-foreground">{result.language}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function StatusCard({
  status,
  isProcessing,
  errorMessage,
  t,
}: {
  status: StatusKey
  isProcessing: boolean
  errorMessage: string | null
  t: (typeof translations)["en"]
}) {
  const config = {
    default: {
      icon: Mic,
      wrap: "border-border bg-card",
      iconWrap: "bg-secondary text-primary",
      title: "text-foreground",
    },
    success: {
      icon: CheckCircle2,
      wrap: "border-primary/30 bg-primary/5",
      iconWrap: "bg-primary/15 text-primary",
      title: "text-primary",
    },
    warning: {
      icon: AlertTriangle,
      wrap: "border-amber-400/50 bg-amber-50",
      iconWrap: "bg-amber-100 text-amber-600",
      title: "text-amber-700",
    },
    error: {
      icon: AlertTriangle,
      wrap: "border-destructive/40 bg-destructive/5",
      iconWrap: "bg-destructive/15 text-destructive",
      title: "text-destructive",
    },
  }[status]

  const Icon = isProcessing ? Loader2 : config.icon
  const content = t.status[status]
  const subtitle = status === "error" && errorMessage ? errorMessage : content.subtitle

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center gap-3.5 rounded-3xl border-2 p-4 transition-colors",
        config.wrap,
      )}
    >
      <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl", config.iconWrap)}>
        <Icon className={cn("h-6 w-6", isProcessing && "animate-spin")} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {t.statusHeading}
        </p>
        <p className={cn("text-pretty text-base font-bold leading-snug", config.title)}>{content.title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}