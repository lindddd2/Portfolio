import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { TrendingUp, DollarSign, Users, Eye, BarChart3, Globe, type LucideIcon } from 'lucide-react'
import { CardStack } from '@/components/ui/CardStack'
import BorderGlow from '@/components/ui/BorderGlow'

const strengths = [
  { title: 'Marketing Strategy', desc: 'ESADE-trained in brand management, consumer behaviour, and digital marketing analytics. Experienced in building data-driven campaigns that drive measurable business outcomes.', icon: TrendingUp },
  { title: 'Financial Analysis', desc: 'P&L analysis across multiple venues, cost optimisation, and supplier renegotiations that delivered up to 5% food cost reductions. Deep understanding of unit economics.', icon: DollarSign },
  { title: 'Team Leadership', desc: 'Managing multi-site teams, coordinating with local managers, and aligning operational execution with company objectives across 5+ venues in the F&B sector.', icon: Users },
  { title: 'Consumer Insights', desc: 'User behaviour analysis, retention strategies, and customer experience optimisation. Leveraging CRM tools like HubSpot for data-driven decisions.', icon: Eye },
  { title: 'Data & Analytics', desc: 'Proficient in KPI tracking, reporting dashboards, Google Analytics, RStudio, and Gretl. Strong foundation in econometrics and statistical modelling.', icon: BarChart3 },
  { title: 'Multilingual Communication', desc: 'Native in Spanish, Chinese, and Catalan with business-fluent English. Thriving in international and multicultural environments.', icon: Globe },
]

function StrengthCard({ s, index }: { s: { title: string; desc: string; icon: LucideIcon }; index: number }) {
  const Icon = s.icon
  return (
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
      <div className="p-10 md:p-14">
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
               style={{ background: 'rgba(200,145,58,0.06)', border: '1px solid rgba(200,145,58,0.08)' }}>
            <Icon size={26} style={{ color: '#c8913a' }} strokeWidth={1.5} />
          </div>
          <span className="text-sm font-medium" style={{ color: '#3a3530' }}>
            {String(index + 1).padStart(2, '0')} / {String(strengths.length).padStart(2, '0')}
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
          {s.title}
        </h3>
        <p className="text-lg leading-relaxed" style={{ color: '#6a6560' }}>
          {s.desc}
        </p>
      </div>
    </BorderGlow>
  )
}

export default function Strengths() {
  const [ref, inView] = useScrollReveal(0.05)

  return (
    <section id="strengths" ref={ref} style={{ background: 'transparent' }}>
      {/* Header */}
      <div className="px-6 md:px-12 pt-24 pb-4">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-4 text-xs font-semibold tracking-[0.15em] uppercase"
            style={{ color: '#c8913a' }}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span className="h-px" style={{ background: 'rgba(200,145,58,0.4)' }}
              initial={{ width: 0 }} animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }} />
            Personal Strengths
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}
              initial={{ y: '110%', rotate: 2 }}
              animate={inView ? { y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Skills & capabilities
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Scroll-stacking cards */}
      <div className="max-w-[1100px] mx-auto">
        <CardStack stickyHeight="700vh">
          {strengths.map((s, i) => (
            <StrengthCard key={s.title} s={s} index={i} />
          ))}
        </CardStack>
      </div>
    </section>
  )
}
