import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 h-px z-[200]"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: 'left',
        background: 'linear-gradient(90deg, rgba(200,145,58,0.4), rgba(200,145,58,0.8))',
      }}
    />
  )
}
