import Reveal from '../components/Reveal'
import CtaButton from '../components/CtaButton'
import { useParallax } from '../hooks/useParallax'

export default function FinalCta() {
  const headlineRef = useParallax<HTMLHeadingElement>(0.08)

  return (
    <section className="flex flex-col items-center gap-8 px-5 py-32 text-center sm:px-8 md:px-12 md:py-40">
      <Reveal delay={0}>
        <h2
          ref={headlineRef}
          className="max-w-2xl text-4xl font-normal leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl"
        >
          Ready to see
          <br />
          what's slowing you down?
        </h2>
      </Reveal>
      <Reveal delay={160}>
        <p className="max-w-md text-sm leading-relaxed text-paper/80 drop-shadow-md sm:text-base">
          Request a free Automation Audit. No pitch, no pressure — just a
          clear look at where automation could help.
        </p>
      </Reveal>
      <Reveal delay={280}>
        <CtaButton size="lg" />
      </Reveal>
    </section>
  )
}
