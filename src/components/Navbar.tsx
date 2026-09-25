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

        <Reveal delay={500}>
          <a
            href={AUDIT_CTA_HREF}
            className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs text-white backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-white/25 sm:px-5 sm:text-sm"
          >
            {AUDIT_CTA_LABEL}
          </a>
        </Reveal>
      </div>
    </header>
  )
}
