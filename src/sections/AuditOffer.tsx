import { Check } from 'lucide-react'
import Reveal from '../components/Reveal'
import Badge from '../components/Badge'
import CtaButton from '../components/CtaButton'

const INCLUDES = [
  'A walkthrough of your current workflows',
  'Where time and effort are being lost',
  "Which automations are worth building — and which aren't",
  'A clear, written summary either way',
]

export default function AuditOffer() {
  return (
    <section
      id="audit"
      className="relative border-y border-white/15 bg-white/[0.04] py-24 md:py-32"
    >
      <div className="flex flex-col gap-12 px-5 sm:px-8 md:flex-row md:items-start md:justify-between md:gap-16 md:px-12">
        <div className="max-w-lg">
          <Reveal delay={0}>
            <Badge className="mb-5">
              <span className="text-white/50">03 —</span> Free Automation Audit
            </Badge>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-4xl font-normal leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              One audit.
              <br />
              Real clarity.
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/80 drop-shadow-md sm:text-base">
              We review how your business currently runs — the tools, the
              manual steps, the workarounds — and map out where automation
              would actually help. If nothing makes sense to build, we'll
              tell you that too.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/60">
              There's no cost, and no obligation to move forward. The audit
              is useful on its own.
            </p>
          </Reveal>
          <Reveal delay={460}>
            <CtaButton size="lg" className="mt-8" />
          </Reveal>
        </div>

        <Reveal delay={280} className="w-full max-w-md">
          <div className="w-full rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
              What the audit covers
            </span>
            <ul className="mt-4 flex flex-col gap-4">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-white/80" strokeWidth={1.75} />
                  <span className="text-sm leading-relaxed text-white/85 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
