import { ChevronRight } from 'lucide-react'
import { AUDIT_CTA_HREF, AUDIT_CTA_LABEL } from '../config'

interface CtaButtonProps {
  label?: string
  size?: 'md' | 'lg'
  className?: string
}

/**
 * The single site-wide call to action. Every instance points at the same
 * AUDIT_CTA_HREF, deliberately — there is only ever one action on this page.
 */
export default function CtaButton({
  label = AUDIT_CTA_LABEL,
  size = 'md',
  className = '',
}: CtaButtonProps) {
  const sizeClasses =
    size === 'lg'
      ? 'px-6 py-3 text-sm sm:text-base'
      : 'px-5 py-2.5 text-xs sm:text-sm'

  return (
    <a
      href={AUDIT_CTA_HREF}
      className={`inline-flex items-center gap-1.5 rounded-full bg-white font-medium text-black transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-white/90 hover:shadow-[0_12px_32px_-10px_rgba(201,160,87,0.55)] active:scale-[0.98] ${sizeClasses} ${className}`}
    >
      {label}
      <ChevronRight size={size === 'lg' ? 16 : 14} />
    </a>
  )
}
