import Logo from './Logo'
import { AUDIT_CTA_HREF, BRAND_NAME } from '../config'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-8 md:px-12">
      <div className="flex flex-col gap-8">
        {/* No button here — FinalCta directly above is already the close;
            repeating it this close together just doubled up the same ask. */}
        <p className="max-w-sm text-lg leading-snug text-white/90 drop-shadow-md">
          Automation, built around how you actually work.
        </p>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <Logo tone="muted" />
            <span className="text-sm text-white/60">{BRAND_NAME}</span>
          </div>
          <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={AUDIT_CTA_HREF}
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/50 transition-colors duration-300 hover:text-white/85"
            >
              hello@thetalisman.co
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
              © {new Date().getFullYear()} {BRAND_NAME}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
