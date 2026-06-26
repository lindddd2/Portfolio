import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface CardStackProps {
  children: ReactNode[]
  stickyHeight?: string
}

export function CardStack({ children, stickyHeight = '300vh' }: CardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const count = children.length

  return (
    <div ref={containerRef} style={{ height: stickyHeight, position: 'relative' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full relative">
          {children.map((child, i) => (
            <StackCard
              key={i}
              index={i}
              total={count}
              scrollYProgress={scrollYProgress}
            >
              {child}
            </StackCard>
          ))}
        </div>
      </div>
    </div>
  )
}

function StackCard({
  children,
  index,
  total,
  scrollYProgress,
}: {
  children: ReactNode
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const segmentSize = 1 / total
  const start = index * segmentSize
  const end = start + segmentSize
  const nextEnd = Math.min(end + segmentSize, 1)

  const y = useTransform(scrollYProgress, [start, end], ['100vh', '0vh'])
  const scale = useTransform(scrollYProgress, [end, nextEnd], [1, 0.9])
  const filterBlur = useTransform(scrollYProgress, [end, nextEnd], [0, 4])

  const isLast = index === total - 1

  return (
    <motion.div
      className="w-full"
      style={{
        position: index === 0 ? 'relative' : 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: index + 1,
        y: index === 0 ? 0 : y,
        scale: isLast ? 1 : scale,
      }}
    >
      {isLast ? (
        children
      ) : (
        <BlurLayer blur={filterBlur}>{children}</BlurLayer>
      )}
    </motion.div>
  )
}

function BlurLayer({ children, blur }: { children: ReactNode; blur: MotionValue<number> }) {
  const filter = useTransform(blur, v => v > 0.3 ? `blur(${v}px)` : 'none')
  return <motion.div style={{ filter }}>{children}</motion.div>
}

export default CardStack
