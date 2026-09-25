import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Reveal from './Reveal'
import Logo from './Logo'
import { useActiveSection } from '../hooks/useActiveSection'
import { AUDIT_CTA_HREF, AUDIT_CTA_LABEL, BRAND_NAME } from '../config'

const LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: "Who It's For", href: '#who-its-for' },
  { label: 'The Audit', href: '#audit' },
]

const SECTION_IDS = LINKS.map((link) => link.href.slice(1))

export default function Navbar() {
  const activeId = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)

  // Below `md` the inline nav is hidden entirely (see `hidden md:flex`
  // below) — without this, the three section links were unreachable on
  // mobile with no way to get to them. Close it on any link tap and on
  // resize back up past the breakpoint, so it can't get stuck open.
  useEffect(() => {
    if (!menuOpen) return
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#0a0a0a]/10 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-12">
        <Reveal delay={0}>
          <a href="#top" className="flex items-center gap-2.5">
            <Logo className="drop-shadow-md" />
            <span className="text-lg font-medium tracking-tight text-white drop-shadow-md sm:text-xl">
              {BRAND_NAME}
            </span>
          </a>
        </Reveal>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {LINKS.map((link, i) => {
            const isActive = activeId === link.href.slice(1)
            return (
              <Reveal key={link.href} delay={100 + i * 100}>
                <a
                  href={link.href}
                  className={`relative inline-block text-sm drop-shadow-md transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              </Reveal>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Reveal delay={500}>
            <a
              href={AUDIT_CTA_HREF}
              className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs text-white backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-white/25 sm:px-5 sm:text-sm"
            >
              {AUDIT_CTA_LABEL}
            </a>
          </Reveal>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel — mirrors the desktop links, only reachable
          below `md` via the hamburger button above. */}
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/15 bg-[#0a0a0a]/95 px-5 py-4 backdrop-blur-md md:hidden">
          {LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm transition-colors duration-300 ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>
      )}
    </header>
  )
}
