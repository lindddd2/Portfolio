import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { CardStack } from '@/components/ui/CardStack'
import BorderGlow from '@/components/ui/BorderGlow'

const projects = [
  {
    tag: 'ESADE x Danone',
    title: 'Danone Brand Strategy',
    desc: 'Collaborated on a strategic marketing project with Danone, applying consumer behaviour frameworks and brand management principles to develop actionable recommendations for product positioning and audience engagement across European markets.',
    skills: ['Brand Management', 'Consumer Behaviour', 'Marketing Strategy', 'Market Research'],
  },
  {
    tag: 'ESADE x Volkswagen',
    title: 'Volkswagen Market Analysis',
    desc: 'Developed a comprehensive market analysis and digital marketing strategy for Volkswagen, leveraging marketing analytics and consumer insights to identify growth opportunities in competitive automotive segments.',
    skills: ['Digital Marketing', 'Marketing Analytics', 'Competitive Analysis', 'Strategic Planning'],
  },
  {
    tag: 'Anhermas F&B',
    title: 'Multi-Venue Operations Optimisation',
    desc: 'Led a cross-venue operational review covering P&L analysis, supplier renegotiations, and customer retention strategies. Achieved food cost reductions of up to 5% and implemented data-driven promotional initiatives across 5+ locations.',
    skills: ['P&L Analysis', 'Supplier Negotiation', 'User Behaviour', 'Team Management'],
  },
]

function ProjectCard({ p, onClick }: { p: typeof projects[0]; onClick?: () => void }) {
  return (
    <BorderGlow
      backgroundColor="#131110"
      borderRadius={24}
      glowColor="38 70 55"
      glowRadius={30}
      glowIntensity={0.6}
      edgeSensitivity={25}
      coneSpread={30}
      colors={['#c8913a', '#e8c875', '#6a5530']}
      fillOpacity={0.25}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[400px] flex flex-col items-center justify-center gap-4 relative"
             style={{ background: 'rgba(12,10,7,0.8)' }}>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[150px] rounded-full pointer-events-none"
               style={{ background: 'radial-gradient(ellipse, rgba(200,145,58,0.05) 0%, transparent 70%)' }} />
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"
               strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.1, color: '#8a857e' }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span className="text-xs" style={{ color: '#3a3530' }}>Project image</span>
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <span className="inline-flex self-start px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide mb-4 border"
                style={{ background: 'rgba(200,145,58,0.04)', borderColor: 'rgba(200,145,58,0.12)', color: '#c8913a' }}>
            {p.tag}
          </span>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
            {p.title}
          </h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#6a6560' }}>
            {p.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {p.skills.map(s => (
              <span key={s} className="px-3 py-1 rounded-lg text-[11px] font-medium"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: '#5a5650' }}>
                {s}
              </span>
            ))}
          </div>
          {onClick && (
            <button onClick={onClick}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3 cursor-pointer bg-transparent border-none"
              style={{ color: '#c8913a' }}>
              View Case Study <span>→</span>
            </button>
          )}
        </div>
      </div>
    </BorderGlow>
  )
}

export default function FeaturedProjects({ onDanacolClick, onVWClick }: { onDanacolClick?: () => void; onVWClick?: () => void }) {
  const [ref, inView] = useScrollReveal(0.05)

  return (
    <section id="projects" ref={ref} style={{ background: 'transparent' }}>
      {/* Header */}
      <div className="px-6 md:px-12 pt-24 pb-4">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-4 text-xs font-semibold tracking-[0.15em] uppercase"
            style={{ color: '#c8913a' }}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span className="h-px" style={{ background: 'rgba(200,145,58,0.4)' }}
              initial={{ width: 0 }} animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }} />
            Featured Projects
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Work that drives<br />real impact
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Scroll-stacking cards */}
      <div className="max-w-[1100px] mx-auto">
        <CardStack stickyHeight="400vh">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} onClick={i === 0 ? onDanacolClick : i === 1 ? onVWClick : undefined} />
          ))}
        </CardStack>
      </div>
    </section>
  )
}
