import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Target, Users, Lightbulb, TrendingUp, Megaphone, FileText, ArrowUpRight, BarChart3, Package, Layers } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import BorderGlow from '@/components/ui/BorderGlow'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const insightsTimelineData = [
  { id: 1, title: 'Challenge', date: 'Phase 1', content: 'Apply design thinking to innovate and market a solution for Danacol relevant for active consumers. CVDs are the leading cause of death in Spain, yet 80% are preventable through better lifestyle choices.', category: 'Research', icon: Target, relatedIds: [2], status: 'completed' as const, energy: 100 },
  { id: 2, title: 'Target Segment', date: 'Phase 2', content: 'Health-conscious active people who haven\'t developed high cholesterol but care about cardiovascular health. They value naturality, avoid medication, and take a proactive approach to healthcare.', category: 'Research', icon: Users, relatedIds: [1, 3], status: 'completed' as const, energy: 90 },
  { id: 3, title: 'Insight', date: 'Phase 3', content: '62% exercise for long-term health, 78% eat healthy most of the time, 88% are aware of Danacol — but they don\'t consider it because they see it as treatment, not prevention.', category: 'Discovery', icon: Lightbulb, relatedIds: [2, 4], status: 'completed' as const, energy: 85 },
  { id: 4, title: 'Opportunity', date: 'Phase 4', content: 'Reposition Danacol from a reactive cholesterol treatment to a proactive wellness ally. Penetrate the active consumer market before cholesterol issues begin.', category: 'Strategy', icon: TrendingUp, relatedIds: [3], status: 'completed' as const, energy: 95 },
]

const sections = [
  {
    id: 'insights',
    title: 'Insights & Discovery',
    description: 'Our research combined primary surveys with active Spanish consumers and secondary market analysis to uncover the key insight: Danacol has 88% brand awareness but 0% consideration among our target — because they see it as treatment, not prevention.',
  },
  {
    id: 'data',
    title: 'Consumer Survey',
    description: 'Primary research with 200+ active consumers in Spain revealed clear product preferences and behavioural patterns that shaped the Danacol PRE product concept.',
  },
  {
    id: 'solution',
    title: 'The Solution — Danacol PRE',
    description: 'A new preventive sub-line repositioning Danacol from reactive treatment to proactive wellness. Low-fat Greek yogurt with plant sterols, no sugar, high protein — designed for the active consumer.',
  },
  {
    id: 'positioning',
    title: 'Positioning & Campaign',
    description: 'An integrated 360° marketing strategy combining digital, TV (with Spanish humor), OOH in gyms, influencer partnerships, and an educational website hub to launch Danacol PRE.',
  },
  {
    id: 'differentiation',
    title: 'Competitive Landscape',
    description: 'Danacol PRE is uniquely positioned at the intersection of preventive heart care and natural, high-protein nutrition — a space no competitor currently occupies.',
  },
]

export default function DanacolCaseStudy({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<string>('insights')

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-20 flex items-center justify-between"
           style={{ background: 'rgba(12,10,7,0.9)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <button onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer bg-transparent border-none group"
          style={{ color: '#8a857e' }}>
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          Back
        </button>
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#c8913a' }}>Case Study</span>
      </nav>

      <div className="pb-32">
        {/* ═══════ HERO — full-screen intro ═══════ */}
        <header className="min-h-screen flex flex-col justify-center px-6 md:px-12">
          <div className="max-w-[1100px] mx-auto w-full pt-24">
            <motion.div {...fade(0.1)} className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border"
                    style={{ background: 'rgba(200,145,58,0.04)', borderColor: 'rgba(200,145,58,0.12)', color: '#c8913a' }}>
                ESADE x Danone
              </span>
              <span className="text-xs font-medium" style={{ color: '#3a3530' }}>MSc Marketing Management</span>
            </motion.div>

            <motion.h1 {...fade(0.2)}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.92] mb-10"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
              The Future<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c8913a] via-[#e8c875] to-[#c8913a]">
                of Danacol
              </span>
            </motion.h1>

            <motion.p {...fade(0.3)}
              className="text-lg md:text-xl leading-relaxed mb-12 max-w-[600px]"
              style={{ color: '#6a6560' }}>
              A design-thinking innovation project repositioning Danacol from a reactive
              cholesterol treatment to a proactive cardiovascular wellness brand.
            </motion.p>

            <motion.div {...fade(0.35)} className="flex flex-wrap gap-2">
              {['Brand Strategy', 'Design Thinking', 'Consumer Research', 'Product Innovation', 'Marketing Plan'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-lg text-xs font-medium"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: '#5a5650' }}>
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </header>

        {/* ═══════ KEY METRICS — separate section ═══════ */}
        <div className="px-6 md:px-12 mb-24">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '88%', label: 'Brand Awareness' },
                { value: '86%', label: 'Would Try Product' },
                { value: '78%', label: 'Aligned with Goals' },
                { value: '62%', label: 'Would Replace Yogurt' },
              ].map((s, i) => (
                <motion.div key={s.label}
                  className="p-6 md:p-8 rounded-2xl text-center relative overflow-hidden"
                  style={{ background: '#161310', border: '1px solid rgba(255,255,255,0.04)' }}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ borderColor: 'rgba(200,145,58,0.12)', scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, transparent, rgba(200,145,58,0.04), transparent)', width: '200%' }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: i * 1.2 }}
                  />
                  <motion.div className="relative text-3xl md:text-5xl font-bold leading-none mb-3"
                    style={{ color: '#c8913a' }}
                    animate={{ opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  >
                    {s.value}
                  </motion.div>
                  <div className="relative text-[11px] font-medium tracking-wide uppercase" style={{ color: '#5a5650' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ ACCORDION FEATURE SECTION ═══════ */}
        <motion.section {...fade(0.3)} className="px-6 md:px-12 mb-32">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
              {/* Left: Accordion */}
              <div className="w-full md:w-[45%]">
                <Accordion type="single" defaultValue="insights" onValueChange={(v) => setActiveSection(v)}>
                  {sections.map((section) => (
                    <AccordionItem key={section.id} value={section.id}
                      className="py-1"
                      style={{ borderColor: 'rgba(200,145,58,0.08)' }}>
                      <AccordionTrigger
                        className="cursor-pointer py-5 !no-underline transition hover:!no-underline"
                        style={{ color: activeSection === section.id ? '#f2f0ed' : '#5a5650' }}
                      >
                        <h3 className="text-lg md:text-xl font-bold text-left transition-colors duration-200"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              color: activeSection === section.id ? '#f2f0ed' : '#5a5650',
                            }}>
                          {section.title}
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm leading-relaxed pr-4" style={{ color: '#6a6560' }}>
                          {section.description}
                        </p>
                        {/* Mobile: show content inline */}
                        <div className="mt-6 md:hidden">
                          <SectionContent sectionId={section.id} />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Right: Dynamic content panel */}
              <div className="hidden md:block w-[55%] sticky top-28">
                <div className="rounded-2xl overflow-hidden min-h-[500px] flex items-center justify-center"
                     style={{ background: 'rgba(19,17,16,0.5)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <SectionContent sectionId={activeSection} />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════ FULL PRESENTATION ═══════ */}
        <motion.section {...fade(0.2)} className="px-6 md:px-12">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-center gap-3 mb-4 text-xs font-semibold tracking-[0.15em] uppercase"
                 style={{ color: '#c8913a' }}>
              <span className="w-8 h-px" style={{ background: 'rgba(200,145,58,0.4)' }} />
              Documentation
            </div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
                Full Presentation
              </h2>
              <a href="/docs/danacol-presentation.pdf" target="_blank" rel="noopener noreferrer"
                 className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border"
                 style={{ background: 'rgba(200,145,58,0.04)', borderColor: 'rgba(200,145,58,0.12)', color: '#c8913a' }}>
                <FileText size={14} />
                Open in new tab
                <ArrowUpRight size={12} />
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <iframe src="/docs/danacol-presentation.pdf" className="w-full"
                style={{ height: '85vh', border: 'none', background: '#1a1a1a' }}
                title="Danacol PRE Full Presentation" />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

/* ── Solution Bento Grid ── */
function SolutionBento() {
  const [active, setActive] = useState<number | null>(null)

  const cards = [
    {
      id: 0,
      title: 'Product',
      icon: Package,
      text: 'Low-fat Greek yogurt with plant sterols, no sugar, high protein. A preventive sub-line scientifically designed for cardiovascular wellness — not just cholesterol reduction. 125g format in sustainable 4/6-packs.',
      span: 'col-span-1 row-span-2',
    },
    {
      id: 1,
      title: 'Format',
      icon: Layers,
      text: 'Natural flavour base allowing consumers to personalise with seeds, nuts, fruits or protein powders. Each cup features a different wellness slogan for gamified engagement. Clean-label, no sweeteners.',
      span: 'col-span-1 row-span-1',
    },
    {
      id: 2,
      title: 'Growth',
      icon: TrendingUp,
      text: 'Multiple usage occasions throughout the day. Format innovations: PRE + Nuts/Seeds Kit, Plant-Based Edition. Expansion into adjacent wellness categories to build a lifestyle product ecosystem.',
      span: 'col-span-1 row-span-1',
    },
  ]

  return (
    <div className="p-5 w-full">
      <AnimatePresence mode="wait">
        {active !== null ? (
          <motion.div
            key={`detail-${active}`}
            className="w-full"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {(() => {
              const card = cards[active]
              const Icon = card.icon
              return (
                <div className="rounded-2xl p-7 relative overflow-hidden"
                     style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(200,145,58,0.1)', minHeight: 350 }}>
                  {/* Shimmer */}
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, transparent, rgba(200,145,58,0.03), transparent)', width: '200%' }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  />

                  <button onClick={() => setActive(null)}
                    className="relative z-10 flex items-center gap-2 text-xs font-medium mb-6 cursor-pointer bg-transparent border-none"
                    style={{ color: '#c8913a' }}>
                    <ArrowLeft size={14} /> Back to overview
                  </button>

                  <div className="relative z-10 flex items-center gap-4 mb-6">
                    <motion.div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(200,145,58,0.08)', border: '1px solid rgba(200,145,58,0.12)' }}
                      animate={{ boxShadow: ['0 0 0px rgba(200,145,58,0)', '0 0 20px rgba(200,145,58,0.15)', '0 0 0px rgba(200,145,58,0)'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Icon size={26} style={{ color: '#c8913a' }} strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
                      {card.title}
                    </h3>
                  </div>

                  <motion.p className="relative z-10 text-sm leading-relaxed" style={{ color: '#8a857e' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {card.text}
                  </motion.p>
                </div>
              )
            })()}
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-2 gap-3"
            style={{ gridTemplateRows: 'repeat(2, 140px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {cards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.button
                  key={card.id}
                  className={`${card.span} rounded-2xl relative overflow-hidden text-left cursor-pointer border-none p-0`}
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                  onClick={() => setActive(card.id)}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    borderColor: 'rgba(200,145,58,0.15)',
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Shimmer */}
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, transparent, rgba(200,145,58,0.04), transparent)', width: '200%' }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: i * 1.5 }}
                  />

                  <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                    <motion.div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: 'rgba(200,145,58,0.06)', border: '1px solid rgba(200,145,58,0.08)' }}
                      animate={{
                        boxShadow: ['0 0 0px rgba(200,145,58,0)', '0 0 12px rgba(200,145,58,0.12)', '0 0 0px rgba(200,145,58,0)'],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <Icon size={20} style={{ color: '#c8913a' }} strokeWidth={1.5} />
                    </motion.div>

                    <div>
                      <h4 className="text-base font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
                        {card.title}
                      </h4>
                      <p className="text-[10px]" style={{ color: '#3a3530' }}>Click to explore</p>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Section content panels ── */
function SectionContent({ sectionId }: { sectionId: string }) {
  switch (sectionId) {
    case 'insights':
      return <RadialOrbitalTimeline timelineData={insightsTimelineData} />

    case 'data':
      return (
        <div className="p-6 w-full">
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '44%', label: 'Prefer Greek yogurt' },
              { value: '65%', label: 'Consume naturally' },
              { value: '76%', label: 'Prefer single-serve' },
              { value: '42%', label: 'Want multiple benefits' },
              { value: '62%', label: 'Exercise for long-term health' },
              { value: '39%', label: 'Concerned about cholesterol' },
            ].map(s => (
              <div key={s.label} className="p-5 rounded-xl text-center"
                   style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="text-2xl font-bold leading-none mb-1" style={{ color: '#c8913a' }}>{s.value}</div>
                <div className="text-[10px] font-medium" style={{ color: '#5a5650' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'solution':
      return <SolutionBento />

    case 'positioning':
      return (
        <div className="p-6 w-full space-y-5">
          <BorderGlow backgroundColor="#131110" borderRadius={16} glowColor="38 70 55"
            glowRadius={20} glowIntensity={0.4} edgeSensitivity={25} coneSpread={30}
            colors={['#c8913a', '#e8c875', '#6a5530']} fillOpacity={0.15}>
            <div className="p-6 text-center">
              <Megaphone size={18} style={{ color: '#c8913a', margin: '0 auto 0.75rem' }} strokeWidth={1.5} />
              <p className="text-xs font-semibold tracking-[0.1em] uppercase mb-3" style={{ color: '#c8913a' }}>
                Positioning
              </p>
              <p className="text-sm leading-relaxed italic" style={{ color: '#8a857e' }}>
                "For active individuals proactive about their health, Danacol PRE is your trusted ally in preventative cardiovascular wellness."
              </p>
            </div>
          </BorderGlow>
          <div className="grid grid-cols-2 gap-3">
            {['Digital & Paid', 'TV (Spanish humor)', 'OOH in gyms', 'Influencer partnerships'].map(ch => (
              <div key={ch} className="p-3 rounded-lg text-center text-xs font-medium"
                   style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: '#8a857e' }}>
                {ch}
              </div>
            ))}
          </div>
        </div>
      )

    case 'differentiation': {
      const brands = [
        { name: 'Danacol PRE', short: 'PRE', highlight: true },
        { name: 'Danacol', short: 'Danacol', highlight: false },
        { name: 'Activia', short: 'Activia', highlight: false },
        { name: 'Alpro', short: 'Alpro', highlight: false },
      ]
      const features = [
        { name: 'Cholesterol support', desc: 'Plant sterol-based cholesterol management', values: [true, true, false, false] },
        { name: 'High Protein', desc: 'Greek yogurt protein content for fitness', values: [true, false, 'partial', true] },
        { name: 'Plant Sterols', desc: 'Clinically proven cholesterol reduction', values: [true, true, false, false] },
        { name: 'Low/No sugar', desc: 'No added sugar or sweeteners', values: [true, false, false, true] },
        { name: 'Natural positioning', desc: 'Clean-label, natural ingredient focus', values: [true, false, true, true] },
      ]
      const scores = brands.map((_, bi) => features.filter(f => f.values[bi] === true).length)

      return (
        <div className="p-6 w-full relative overflow-hidden">
          {/* Animated background gradient sweep */}
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(200,145,58,0.03), transparent)',
              width: '200%',
            }}
            animate={{ x: ['-100%', '0%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Golden vertical highlight strip behind PRE column */}
          <motion.div className="absolute top-0 bottom-0 pointer-events-none rounded-xl"
            style={{
              width: 80,
              left: 'calc(50% - 120px)',
              background: 'linear-gradient(to bottom, rgba(200,145,58,0.04), rgba(200,145,58,0.02), rgba(200,145,58,0.04))',
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              background: [
                'linear-gradient(to bottom, rgba(200,145,58,0.02), rgba(200,145,58,0.05), rgba(200,145,58,0.02))',
                'linear-gradient(to bottom, rgba(200,145,58,0.05), rgba(200,145,58,0.02), rgba(200,145,58,0.05))',
                'linear-gradient(to bottom, rgba(200,145,58,0.02), rgba(200,145,58,0.05), rgba(200,145,58,0.02))',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Brand columns header */}
          <div className="relative grid gap-3 mb-8" style={{ gridTemplateColumns: '1fr repeat(4, 64px)' }}>
            <div className="flex items-end">
              <motion.p className="text-[10px] font-medium uppercase tracking-wider"
                style={{ color: '#3a3530' }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                Feature comparison
              </motion.p>
            </div>
            {brands.map((b, i) => (
              <motion.div key={b.name} className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.12, duration: 0.6, type: 'spring', stiffness: 200 }}
              >
                <div className="relative">
                  {/* Outer pulse rings for PRE */}
                  {b.highlight && (
                    <>
                      <motion.div className="absolute -inset-2 rounded-full"
                        style={{ border: '1px solid rgba(200,145,58,0.1)' }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.div className="absolute -inset-4 rounded-full"
                        style={{ border: '1px solid rgba(200,145,58,0.06)' }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                      />
                    </>
                  )}
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center relative"
                    style={{
                      background: b.highlight ? 'rgba(200,145,58,0.12)' : 'rgba(255,255,255,0.02)',
                      border: `2px solid ${b.highlight ? '#c8913a' : 'rgba(255,255,255,0.06)'}`,
                      color: b.highlight ? '#c8913a' : '#5a5650',
                    }}
                    animate={b.highlight ? {
                      boxShadow: ['0 0 0px rgba(200,145,58,0)', '0 0 24px rgba(200,145,58,0.25)', '0 0 0px rgba(200,145,58,0)'],
                      borderColor: ['#c8913a', '#e8c875', '#c8913a'],
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <motion.span className="text-sm font-bold"
                      animate={b.highlight ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {scores[i]}/{features.length}
                    </motion.span>
                  </motion.div>
                </div>
                <motion.span className="text-[10px] font-bold tracking-wide"
                  style={{ color: b.highlight ? '#c8913a' : '#5a5650' }}
                  animate={b.highlight ? { opacity: [0.8, 1, 0.8] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {b.short}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Connecting line between headers and rows */}
          <motion.div className="relative h-px mb-4 mx-4 overflow-hidden rounded-full"
            style={{ background: 'rgba(200,145,58,0.06)' }}
          >
            <motion.div className="absolute inset-y-0 w-1/3 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(200,145,58,0.3), transparent)' }}
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Feature rows */}
          <div className="relative flex flex-col gap-2.5">
            {features.map((f, fi) => (
              <motion.div key={f.name}
                className="grid items-center gap-3 rounded-2xl py-4 px-4 relative overflow-hidden"
                style={{
                  gridTemplateColumns: '1fr repeat(4, 64px)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.03)',
                }}
                initial={{ opacity: 0, x: -30, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.3 + fi * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(200,145,58,0.08)',
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Shimmer on hover */}
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(200,145,58,0.03), transparent)', width: '200%' }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: fi * 0.8 }}
                />

                <div className="relative">
                  <span className="text-xs font-semibold block mb-0.5" style={{ color: '#f2f0ed' }}>{f.name}</span>
                  <span className="text-[10px] leading-tight block" style={{ color: '#3a3530' }}>{f.desc}</span>
                </div>
                {f.values.map((v, vi) => (
                  <div key={vi} className="flex justify-center relative">
                    {v === true ? (
                      <motion.div
                        className="w-7 h-7 rounded-full flex items-center justify-center relative"
                        style={{
                          background: vi === 0 ? '#c8913a' : 'rgba(242,240,237,0.08)',
                          border: vi === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                        }}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{
                          scale: 1,
                          rotate: 0,
                          boxShadow: vi === 0
                            ? ['0 0 6px rgba(200,145,58,0.1)', '0 0 18px rgba(200,145,58,0.35)', '0 0 6px rgba(200,145,58,0.1)']
                            : ['none'],
                        }}
                        transition={{
                          scale: { delay: 0.5 + fi * 0.1 + vi * 0.05, duration: 0.4, type: 'spring', stiffness: 300 },
                          rotate: { delay: 0.5 + fi * 0.1 + vi * 0.05, duration: 0.4 },
                          boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: fi * 0.3 },
                        }}
                        whileHover={{ scale: 1.3 }}
                      >
                        <motion.svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke={vi === 0 ? '#0c0a07' : '#6a6560'} strokeWidth="3"
                          strokeLinecap="round" strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.7 + fi * 0.1, duration: 0.3 }}
                        >
                          <polyline points="20 6 9 17 4 12"/>
                        </motion.svg>
                      </motion.div>
                    ) : v === 'partial' ? (
                      <motion.div className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ border: '1.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + fi * 0.1 + vi * 0.05, type: 'spring' }}
                        whileHover={{ scale: 1.2, borderColor: 'rgba(255,255,255,0.2)' }}
                      >
                        <motion.div className="w-2 h-2 rounded-full" style={{ background: '#5a5650' }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ border: '1.5px solid rgba(255,255,255,0.04)' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + fi * 0.1 + vi * 0.05, type: 'spring' }}
                        whileHover={{ scale: 1.15, borderColor: 'rgba(255,255,255,0.1)' }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                          stroke="rgba(255,255,255,0.08)" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Animated divider */}
          <motion.div className="relative h-px mt-6 mb-5 mx-4 overflow-hidden rounded-full"
            style={{ background: 'rgba(200,145,58,0.06)' }}
          >
            <motion.div className="absolute inset-y-0 w-1/4 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(200,145,58,0.4), transparent)' }}
              animate={{ x: ['-100%', '500%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>

          {/* Bottom summary */}
          <motion.div className="relative flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.p className="text-[10px]" style={{ color: '#5a5650' }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Danacol PRE uniquely covers all 5 key differentiators
            </motion.p>
            <motion.div className="flex items-center gap-1.5 px-4 py-2 rounded-full relative overflow-hidden"
              style={{ background: 'rgba(200,145,58,0.06)', border: '1px solid rgba(200,145,58,0.15)' }}
              animate={{
                boxShadow: ['0 0 0px rgba(200,145,58,0)', '0 0 16px rgba(200,145,58,0.2)', '0 0 0px rgba(200,145,58,0)'],
                borderColor: ['rgba(200,145,58,0.1)', 'rgba(200,145,58,0.25)', 'rgba(200,145,58,0.1)'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(200,145,58,0.08), transparent)', width: '200%' }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <span className="relative text-xs font-bold" style={{ color: '#c8913a' }}>5/5</span>
              <span className="relative text-[10px]" style={{ color: '#8a857e' }}>score</span>
            </motion.div>
          </motion.div>
        </div>
      )
    }

    default:
      return null
  }
}
