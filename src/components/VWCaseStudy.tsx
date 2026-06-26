import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Zap, Users, Target, TrendingUp, Car, Cpu, FileText, ArrowUpRight, ChevronRight, Shield, BookOpen } from 'lucide-react'
import BorderGlow from '@/components/ui/BorderGlow'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const challenges = [
  {
    id: 'retention',
    title: 'Retention of Combustion Customers',
    short: 'Customer Retention',
    icon: Users,
    metrics: [
      { label: 'Churn Target', value: 'Maintain avg.' },
      { label: 'Timeline', value: '2025-2030' },
      { label: 'Priority', value: 'HIGH' },
    ],
    strategies: [
      { name: 'Educational Email Campaign', desc: 'Compare each ICE model with its EV counterpart to increase awareness of VW EVs among existing customers.' },
      { name: 'Testimonial Stories', desc: 'Ad campaign with real customer stories about how their lives changed after choosing a VW EV — building trust and addressing myths.' },
      { name: '"Try-Before-You-Buy" 48h', desc: 'Extended test drives for premium models (€50K-€80K) to overcome resistance through firsthand experience.' },
      { name: '"1-2-3 EV Ready" Package', desc: 'Trade-in bundle: EV vehicle + free Volkswagen ID. Charger + one year of free maintenance.' },
    ],
  },
  {
    id: 'competition',
    title: 'High Competition',
    short: 'Market Competition',
    icon: TrendingUp,
    metrics: [
      { label: 'VW EV Share (Spain)', value: '2.4%' },
      { label: 'Tesla Share', value: '27%' },
      { label: 'Target Audience', value: 'Gen Z/Y' },
    ],
    strategies: [
      { name: 'Pay-Per-Minute EV Rentals', desc: 'Partner with Europcar to launch flexible urban EV mobility for eco-conscious youth in Barcelona and Madrid.' },
      { name: 'Sustainable Road Trip Challenge', desc: 'Gamified EV routes across Spain — earn rewards at charging stops, redeemable for maintenance or credits.' },
      { name: '"Drive the Change" Campaign', desc: 'Transform brand perception from "parents\' brand" to youth-centric sustainable mobility through digital + influencer campaigns.' },
    ],
  },
  {
    id: 'complexity',
    title: 'Complexity in Line Extensions',
    short: 'Line Simplification',
    icon: Cpu,
    metrics: [
      { label: 'Strategy', value: 'SKU Reduction' },
      { label: 'Decision Time', value: '3 minutes' },
      { label: 'Approach', value: 'Less is More' },
    ],
    strategies: [
      { name: '"Less is More" — SKU Reduction', desc: 'Focus on top-performing EV models with fewer but better configurations. Clear product tiers: Basic, Performance, Sport.' },
      { name: '"The 3-Minute Decision"', desc: 'AI-powered quiz analyzing preferences and driving habits to recommend the perfect VW EV model in under 3 minutes.' },
      { name: 'Minimalist Showrooms', desc: 'Redesigned showrooms with key models and interactive displays for an engaging, simplified purchase experience.' },
    ],
  },
]

type SubView = 'overview' | 'challenges' | 'docs'

export default function VWCaseStudy({ onBack }: { onBack: () => void }) {
  const [subView, setSubView] = useState<SubView>('overview')
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null)

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-20 flex items-center justify-between"
           style={{ background: 'rgba(12,10,7,0.9)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <button onClick={subView === 'overview' ? onBack : () => { setSubView('overview'); window.scrollTo(0, 0); }}
          className="flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer bg-transparent border-none group"
          style={{ color: '#8a857e' }}>
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          {subView === 'overview' ? 'Back' : 'Overview'}
        </button>
        <div className="flex items-center gap-4">
          <motion.div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono"
            style={{ color: '#3a3530' }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#c8913a' }} />
            SYSTEM ACTIVE
          </motion.div>
          <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#c8913a' }}>Case Study</span>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {subView === 'overview' && (
          <motion.div key="overview"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <OverviewView setSubView={setSubView} />
          </motion.div>
        )}
        {subView === 'challenges' && (
          <motion.div key="challenges"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}>
            <ChallengesView activeChallenge={activeChallenge} setActiveChallenge={setActiveChallenge} />
          </motion.div>
        )}
        {subView === 'docs' && (
          <motion.div key="docs"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}>
            <DocsView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ════════════════════════════════════════ OVERVIEW ════════════════════════════════════════ */
function OverviewView({ setSubView }: { setSubView: (v: SubView) => void }) {
  return (
    <div className="pb-32">
      {/* Hero */}
      <header className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden">
        {/* VW ID.4 background — more visible */}
        <div className="absolute inset-0">
          <img src="/vw-id4.avif" alt="" className="w-full h-full object-cover"
               style={{ opacity: 0.3, filter: 'grayscale(40%) contrast(1.3) brightness(0.9)' }} />
          <div className="absolute inset-0"
               style={{ background: 'linear-gradient(100deg, rgba(12,10,7,0.92) 0%, rgba(12,10,7,0.6) 45%, rgba(12,10,7,0.75) 100%)' }} />
          <div className="absolute inset-0"
               style={{ background: 'radial-gradient(ellipse at 65% 45%, transparent 25%, rgba(12,10,7,0.85) 75%)' }} />
        </div>

        {/* FUI Grid — more visible */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(200,145,58,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,145,58,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at 55% 45%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 55% 45%, black 30%, transparent 75%)',
        }} />

        {/* Animated scanning line */}
        <motion.div className="absolute left-0 right-0 h-px pointer-events-none z-[5]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,145,58,0.3), transparent)' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Corner brackets — FUI decoration */}
        <div className="absolute top-24 left-6 md:left-12 w-8 h-8 pointer-events-none"
             style={{ borderLeft: '1px solid rgba(200,145,58,0.15)', borderTop: '1px solid rgba(200,145,58,0.15)' }} />
        <div className="absolute top-24 right-6 md:right-12 w-8 h-8 pointer-events-none"
             style={{ borderRight: '1px solid rgba(200,145,58,0.15)', borderTop: '1px solid rgba(200,145,58,0.15)' }} />
        <div className="absolute bottom-8 left-6 md:left-12 w-8 h-8 pointer-events-none"
             style={{ borderLeft: '1px solid rgba(200,145,58,0.1)', borderBottom: '1px solid rgba(200,145,58,0.1)' }} />
        <div className="absolute bottom-8 right-6 md:right-12 w-8 h-8 pointer-events-none"
             style={{ borderRight: '1px solid rgba(200,145,58,0.1)', borderBottom: '1px solid rgba(200,145,58,0.1)' }} />

        <div className="relative z-10 max-w-[1200px] mx-auto w-full pt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.div {...fade(0.1)} className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border"
                    style={{ background: 'rgba(200,145,58,0.04)', borderColor: 'rgba(200,145,58,0.12)', color: '#c8913a' }}>
                ESADE x Volkswagen
              </span>
            </motion.div>

            <motion.h1 {...fade(0.2)}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.92] mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
              Driving the<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c8913a] via-[#e8c875] to-[#c8913a]">
                Electric Future
              </span>
            </motion.h1>

            <motion.p {...fade(0.3)}
              className="text-base md:text-lg leading-relaxed mb-8 max-w-[500px]"
              style={{ color: '#6a6560' }}>
              A strategic brand analysis positioning Volkswagen Spain for the transition
              from combustion to electric vehicles — tackling retention, competition, and product complexity.
            </motion.p>

            <motion.div {...fade(0.4)} className="flex flex-wrap gap-2">
              {['Brand Strategy', 'EV Transition', 'Market Analysis', 'Customer Retention', 'Servitization'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-lg text-[11px] font-medium"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: '#5a5650' }}>
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: FUI data panel */}
          <motion.div {...fade(0.5)} className="hidden lg:block">
            <BorderGlow backgroundColor="#0f0d0a" borderRadius={20} glowColor="38 70 55"
              glowRadius={20} glowIntensity={0.4} edgeSensitivity={25} coneSpread={30}
              colors={['#c8913a', '#e8c875', '#6a5530']} fillOpacity={0.1}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-5 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: '#c8913a' }}>Market Overview</span>
                  <motion.span className="text-[10px] font-mono" style={{ color: '#3a3530' }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}>LIVE DATA</motion.span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: 'EV CAGR', value: '15.09%', icon: TrendingUp },
                    { label: 'VW EV Share', value: '2.4%', icon: Car },
                    { label: 'EV Growth', value: '+35%', icon: Zap },
                    { label: 'Market Target', value: 'Spain', icon: Target },
                  ].map((s, i) => {
                    const Icon = s.icon
                    return (
                      <motion.div key={s.label} className="p-3 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}
                        animate={{ borderColor: ['rgba(200,145,58,0.03)', 'rgba(200,145,58,0.08)', 'rgba(200,145,58,0.03)'] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={12} style={{ color: '#c8913a' }} />
                          <span className="text-[9px] font-medium tracking-wide uppercase" style={{ color: '#5a5650' }}>{s.label}</span>
                        </div>
                        <span className="text-lg font-bold font-mono" style={{ color: '#f2f0ed' }}>{s.value}</span>
                      </motion.div>
                    )
                  })}
                </div>
                {/* Progress bars */}
                <div className="space-y-3 mb-5">
                  {[
                    { label: 'Combustion → EV Transition', value: 35 },
                    { label: 'Youth Market Penetration', value: 18 },
                    { label: 'Line Simplification', value: 60 },
                  ].map((bar, i) => (
                    <div key={bar.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px]" style={{ color: '#5a5650' }}>{bar.label}</span>
                        <span className="text-[10px] font-mono" style={{ color: '#c8913a' }}>{bar.value}%</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <motion.div className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #c8913a, #e8c875)' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${bar.value}%` }}
                          transition={{ delay: 1 + i * 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Extra: Key competitors */}
                <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase" style={{ color: '#5a5650' }}>Top EV Competitors</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: 'Tesla', share: 27 },
                      { name: 'BMW', share: 12 },
                      { name: 'BYD', share: 8 },
                      { name: 'Volkswagen', share: 2.4, highlight: true },
                    ].map((comp) => (
                      <div key={comp.name} className="flex items-center gap-3">
                        <span className="text-[10px] w-20 shrink-0" style={{ color: comp.highlight ? '#c8913a' : '#5a5650' }}>{comp.name}</span>
                        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <motion.div className="h-full rounded-full"
                            style={{ background: comp.highlight ? 'linear-gradient(90deg, #c8913a, #e8c875)' : 'rgba(255,255,255,0.1)' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${comp.share}%` }}
                            transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                        <span className="text-[10px] font-mono w-10 text-right" style={{ color: comp.highlight ? '#c8913a' : '#3a3530' }}>{comp.share}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wave status */}
                <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <span className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-3" style={{ color: '#5a5650' }}>Category Waves</span>
                  <div className="flex gap-2">
                    {[
                      { wave: 'W1', label: 'Combustion', status: 'DECLINE' },
                      { wave: 'W2', label: 'Electric', status: 'GROWTH' },
                      { wave: 'W3', label: 'Autonomous', status: 'INTRO' },
                    ].map(w => (
                      <div key={w.wave} className="flex-1 p-2 rounded-lg text-center"
                           style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
                        <span className="text-[9px] font-mono block" style={{ color: '#c8913a' }}>{w.wave}</span>
                        <span className="text-[9px] block" style={{ color: '#5a5650' }}>{w.label}</span>
                        <span className="text-[8px] font-bold" style={{ color: w.status === 'GROWTH' ? '#c8913a' : '#3a3530' }}>{w.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BorderGlow>
          </motion.div>
        </div>
      </header>

      {/* ═══ BOTTOM: Quick Access + Takeaways side by side ═══ */}
      <div className="px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-start">
          {/* Quick Access panel */}
          <motion.div {...fade(0.5)} className="rounded-2xl p-6"
            style={{ background: '#161310', border: '1px solid rgba(255,255,255,0.04)' }}>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase mb-5" style={{ color: '#5a5650' }}>Quick Access</p>
            <div className="flex gap-5">
              {[
                { label: 'Challenges', icon: Shield, view: 'challenges' as SubView },
                { label: 'Document', icon: BookOpen, view: 'docs' as SubView },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <motion.button key={item.label}
                    className="flex flex-col items-center gap-2.5 cursor-pointer bg-transparent border-none group"
                    onClick={() => { setSubView(item.view); window.scrollTo(0, 0); }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}>
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-200"
                         style={{
                           background: 'rgba(200,145,58,0.04)',
                           border: '1.5px solid rgba(200,145,58,0.1)',
                           clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)',
                         }}>
                      <Icon size={22} style={{ color: '#c8913a' }} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wide uppercase" style={{ color: '#5a5650' }}>{item.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Takeaway cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Convince the Past', desc: 'Retain combustion customers and guide them through the EV transition within VW\'s ecosystem.' },
              { title: 'Win the Future', desc: 'Capture younger audiences through flexible mobility solutions and renewed brand positioning.' },
              { title: 'Stay Ahead of the Curve', desc: 'Simplify the lineup and invest in autonomous driving to lead the next wave.' },
            ].map((item, i) => (
              <motion.div key={item.title}
                className="p-6 rounded-2xl"
                style={{ background: '#161310', border: '1px solid rgba(255,255,255,0.04)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ borderColor: 'rgba(200,145,58,0.1)', scale: 1.02 }}>
                <h3 className="text-sm font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>{item.title}</h3>
                <p className="text-[11px] leading-relaxed" style={{ color: '#6a6560' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════ CHALLENGES ════════════════════════════════════════ */
function ChallengesView({ activeChallenge, setActiveChallenge }: { activeChallenge: string | null; setActiveChallenge: (id: string | null) => void }) {
  return (
    <div className="pt-28 pb-32 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fade(0.1)} className="mb-12">
          <div className="flex items-center gap-3 mb-4 text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#c8913a' }}>
            <span className="w-8 h-px" style={{ background: 'rgba(200,145,58,0.4)' }} />
            Strategic Challenges
          </div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
            Three pillars of transformation
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {challenges.map((ch, i) => {
            const Icon = ch.icon
            const isActive = activeChallenge === ch.id
            return (
              <motion.button key={ch.id}
                className="text-left p-6 rounded-2xl transition-all duration-300 cursor-pointer border-none relative overflow-hidden"
                style={{
                  background: isActive ? 'rgba(200,145,58,0.06)' : '#161310',
                  border: `1px solid ${isActive ? 'rgba(200,145,58,0.2)' : 'rgba(255,255,255,0.04)'}`,
                }}
                onClick={() => setActiveChallenge(isActive ? null : ch.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                whileHover={{ borderColor: 'rgba(200,145,58,0.15)', scale: 1.01 }}>
                {isActive && (
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(200,145,58,0.04), transparent)', width: '200%' }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
                )}
                <div className="relative flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                       style={{ background: isActive ? 'rgba(200,145,58,0.1)' : 'rgba(200,145,58,0.04)' }}>
                    <Icon size={18} style={{ color: '#c8913a' }} strokeWidth={1.5} />
                  </div>
                  <motion.div className="px-2 py-0.5 rounded text-[9px] font-bold font-mono"
                    style={{ background: 'rgba(200,145,58,0.08)', color: '#c8913a' }}
                    animate={isActive ? { opacity: [0.7, 1, 0.7] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}>ACTIVE</motion.div>
                </div>
                <h3 className="relative text-sm font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: isActive ? '#f2f0ed' : '#8a857e' }}>{ch.short}</h3>
                <p className="relative text-[11px]" style={{ color: '#3a3530' }}>{ch.title}</p>
                <ChevronRight size={14} className="relative mt-3"
                  style={{ color: isActive ? '#c8913a' : '#3a3530', transform: isActive ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeChallenge && (() => {
            const ch = challenges.find(c => c.id === activeChallenge)!
            const Icon = ch.icon
            return (
              <motion.div key={activeChallenge}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <BorderGlow backgroundColor="#0f0d0a" borderRadius={24} glowColor="38 70 55"
                  glowRadius={25} glowIntensity={0.5} edgeSensitivity={25} coneSpread={30}
                  colors={['#c8913a', '#e8c875', '#6a5530']} fillOpacity={0.15}>
                  <div className="p-8 md:p-10">
                    <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                             style={{ background: 'rgba(200,145,58,0.08)', border: '1px solid rgba(200,145,58,0.12)' }}>
                          <Icon size={22} style={{ color: '#c8913a' }} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>{ch.title}</h3>
                      </div>
                      <div className="flex gap-3">
                        {ch.metrics.map(m => (
                          <div key={m.label} className="px-3 py-2 rounded-lg text-center"
                               style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <div className="text-xs font-bold" style={{ color: '#c8913a' }}>{m.value}</div>
                            <div className="text-[9px]" style={{ color: '#3a3530' }}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ch.strategies.map((s, i) => (
                        <motion.div key={s.name} className="p-5 rounded-xl"
                          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}
                          initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.4 }}>
                          <h4 className="text-sm font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>{s.name}</h4>
                          <p className="text-xs leading-relaxed" style={{ color: '#6a6560' }}>{s.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            )
          })()}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════ DOCS ════════════════════════════════════════ */
function DocsView() {
  return (
    <div className="pt-28 pb-32 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3 mb-4 text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#c8913a' }}>
          <span className="w-8 h-px" style={{ background: 'rgba(200,145,58,0.4)' }} />
          Documentation
        </div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
            Full Presentation
          </h2>
          <a href="/docs/vw-presentation.pdf" target="_blank" rel="noopener noreferrer"
             className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border"
             style={{ background: 'rgba(200,145,58,0.04)', borderColor: 'rgba(200,145,58,0.12)', color: '#c8913a' }}>
            <FileText size={14} />
            Open in new tab
            <ArrowUpRight size={12} />
          </a>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <iframe src="/docs/vw-presentation.pdf" className="w-full"
            style={{ height: '85vh', border: 'none', background: '#1a1a1a' }}
            title="Volkswagen Strategic Analysis" />
        </div>
      </div>
    </div>
  )
}
