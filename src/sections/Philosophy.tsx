import Reveal from '../components/Reveal'
import { useParallax } from '../hooks/useParallax'

/**
 * A single editorial beat between the hero and the funnel proper — no badge,
 * no CTA, just one considered line set larger and looser than the rest of
 * the page. Breaks up the badge/heading/paragraph/button rhythm every other
 * section repeats, and gives the site one moment that reads as a point of
 * view rather than a template.
 */
export default function Philosophy() {
  const textRef = useParallax<HTMLParagraphElement>(0.06)

  return (
    <section className="px-5 py-20 sm:px-8 md:px-12 md:py-28">
      <Reveal threshold={0.4}>
        <p
          ref={textRef}
          className="mx-auto max-w-3xl text-center text-2xl font-light leading-snug tracking-tight text-paper/90 drop-shadow-lg sm:text-3xl md:text-4xl"
        >
          Good automation isn't loud. It doesn't replace your judgment — it
          just quietly clears the repetitive part, so your attention goes
          where it should.
        </p>
      </Reveal>
    </section>
  )
}
