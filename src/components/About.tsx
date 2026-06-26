import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Mail, Phone, MapPin, Briefcase, Building2, ShoppingBag } from 'lucide-react'
import BorderGlow from '@/components/ui/BorderGlow'

const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '4', label: 'Languages Spoken' },
  { value: '5+', label: 'Venues Managed' },
]

const contactItems = [
  { icon: Mail, text: 'qiulinxuan5@gmail.com', href: 'mailto:qiulinxuan5@gmail.com' },
  { icon: Phone, text: '+34 688 488 688', href: 'tel:+34688488688' },
  { icon: MapPin, text: 'Barcelona, Spain' },
]

const experience = [
  {
    id: 0,
    company: 'SHEIN',
    role: 'Customer Service Representative',
    period: 'Jul 2021 — Mar 2023',
    icon: ShoppingBag,
    status: 'completed' as const,
    points: [
      'Drove sales growth through customer-centric service interactions',
      'Contributed to customer experience strategy balancing sales with customer-first mindset',
      'Produced structured reports and dashboards for service quality and key metrics',
      'Leveraged HubSpot CRM for customer opportunity management',
    ],
  },
  {
    id: 1,
    company: 'Swatch Group',
    role: 'Sales',
    period: 'Mar 2023 — Oct 2025',
    icon: Building2,
    status: 'completed' as const,
    points: [
      'Delivered personalised customer experiences in premium retail',
      'Collaborated in visual merchandising to ensure brand consistency',
      'Monitored individual and collective KPIs with data-driven reports',
      'Collaborated cross-functionally to optimise in-store engagement',
    ],
  },
  {
    id: 2,
    company: 'Anhermas Gestiones y Negocios SL',
    role: 'Operations & Business Coordinator',
    period: 'Oct 2025 — Present',
    icon: Briefcase,
    status: 'current' as const,
    points: [
      'Oversee financial performance across 5+ venues with P&L analysis per location',
      'Led supplier renegotiations achieving food cost reductions of up to 5%',
      'Conducted user behaviour analysis to identify retention opportunities',
      'Manage and develop multi-site teams aligned with company objectives',
    ],
  },
]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export default function About() {
  const [ref, inView] = useScrollReveal(0.05)
  const [activeJob, setActiveJob] = useState<number | null>(null)

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 px-6 md:px-12" style={{ background: 'transparent' }}>
      <div className="max-w-[1100px] mx-auto">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0.2)}
          className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-[0.15em] uppercase"
          style={{ color: '#c8913a' }}>
          <motion.span className="h-px" style={{ background: 'rgba(200,145,58,0.4)' }}
            initial={{ width: 0 }} animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }} />
          About Me
        </motion.div>

        <motion.h2 {...fadeUp(0.3)}
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-12"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
          Building bridges between<br />data and decisions
        </motion.h2>

        {/* ── Two-column: Bio left, Stats right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 mb-20">
          <div>
            <motion.p {...fadeUp(0.4)}
              className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#6a6560' }}>
              Graduate in Economics from UAB and MSc in Marketing Management from
              ESADE Business School. Currently driving operations and business
              performance as a coordinator in the F&B sector, overseeing 5+ venues
              with a focus on financial optimisation and team alignment.
            </motion.p>
            <motion.p {...fadeUp(0.5)}
              className="text-base md:text-lg leading-relaxed" style={{ color: '#6a6560' }}>
              My career spans premium retail at Swatch Group, customer-centric
              roles at SHEIN, and multi-site business coordination. Trilingual native
              in Spanish, Chinese, and Catalan with business-fluent English.
            </motion.p>
          </div>
          <div className="flex flex-col gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fadeUp(0.5 + i * 0.08)}
                className="p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
                style={{ background: '#161310', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="text-4xl font-bold leading-none mb-2" style={{ color: '#c8913a' }}>{s.value}</div>
                <div className="text-xs" style={{ color: '#5a5650' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Contact chips ── */}
        <motion.div {...fadeUp(0.6)} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-24">
          {contactItems.map((item, i) => {
            const Icon = item.icon
            const Wrapper = item.href ? motion.a : motion.div
            return (
              <Wrapper key={item.text} {...(item.href ? { href: item.href } : {})}
                className="flex items-center gap-3 px-5 py-4 rounded-xl text-sm transition-all duration-200 cursor-pointer"
                style={{ background: '#161310', border: '1px solid rgba(255,255,255,0.04)', color: '#8a857e' }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                     style={{ background: 'rgba(200,145,58,0.06)' }}>
                  <Icon size={16} style={{ color: '#c8913a' }} />
                </div>
                {item.text}
              </Wrapper>
            )
          })}
        </motion.div>

        {/* ── Interactive Work Experience Timeline ── */}
        <motion.div {...fadeUp(0.3)}>
          <div className="flex items-center gap-3 mb-16 text-xs font-semibold tracking-[0.15em] uppercase"
               style={{ color: '#c8913a' }}>
            <span className="w-8 h-px" style={{ background: 'rgba(200,145,58,0.4)' }} />
            Work Experience
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.4)}>
          {/* Horizontal timeline track */}
          <div className="relative mb-16">
            {/* Line */}
            <div className="absolute top-[22px] left-0 right-0 h-px" style={{ background: 'rgba(200,145,58,0.12)' }} />

            {/* Nodes */}
            <div className="relative flex justify-between items-start">
              {experience.map((job, i) => {
                const Icon = job.icon
                const isActive = activeJob === job.id
                const isCurrent = job.status === 'current'

                return (
                  <div key={job.id} className="flex flex-col items-center relative" style={{ flex: 1 }}>
                    {/* Clickable node */}
                    <button
                      onClick={() => setActiveJob(isActive ? null : job.id)}
                      className="relative z-10 cursor-pointer bg-transparent border-none p-0 group"
                      aria-label={`View ${job.company} details`}
                    >
                      {/* Glow ring */}
                      {(isActive || isCurrent) && (
                        <div className="absolute -inset-3 rounded-full"
                             style={{
                               background: 'radial-gradient(circle, rgba(200,145,58,0.15) 0%, transparent 70%)',
                               animation: isActive ? 'none' : 'pulse 3s ease-in-out infinite',
                             }} />
                      )}

                      {/* Ball */}
                      <div className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                           style={{
                             background: isActive ? '#c8913a' : isCurrent ? 'rgba(200,145,58,0.15)' : '#161310',
                             border: `2px solid ${isActive ? '#c8913a' : isCurrent ? '#c8913a' : 'rgba(200,145,58,0.15)'}`,
                             color: isActive ? '#0c0a07' : isCurrent ? '#c8913a' : '#5a5650',
                             transform: isActive ? 'scale(1.2)' : 'scale(1)',
                             boxShadow: isActive ? '0 0 24px rgba(200,145,58,0.35)' : 'none',
                           }}>
                        <Icon size={16} />
                      </div>
                    </button>

                    {/* Label */}
                    <div className="mt-4 text-center">
                      <p className="text-xs font-bold transition-colors duration-200"
                         style={{
                           fontFamily: "'Space Grotesk', sans-serif",
                           color: isActive ? '#f2f0ed' : '#5a5650',
                         }}>
                        {job.company.length > 20 ? job.company.split(' ').slice(0, 2).join(' ') : job.company}
                      </p>
                      <p className="text-[10px] mt-0.5 font-mono" style={{ color: '#3a3530' }}>
                        {job.period.split(' — ')[0]}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Expanded detail card */}
          <AnimatePresence mode="wait">
            {activeJob !== null && (
              <motion.div
                key={activeJob}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <BorderGlow
                  backgroundColor="#131110"
                  borderRadius={24}
                  glowColor="38 70 55"
                  glowRadius={25}
                  glowIntensity={0.5}
                  edgeSensitivity={25}
                  coneSpread={30}
                  colors={['#c8913a', '#e8c875', '#6a5530']}
                  fillOpacity={0.2}
                >
                  <div className="p-8 md:p-10">
                    {(() => {
                      const job = experience[activeJob]
                      const Icon = job.icon
                      return (
                        <>
                          <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                   style={{ background: 'rgba(200,145,58,0.06)', border: '1px solid rgba(200,145,58,0.1)' }}>
                                <Icon size={22} style={{ color: '#c8913a' }} strokeWidth={1.5} />
                              </div>
                              <div>
                                <h3 className="text-xl md:text-2xl font-bold"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
                                  {job.company}
                                </h3>
                                <p className="text-sm font-medium" style={{ color: '#c8913a' }}>{job.role}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {job.status === 'current' && (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                                      style={{ background: 'rgba(200,145,58,0.1)', color: '#c8913a' }}>
                                  Current
                                </span>
                              )}
                              <span className="text-xs font-mono" style={{ color: '#5a5650' }}>{job.period}</span>
                            </div>
                          </div>

                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {job.points.map((point, j) => (
                              <motion.li key={j}
                                className="flex gap-3 text-sm leading-relaxed"
                                style={{ color: '#8a857e' }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.06, duration: 0.3 }}
                              >
                                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                                      style={{ background: 'rgba(200,145,58,0.4)' }} />
                                {point}
                              </motion.li>
                            ))}
                          </ul>
                        </>
                      )
                    })()}
                  </div>
                </BorderGlow>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint text when nothing selected */}
          {activeJob === null && (
            <motion.p
              className="text-center text-sm"
              style={{ color: '#3a3530' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Click on a role to see details
            </motion.p>
          )}
        </motion.div>

      </div>
    </section>
  )
}
