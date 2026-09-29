// Converts an arbitrary recorded audio Blob (webm/ogg/mp4, whatever the browser
// produced) into a 16-bit PCM WAV Blob. MediaRecorder can't emit WAV directly,
// so we decode the compressed audio with the Web Audio API and re-encode it.
export async function blobToWav(blob: Blob): Promise<Blob> {
  const arrayBuffer = await blob.arrayBuffer()

  const AudioCtx =
    window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const audioCtx = new AudioCtx()
  try {
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
    return encodeWav(audioBuffer)
  } finally {
    void audioCtx.close()
  }
}

function encodeWav(audioBuffer: AudioBuffer): Blob {
  const numChannels = audioBuffer.numberOfChannels
  const sampleRate = audioBuffer.sampleRate
  const bitsPerSample = 16
  const bytesPerSample = bitsPerSample / 8

  const channels: Float32Array[] = []
  for (let c = 0; c < numChannels; c++) {
    channels.push(audioBuffer.getChannelData(c))
  }

  const frameCount = audioBuffer.length
  const dataLength = frameCount * numChannels * bytesPerSample
  const buffer = new ArrayBuffer(44 + dataLength)
  const view = new DataView(buffer)

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i))
    }
  }

  const blockAlign = numChannels * bytesPerSample
  const byteRate = sampleRate * blockAlign

  // RIFF header
  writeString(0, "RIFF")
  view.setUint32(4, 36 + dataLength, true)
  writeString(8, "WAVE")

  // fmt chunk
  writeString(12, "fmt ")
  view.setUint32(16, 16, true) // PCM chunk size
  view.setUint16(20, 1, true) // audio format = PCM
  view.setUint16(22, numChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, byteRate, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bitsPerSample, true)

  // data chunk
  writeString(36, "data")
  view.setUint32(40, dataLength, true)

  // Interleave channels and write 16-bit PCM samples.
  let offset = 44
  for (let i = 0; i < frameCount; i++) {
    for (let c = 0; c < numChannels; c++) {
      let sample = channels[c][i]
      sample = Math.max(-1, Math.min(1, sample))
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
      offset += 2
    }
  }

  return new Blob([buffer], { type: "audio/wav" })
}
