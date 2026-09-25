import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  threshold?: number
}

/**
 * Fade-up-on-scroll wrapper: translate-y-8/opacity-0 -> translate-y-0/opacity-100,
 * 700ms ease-out, with a per-instance transition-delay in ms.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  threshold = 0.15,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(threshold)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
