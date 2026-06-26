import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Strengths', href: '#strengths' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHash, setActiveHash] = useState(window.location.hash)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onHash = () => setActiveHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-20 flex items-center justify-between transition-all duration-400 ${
        scrolled ? 'backdrop-blur-2xl' : ''
      }`}
           style={{
             background: scrolled ? 'rgba(12,10,7,0.9)' : 'transparent',
             borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
           }}>
        <a href="#" className="flex items-center"
           onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.scrollTo(0, 0); }}>
          <img src="/logo.png" alt="LQ" className="h-10 w-auto" />
        </a>

        <ul className="hidden md:flex gap-10 list-none">
          {links.map(l => {
            const isActive = activeHash === l.href
            return (
              <li key={l.href}>
                <a href={l.href}
                   className="text-sm font-medium tracking-wide transition-colors duration-200"
                   style={{ color: isActive ? '#f2f0ed' : '#5a5650' }}
                   onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#f2f0ed' }}
                   onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#5a5650' }}>
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer z-[101]"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 transition-transform duration-300"
                style={{ background: '#f2f0ed', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span className="block w-6 h-0.5 transition-opacity duration-300"
                style={{ background: '#f2f0ed', opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-6 h-0.5 transition-transform duration-300"
                style={{ background: '#f2f0ed', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[49] flex flex-col items-center justify-center gap-10 backdrop-blur-2xl"
            style={{ background: 'rgba(12,10,7,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-semibold transition-colors cursor-pointer"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: activeHash === l.href ? '#c8913a' : '#f2f0ed' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
