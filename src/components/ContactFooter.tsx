import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Mail, Phone, MapPin } from 'lucide-react'

const contactMethods = [
  { icon: Mail, text: 'qiulinxuan5@gmail.com', href: 'mailto:qiulinxuan5@gmail.com' },
  { icon: Phone, text: '+34 688 488 688', href: 'tel:+34688488688' },
  { icon: MapPin, text: 'Barcelona, Spain' },
]

export default function ContactFooter() {
  const [ref, inView] = useScrollReveal(0.15)

  return (
    <section id="contact" ref={ref}
             className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 py-24 relative overflow-hidden"
             style={{ background: 'transparent' }}>
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full top-[10%] left-[-10%]"
          style={{ background: '#c8913a', filter: 'blur(150px)' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 0.06, scale: 1 } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bottom-[10%] right-[-10%]"
          style={{ background: '#816B8D', filter: 'blur(150px)' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 0.05, scale: 1 } : {}}
          transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div className="relative z-10 max-w-[650px]">
        {/* Label — fades in with tracking expansion */}
        <motion.div
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
          style={{ color: '#c8913a' }}
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={inView ? { opacity: 1, letterSpacing: '0.2em' } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Get in Touch
        </motion.div>

        {/* Title — each line reveals from below with overflow clip */}
        <div className="mb-6">
          <div className="overflow-hidden">
            <motion.div
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}
              initial={{ y: '120%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Let's create
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}
              initial={{ y: '120%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              something great
            </motion.div>
          </div>
        </div>

        {/* Subtitle — fades in */}
        <motion.p
          className="text-base mb-12 leading-relaxed max-w-md mx-auto"
          style={{ color: '#5a5650' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Open to new professional opportunities in product management, marketing,
          and business development. Let's connect.
        </motion.p>

        {/* Contact methods — pop in with scale one at a time */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {contactMethods.map((item, i) => {
            const Icon = item.icon
            const Wrapper = item.href ? motion.a : motion.div
            return (
              <Wrapper key={item.text} {...(item.href ? { href: item.href } : {})}
                className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{
                  background: '#161310',
                  border: '1px solid rgba(255,255,255,0.04)',
                  color: '#8a857e',
                }}
                initial={{ opacity: 0, y: 30, scale: 0.85 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.65 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <Icon size={16} style={{ color: '#c8913a' }} strokeWidth={1.5} />
                {item.text}
              </Wrapper>
            )
          })}
        </div>

        {/* Footer — divider expands, text fades */}
        <div>
          <motion.div
            className="h-px mx-auto mb-6"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.p
            className="text-xs"
            style={{ color: '#3a3530' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            &copy; {new Date().getFullYear()} Linxuan Qiu. All rights reserved.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
