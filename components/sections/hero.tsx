'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '36%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.65, 0.9]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-background"
    >
      {/* Parallax image */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 -z-10">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=2000)' }}
        />
      </motion.div>
      {/* Gradient overlay */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/20 to-background" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/50 via-transparent to-transparent" />

      {/* Top meta */}
      <div className="container-mw container-px absolute inset-x-0 top-24 hidden items-center justify-between text-xs uppercase tracking-[0.28em] text-foreground/30 sm:flex">
        <span>Est. 2013</span>
        <span>New York · Paris</span>
      </div>

      <motion.div
        style={{ y: contentY }}
        className="container-mw container-px relative flex h-full flex-col justify-end pb-24 sm:pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mb-5 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs uppercase tracking-[0.32em] text-primary">Interior Design Studio</span>
        </motion.div>

        <h1 className="max-w-5xl font-display text-5xl font-medium leading-[0.96] tracking-tight text-foreground sm:text-[5rem] lg:text-[6.5rem]">
          <motion.span initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} className="block">
            Spaces with a
          </motion.span>
          <motion.span initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 }} className="block italic text-primary">
            quiet sense of home.
          </motion.span>
        </h1>

        <div className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="max-w-md text-pretty text-base leading-relaxed text-foreground/60 sm:text-lg"
          >
            Maison Noir is a full-service studio crafting refined, livable interiors with an
            emphasis on materiality, light, and the kind of detail you feel before you notice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
            className="flex items-center gap-3"
          >
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-foreground/90 px-6 py-3 text-sm font-medium text-background transition-all hover:bg-primary hover:text-primary-foreground">
              View our work
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-sm font-medium text-foreground/70 transition-colors hover:border-foreground/35 hover:text-foreground">
              Book a consult
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-foreground/30 md:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.35em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
