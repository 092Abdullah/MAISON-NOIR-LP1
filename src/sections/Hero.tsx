import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Same URL as the <link rel="preload"> in index.html — must match exactly for the preload hint to be used
const HERO_SRC = 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1600';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  // Parallax only applied to the image after it has already painted — no effect on LCP timing
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={sectionRef} id="top" className="relative flex h-[100svh] min-h-[700px] w-full flex-col overflow-hidden">

      {/*
        LCP element: real <img> with fetchpriority="high" + loading="eager" + decoding="sync".
        The preload hint in index.html ensures the browser starts fetching this before JS even runs.
        motion.div wraps it for parallax but the image itself is not a background-image,
        so the browser can discover and prioritise it immediately.
      */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 overflow-hidden"
      >
        <img
          src={HERO_SRC}
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="h-[115%] w-full object-cover object-[center_35%]"
          style={{ willChange: 'transform' }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.80) 100%)' }}
      />

      {/* Top metadata row — desktop only */}
      <div className="pointer-events-none absolute left-0 right-0 top-[5.5rem] hidden items-center justify-between px-14 md:flex">
        <span className="text-label text-[#555]">Est. 2013</span>
        <span className="text-label text-[#555]">New York · Paris</span>
      </div>

      {/* Main content */}
      <motion.div style={{ y: contentY }} className="relative mt-auto px-5 pb-20 sm:px-8 sm:pb-28 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-white/50" />
          <span className="text-label text-[#a8a8a8]">Interior Design Studio</span>
        </motion.div>

        <h1 className="mb-8 max-w-4xl font-display leading-[0.93] tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="block text-[clamp(3rem,7.5vw,6.5rem)] text-white"
          >
            Spaces with a
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
            className="block text-[clamp(3rem,7.5vw,6.5rem)] italic text-white/80"
          >
            quiet sense of home.
          </motion.span>
        </h1>

        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="max-w-sm text-[0.9375rem] leading-relaxed text-white/60"
          >
            Full-service studio crafting refined, livable interiors — defined by materiality, light, and the detail you feel before you notice.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.72 }}
            className="flex shrink-0 flex-wrap items-center gap-3"
          >
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-white/90">
              View our work <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/50 hover:text-white">
              Book a consult
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <motion.div
          animate={{ scaleY: [1, 0.35, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-10 w-px origin-top bg-gradient-to-b from-white/50 to-transparent"
        />
        <span className="text-label text-[#444]">Scroll</span>
      </motion.div>
    </section>
  );
}
