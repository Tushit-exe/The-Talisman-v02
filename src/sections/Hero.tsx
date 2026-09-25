import { useRef } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { Workflow } from 'lucide-react'
import Reveal from '../components/Reveal'
import Badge from '../components/Badge'
import { useParallax } from '../hooks/useParallax'

const SERVICE_TAGS = ['/ WORKFLOW AUDIT', '/ SYSTEM DESIGN', '/ QUIET AUTOMATION']

// Default glow position before the pointer has moved — roughly where the
// headline sits, so it reads as intentional lighting rather than a stray dot.
const heroStyle = {
  '--glow-x': '50%',
  '--glow-y': '38%',
} as unknown as CSSProperties

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const headlineRef = useParallax<HTMLHeadingElement>(0.08)

  // Soft light that follows the cursor within the hero only — subtle, low
  // opacity, meant to read as "alive" rather than as an effect on its own.
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    sectionRef.current?.style.setProperty('--glow-x', `${x}%`)
    sectionRef.current?.style.setProperty('--glow-y', `${y}%`)
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      onMouseMove={handleMouseMove}
      style={heroStyle}
      className="relative z-0 flex min-h-screen min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-12 pt-24 sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(560px circle at var(--glow-x) var(--glow-y), rgba(201,160,87,0.14), transparent 65%)',
        }}
      />

      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2">
          {SERVICE_TAGS.map((tag, i) => (
            <Reveal key={tag} delay={150 + i * 120}>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                {tag}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="max-w-xs sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            We treat automation as infrastructure, not a trick — built around how
            your business actually runs, not a shortcut around it.
          </p>
        </Reveal>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal delay={150}>
            <Badge className="mb-5">For Businesses With Real Operations</Badge>
          </Reveal>

          <Reveal delay={280}>
            <h1
              ref={headlineRef}
              className="text-5xl leading-[1.05] tracking-tight drop-shadow-lg sm:text-6xl lg:text-7xl"
            >
              <span className="font-light text-white/85">Less manual work,</span>
              <br />
              <span className="font-medium text-white">more working systems.</span>
            </h1>
          </Reveal>
        </div>

        <Reveal delay={380}>
          {/* The nav's CTA is the only button visible in this viewport —
              this card is reassurance, not a second action to choose between. */}
          <div className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md">
            <div className="flex h-24 w-20 items-center justify-center rounded-lg border border-white/15 bg-white/10">
              <Workflow size={28} strokeWidth={1.5} className="text-white/80" />
            </div>
            <div className="flex flex-col gap-1.5 pr-2">
              <span className="text-sm font-medium text-white">Talk it through first</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                No pitch. No pressure.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
