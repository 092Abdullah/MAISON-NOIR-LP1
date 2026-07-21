import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/lib/data';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section className="border-b border-[#1e1e1e] bg-[#111] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
        <Reveal className="mb-14">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-white/20" />
            <span className="text-label text-[#555]">Client words</span>
          </div>
          <SectionHeading text="What They Say" className="text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-row gap-5 lg:flex-col">
            {testimonials.map((t, i) => (
              <button key={t.id} onClick={() => setActive(i)} className={cn('text-left transition-colors', active === i ? 'text-[#e2e2e2]' : 'text-[#2a2a2a] hover:text-[#444]')}>
                <span className="block text-sm font-medium">{t.author.split('&')[0].trim()}</span>
                <span className="block text-xs text-[#333]">{t.project}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-8 font-display text-2xl italic leading-[1.45] text-[#e2e2e2] sm:text-3xl lg:text-4xl">"{testimonials[active].quote}"</p>
              <footer className="text-sm text-[#444]">
                — {testimonials[active].author}, <span className="text-[#333]">{testimonials[active].project}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
