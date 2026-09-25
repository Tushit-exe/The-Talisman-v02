import { useEffect, useRef } from 'react'

/**
 * Cheap scroll-linked parallax: offsets the element vertically by a small
 * fraction of how far its center has drifted from the viewport center.
 * Written straight to the DOM via a ref (no React state, no re-renders) so
 * it stays smooth, and kept independent of ScrollVideo's own scroll loop —
 * this only ever touches the one element it's attached to.
 *
 * `strength` is deliberately small (0.05–0.12 is the useful range): this is
 * meant to read as "the page has depth," not as an obvious scroll gimmick.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(strength = 0.1) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let raf: number | null = null

    const update = () => {
      raf = null
      const rect = node.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elementCenter = rect.top + rect.height / 2
      const offset = (elementCenter - viewportCenter) * strength
      node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [strength])

  return ref
}
