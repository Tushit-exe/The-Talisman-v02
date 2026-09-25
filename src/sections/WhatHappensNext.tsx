import Reveal from '../components/Reveal'
import Badge from '../components/Badge'
import { useReveal } from '../hooks/useReveal'

const STEPS = [
  {
    title: 'Short intro call',
    body: '20–30 minutes to understand your business and how things currently run.',
  },
  {
    title: 'No sales pitch',
    body: "We're not there to sell you anything in that call.",
  },
  {
    title: 'Clear recommendations',
    body: 'You get a straightforward summary of what we found.',
  },
  {
    title: "You decide what's next",
    body: 'Move forward, take it in-house, or do nothing. All fine.',
  },
]

interface StepCardProps {
  index: string
  title: string
  body: string
}

/**
 * Brightens once it's meaningfully in view, independent of the outer
 * Reveal's fade-in — ties the card's emphasis to scroll position, matching
 * the page's "motion follows scroll" identity instead of just fading once.
 */
function StepCard({ index, title, body }: StepCardProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4)

  return (
    <div
      ref={ref}
      className={`flex h-full flex-col gap-3 rounded-2xl border bg-white/[0.14] p-6 transition-colors duration-500 ${
        visible ? 'border-gold/50' : 'border-white/15'
      }`}
    >
      <span
        className={`font-mono text-[11px] tracking-[0.15em] transition-colors duration-500 ${
          visible ? 'text-gold' : 'text-white/55'
        }`}
      >
        {index}
      </span>
      <h3 className="text-base font-medium text-white sm:text-lg">{title}</h3>
      <p className="text-sm leading-relaxed text-paper/70">{body}</p>
    </div>
  )
}

export default function WhatHappensNext() {
  return (
    <section className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mb-14 max-w-xl">
        <Reveal delay={0}>
          <Badge className="mb-5">
            <span className="text-white/50">04 —</span> After You Reach Out
          </Badge>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-4xl font-normal leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            A short, honest
            <br />
            process.
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={220 + i * 110}>
            <StepCard index={String(i + 1).padStart(2, '0')} title={step.title} body={step.body} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
