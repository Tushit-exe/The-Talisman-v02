import { ChevronRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import Badge from '../components/Badge'
import { useReveal } from '../hooks/useReveal'

const STEPS = [
  {
    title: 'Understand the current system',
    body: 'We look at how work actually moves today — the tools, the hand-offs, the workarounds.',
  },
  {
    title: 'Identify bottlenecks and waste',
    body: "We flag where time and effort are going that don't need to.",
  },
  {
    title: 'Design practical automations',
    body: 'We sketch automations sized to the problem, not the trend.',
  },
  {
    title: 'Decide together what makes sense',
    body: "You choose what's worth building. Nothing moves without that.",
  },
]

interface StepRowProps {
  index: string
  title: string
  body: string
  isLast: boolean
}

/**
 * Lights up once it's meaningfully in view, independent of the panel's own
 * fade-in — the row brightens as you scroll down to it, so the list reads
 * as something you walk through rather than a block that just appears.
 */
function StepRow({ index, title, body, isLast }: StepRowProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.5)

  return (
    <div ref={ref} className={`flex gap-5 py-5 ${isLast ? '' : 'border-b border-white/15'}`}>
      <span
        className={`font-mono text-[11px] tracking-[0.15em] transition-colors duration-500 ${
          visible ? 'text-gold' : 'text-white/55'
        }`}
      >
        {index}
      </span>
      <div>
        <div className="group flex items-center gap-2">
          <h3
            className={`text-base font-medium sm:text-lg transition-colors duration-500 ${
              visible ? 'text-white' : 'text-white/70'
            }`}
          >
            {title}
          </h3>
          <ChevronRight
            size={16}
            className={`transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-white ${
              visible ? 'text-white/60' : 'text-white/25'
            }`}
          />
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-paper/70">{body}</p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="flex flex-col gap-12 px-5 py-24 sm:px-8 md:px-12 md:py-32"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <Reveal delay={0}>
          <Badge>
            <span className="text-white/50">02 —</span> Our Process
          </Badge>
        </Reveal>
        <Reveal delay={100} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            We start by understanding what's actually happening in your
            business — then design automation around it, not the other way
            around.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col items-start gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-xl">
          <Reveal delay={180}>
            <h2 className="text-4xl leading-[1.1] tracking-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
              <span className="font-light text-white/85">See the system.</span>
              <br />
              <span className="font-medium text-white">Then simplify it.</span>
            </h2>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/80 drop-shadow-md sm:text-base">
              We map your current workflows, tools, and hand-offs before
              touching anything — so what we build fits how your team
              actually operates.
            </p>
          </Reveal>
        </div>

        <Reveal delay={260} className="w-full max-w-md">
          <div className="w-full rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6">
            {STEPS.map((step, i) => (
              <StepRow
                key={step.title}
                index={String(i + 1).padStart(2, '0')}
                title={step.title}
                body={step.body}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
