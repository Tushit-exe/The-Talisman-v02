import { Layers, Cog, Building2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import Badge from '../components/Badge'

// NOTE: figures below are placeholders — swap in your real numbers before shipping.
const SIGNALS = [
  { icon: Layers, value: '[X]+ years', label: 'Working with business systems and data' },
  { icon: Cog, value: '[X]+', label: 'Automations running in production' },
  { icon: Building2, value: '[X]+', label: 'Industries worked across' },
]

const INDUSTRY_TAGS = [
  'Retail & Commerce',
  'Professional Services',
  'Field Operations',
  'Logistics',
  'Healthcare Admin',
]

export default function Credibility() {
  return (
    <section className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mb-14 max-w-xl">
        <Reveal delay={0}>
          <Badge className="mb-5">Why Trust The Work</Badge>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-4xl font-normal leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Built on systems
            <br />
            experience, not slides.
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {SIGNALS.map((signal, i) => (
          <Reveal key={signal.label} delay={200 + i * 110}>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/15 bg-white/[0.14] p-6">
              <signal.icon size={22} strokeWidth={1.5} className="text-white/80" />
              <span className="text-2xl font-medium text-white sm:text-3xl">
                {signal.value}
              </span>
              <span className="text-sm leading-relaxed text-white/70">
                {signal.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={560} className="mt-10">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
          Selected industries
        </span>
        <div className="flex flex-wrap gap-3">
          {INDUSTRY_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
