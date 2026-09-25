interface LogoProps {
  tone?: 'default' | 'muted'
  className?: string
}

/**
 * Compact text lettermark — "TA" (from Talisman) in a hairline-bordered
 * box, standing in for a generic icon mark. Matches the mono/uppercase/
 * tracked-out treatment used by Badge and the section labels elsewhere.
 */
export default function Logo({ tone = 'default', className = '' }: LogoProps) {
  const toneClasses =
    tone === 'muted' ? 'border-white/25 text-white/60' : 'border-white/40 text-white'

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] border font-mono text-[10px] font-medium tracking-tight ${toneClasses} ${className}`}
    >
      TA
    </span>
  )
}
