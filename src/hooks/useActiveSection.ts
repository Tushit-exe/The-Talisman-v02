import { useEffect, useState } from 'react'

/**
 * Tracks which of the given section ids is currently most "in view" as the
 * page scrolls, using a single IntersectionObserver with a thin horizontal
 * band near vertical center. Drives the active-link highlight in the navbar
 * so it tracks scroll position instead of sitting static.
 */
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    const watchedIds = key.split(',').filter(Boolean)
    const nodes = watchedIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    if (nodes.length === 0 || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [key])

  return activeId
}
