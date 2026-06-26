import { motion } from "framer-motion";
import { ButtonColorful } from "@/components/ui/button-colorful";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.25, 0.4, 0.25, 1] as const },
});

function HeroGeometric({
    badge = "MSc Marketing Management · Business Development",
    photoSrc = "/photo-nobg.png",
}: {
    badge?: string;
    photoSrc?: string;
}) {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
             style={{ background: 'transparent' }}>

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6">

                {/* Text block */}
                <div className="relative">
                  {/* Greeting — left-aligned above MARKETING */}
                  <motion.p {...fadeUp(0.3)}
                    className="text-base md:text-lg mb-3 font-light text-left"
                    style={{ color: '#8a857e' }}>
                    Hi, I'm Linxuan, an aspiring
                  </motion.p>

                  {/* MARKETING */}
                  <motion.div {...fadeUp(0.5)}
                    className="relative z-10 text-[clamp(3.5rem,13vw,11rem)] font-black tracking-tighter leading-[0.85] uppercase text-left"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#f2f0ed' }}>
                    MARKETING
                  </motion.div>

                  {/* MANAGER — outline */}
                  <motion.div {...fadeUp(0.6)}
                    className="relative z-10 text-[clamp(3.5rem,13vw,11rem)] font-black tracking-tighter leading-[0.85] uppercase text-left"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: 'transparent',
                      WebkitTextStroke: '2px rgba(242,240,237,0.12)',
                    }}>
                    MANAGER
                  </motion.div>

                  {/* Photo — ON TOP of words */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                      zIndex: 20,
                      width: 'clamp(280px, 40vw, 500px)',
                      bottom: '-20%',
                    }}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={photoSrc}
                      alt="Linxuan Qiu"
                      className="w-full h-auto object-contain"
                      style={{
                        filter: 'grayscale(15%) contrast(1.05)',
                        opacity: 0.92,
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)',
                      }}
                    />
                  </motion.div>
                </div>

                {/* Currently + CTAs */}
                <motion.div {...fadeUp(0.9)}
                  className="relative z-30 flex flex-col items-start gap-1 mt-6 mb-6">
                  <p className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#5a5650' }}>
                    Currently
                  </p>
                  <p className="text-sm font-medium" style={{ color: '#8a857e' }}>
                    {badge}
                  </p>
                </motion.div>

                <motion.div {...fadeUp(1.0)}
                  className="relative z-30 flex items-center gap-4 flex-wrap">
                  <a href="#contact">
                    <ButtonColorful label="Contact" />
                  </a>
                  <a href="#projects">
                    <ButtonColorful
                      label="My Projects"
                      gradientFrom="from-white/20"
                      gradientVia="via-white/10"
                      gradientTo="to-white/20"
                      className="border border-white/10"
                    />
                  </a>
                </motion.div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[3]"
                 style={{ background: 'linear-gradient(to top, #0c0a07, transparent)' }} />
        </div>
    );
}

export { HeroGeometric }
