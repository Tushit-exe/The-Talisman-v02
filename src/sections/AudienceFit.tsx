import { Check, X } from 'lucide-react'
import Reveal from '../components/Reveal'
import Badge from '../components/Badge'

const FOR = [
  'Businesses with real operations — not just an idea',
  'Teams doing repetitive, manual work every week',
  'Founders who want clarity before they invest',
]

const NOT_FOR = [
  'Anyone looking for a magic button',
  'Hobby projects or one-off experiments',
  'Anyone expecting instant results',
]

export default function AudienceFit() {
  return (
    <section
      id="who-its-for"
      className="px-5 py-24 sm:px-8 md:px-12 md:py-32"
    >
      <div className="mb-14 max-w-2xl">
        <Reveal delay={0}>
          <Badge className="mb-5">
            <span className="text-white/50">01 —</span> Who We Work With
          </Badge>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-4xl font-normal leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            This works for
            <br />
            some businesses.
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/80 drop-shadow-md sm:text-base">
            Automation isn't the right fit for everyone, and it shouldn't be.
            Here's how to tell.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <Reveal delay={200} className="h-full md:col-span-7">
          <div className="h-full rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
              For
            </span>
            <ul className="mt-4 flex flex-col gap-4">
              {FOR.map((item) => (
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

        <Reveal delay={320} className="h-full md:col-span-5">
          <div className="h-full rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md sm:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
              Not For
            </span>
            <ul className="mt-4 flex flex-col gap-4">
              {NOT_FOR.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X size={18} className="mt-0.5 shrink-0 text-white/40" strokeWidth={1.75} />
                  <span className="text-sm leading-relaxed text-white/60 sm:text-base">
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
