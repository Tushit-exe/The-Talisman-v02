import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

/** Left-accent glass chip used for the small mono-uppercase eyebrow labels. */
export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block border-l-2 border-gold bg-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/90 drop-shadow-md ${className}`}
    >
      {children}
    </span>
  )
}
