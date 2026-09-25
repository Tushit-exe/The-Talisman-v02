import { useEffect, useRef, useState } from 'react'

/**
 * Fixed, full-bleed, scroll-scrubbed video background.
 *
 * Layers (bottom -> top): poster image -> live <video> -> <canvas>.
 * Motion is driven entirely by scroll position (smoothed with a lerp),
 * never by autoplay/loop. When the browser can extract frames from the
 * video quickly enough, a small frame cache is built off-screen and the
 * canvas scrubs through it for buttery-smooth motion; until then (or if
 * extraction isn't available), the visible <video> element is seeked
 * directly as a fallback.
 *
 * Assets: defaults to the reference CloudFront hero video from the
 * original design spec. Swap VIDEO_SRC below for your own footage
 * whenever you have it (a local /public/hero.mp4 works too — just
 * point VIDEO_SRC at '/hero.mp4'). A first-frame still at
 * /public/hero-poster.jpg is optional; the layer degrades gracefully
 * to a plain dark background if assets are missing or fail to load.
 */

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4'
const POSTER_SRC = '/hero-poster.jpg'

const MAX_FRAMES = 110
const MIN_FRAMES = 24
const FRAMES_PER_SECOND = 16
// Ceiling for the adaptive frame width computed in buildCache below — bounds
// memory/extraction time on very large displays instead of a single fixed
// width that looks soft once stretched across a full retina canvas.
const FRAME_MAX_WIDTH_CEILING = 1920
const LERP_FACTOR = 0.12
const SEEK_DELTA_THRESHOLD = 0.04
// Video content runs lighter than the design spec's "dark cinematic" intent —
// dim/desaturate it slightly so white text keeps enough contrast throughout.
const BG_FILTER_CLASS = 'brightness-[0.62] saturate-[0.92]'

function waitForSeeked(video: HTMLVideoElement): Promise<void> {
  return new Promise((resolve) => {
    const onSeeked = () => {
      video.removeEventListener('seeked', onSeeked)
      resolve()
    }
    video.addEventListener('seeked', onSeeked)
  })
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  canvasWidth: number,
  canvasHeight: number,
) {
  if (!sourceWidth || !sourceHeight) return
  const canvasRatio = canvasWidth / canvasHeight
  const sourceRatio = sourceWidth / sourceHeight

  let drawWidth: number
  let drawHeight: number

  if (sourceRatio > canvasRatio) {
    drawHeight = canvasHeight
    drawWidth = canvasHeight * sourceRatio
  } else {
    drawWidth = canvasWidth
    drawHeight = canvasWidth / sourceRatio
  }

  const dx = (canvasWidth - drawWidth) / 2
  const dy = (canvasHeight - drawHeight) / 2

  ctx.drawImage(source, dx, dy, drawWidth, drawHeight)
}

export default function ScrollVideo() {
  const posterRef = useRef<HTMLImageElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const offscreenVideoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const extractionCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const framesRef = useRef<ImageBitmap[]>([])
  const progressRef = useRef({ target: 0, smoothed: 0 })
  const rafRef = useRef<number | null>(null)
  const lastSeekRef = useRef(0)
  const lastDrawnIndexRef = useRef(-1)

  const [posterHidden, setPosterHidden] = useState(false)
  const [videoHasFrame, setVideoHasFrame] = useState(false)
  const [framesReady, setFramesReady] = useState(false)

  // Scroll + resize -> target progress, plus the rAF smoothing / draw loop.
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d') ?? null
    if (ctx) ctx.imageSmoothingQuality = 'high'

    const setCanvasSize = () => {
      if (!canvas) return
      // Frame redraws are now skipped unless the target index actually
      // changes (see tick() below), so the canvas can afford to run at
      // full retina resolution again instead of the softer capped DPR
      // used when every tick redrew unconditionally.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      lastDrawnIndexRef.current = -1
    }

    const updateTarget = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const viewport = window.innerHeight
      const max = Math.max(scrollHeight - viewport, 1)
      const raw = window.scrollY / max
      progressRef.current.target = Math.min(Math.max(raw, 0), 1)
    }

    const tick = () => {
      const p = progressRef.current
      p.smoothed += (p.target - p.smoothed) * LERP_FACTOR

      const frames = framesRef.current
      if (frames.length > 0 && canvas && ctx) {
        const rawIndex = Math.round(p.smoothed * (frames.length - 1))
        const index = Math.min(Math.max(rawIndex, 0), frames.length - 1)
        // Only touch the canvas when the target frame actually changes —
        // redrawing an unchanged frame every tick was pure wasted GPU work
        // competing with the page's other compositing (glass-panel blur, etc).
        if (index !== lastDrawnIndexRef.current) {
          lastDrawnIndexRef.current = index
          const bitmap = frames[index]
          if (bitmap) {
            drawCover(
              ctx,
              bitmap,
              bitmap.width,
              bitmap.height,
              canvas.width,
              canvas.height,
            )
          }
        }
      } else {
        const video = videoRef.current
        if (video && video.duration && Number.isFinite(video.duration)) {
          const safeDuration = Math.max(
            video.duration - Math.max(video.duration * 0.02, 0.15),
            0,
          )
          const targetTime = p.smoothed * safeDuration
          if (Math.abs(targetTime - lastSeekRef.current) > SEEK_DELTA_THRESHOLD) {
            lastSeekRef.current = targetTime
            try {
              video.currentTime = targetTime
            } catch {
              // seeking before metadata is ready can throw in some browsers; ignore
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    setCanvasSize()
    updateTarget()
    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', updateTarget, { passive: true })
    window.addEventListener('resize', setCanvasSize)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', updateTarget)
      window.removeEventListener('resize', setCanvasSize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Build the off-screen frame cache once the hidden video has decoded a frame.
  useEffect(() => {
    const offscreen = offscreenVideoRef.current
    if (!offscreen) return
    let cancelled = false

    const buildCache = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      if (cancelled) return

      const duration = offscreen.duration
      if (!duration || !Number.isFinite(duration)) return

      const frameCount = Math.min(
        MAX_FRAMES,
        Math.max(MIN_FRAMES, Math.round(duration * FRAMES_PER_SECOND)),
      )

      // Cache frames at (close to) the viewer's actual screen resolution
      // instead of one fixed width for everyone — a small fixed cap looked
      // soft once stretched across a full-width retina canvas.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const targetMaxWidth = Math.min(
        Math.round(window.innerWidth * dpr),
        FRAME_MAX_WIDTH_CEILING,
      )

      const videoWidth = offscreen.videoWidth || targetMaxWidth
      const videoHeight = offscreen.videoHeight || Math.round(targetMaxWidth * 0.5625)
      const scale = Math.min(1, targetMaxWidth / videoWidth)
      const targetWidth = Math.round(videoWidth * scale)
      const targetHeight = Math.round(videoHeight * scale)

      if (!extractionCanvasRef.current) {
        extractionCanvasRef.current = document.createElement('canvas')
      }
      const extractionCanvas = extractionCanvasRef.current
      extractionCanvas.width = targetWidth
      extractionCanvas.height = targetHeight
      const extractionCtx = extractionCanvas.getContext('2d')
      if (!extractionCtx) return
      extractionCtx.imageSmoothingQuality = 'high'

      const bitmaps: ImageBitmap[] = []

      // Stay clear of the last stretch of the clip. Seeking right at the true
      // end of a video is a known source of occasional black or corrupted
      // decoded frames in browsers — the mapped scroll range never touches
      // the final ~2% (or 150ms, whichever is larger) of the source footage,
      // which is what was showing up as the background "getting stuck" black
      // in the last few frames of scroll.
      const safeDuration = Math.max(duration - Math.max(duration * 0.02, 0.15), 0)

      try {
        for (let i = 0; i < frameCount; i += 1) {
          if (cancelled) break
          const time = (i / Math.max(frameCount - 1, 1)) * safeDuration
          offscreen.currentTime = time
          await waitForSeeked(offscreen)
          if (cancelled) break

          extractionCtx.drawImage(offscreen, 0, 0, targetWidth, targetHeight)
          const bitmap = await createImageBitmap(extractionCanvas)
          bitmaps.push(bitmap)
        }

        if (!cancelled && bitmaps.length > 0) {
          framesRef.current = bitmaps
          setFramesReady(true)
          // TEMP DEBUG — remove after investigation.
          ;(window as unknown as Record<string, unknown>).__svDebug = {
            frameCount: bitmaps.length,
            safeDuration,
            duration,
            extractionCanvas: extractionCanvasRef.current,
            framesRef,
            canvasRef,
            lastBitmap: bitmaps[bitmaps.length - 1],
          }
        }
      } catch {
        // Frame extraction can fail (codec support, throttled tabs, etc).
        // The direct-seek fallback in the rAF loop keeps things working.
      }
    }

    const onLoadedData = () => {
      buildCache()
    }

    offscreen.addEventListener('loadeddata', onLoadedData)
    offscreen.src = VIDEO_SRC
    offscreen.load()

    return () => {
      cancelled = true
      offscreen.removeEventListener('loadeddata', onLoadedData)
      framesRef.current.forEach((bitmap) => bitmap.close())
      framesRef.current = []
    }
  }, [])

  // Poster fades once either the visible video or the frame cache has something to show.
  useEffect(() => {
    if (videoHasFrame || framesReady) {
      const timeout = setTimeout(() => setPosterHidden(true), 50)
      return () => clearTimeout(timeout)
    }
  }, [videoHasFrame, framesReady])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]"
    >
      <img
        ref={posterRef}
        src={POSTER_SRC}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${BG_FILTER_CLASS} ${
          posterHidden ? 'opacity-0' : 'opacity-100'
        }`}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />

      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${BG_FILTER_CLASS} ${
          videoHasFrame && !framesReady ? 'opacity-100' : 'opacity-0'
        }`}
        onLoadedData={() => setVideoHasFrame(true)}
        onError={() => setVideoHasFrame(false)}
      />

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${BG_FILTER_CLASS} ${
          framesReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/*
        Gradient scrim: the reference footage runs lighter than the design
        spec's "dark cinematic" intent, so white text needs a consistent dark
        floor to sit on. Darkest where headlines/nav live (top, bottom),
        lightest mid-scroll so the footage still reads through.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.18) 20%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.22) 80%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Fine grain, pure CSS/SVG (no image asset) — gives the footage a filmic
          texture instead of a flat digital gradient, closer to the original
          "cinematic" intent. Very low opacity by design. */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Off-screen video used purely as a frame-extraction source; never shown. */}
      <video
        ref={offscreenVideoRef}
        muted
        playsInline
        preload="auto"
        className="absolute h-px w-px opacity-0"
        style={{ left: -9999, top: -9999 }}
        tabIndex={-1}
      />
    </div>
  )
}
