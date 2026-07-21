import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BeforeAfter } from '@/components/BeforeAfter';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { beforeAfterPairs } from '@/lib/data';
import { cn } from '@/lib/utils';
export function Transformations() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = beforeAfterPairs.length;
  const go = (next: number) => { setDirection(next > index ? 1 : -1); setIndex((next + total) % total); };
  const current = beforeAfterPairs[index];
  const variants = { enter: (d: number) => ({ opacity: 0, x: d * 40 }), center: { opacity: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: d * -40 }) };
  return (
    <section id="transformations" className="border-b border-[#1e1e1e] bg-[#111] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">Before &amp; After</span></div>
            <SectionHeading text="The Transformation" className="text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
          </Reveal>
          <div className="flex shrink-0 items-center gap-3">
            <button onClick={() => go(index - 1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2a2a2a] text-[#444] transition-all hover:border-[#a8a8a8] hover:text-[#e2e2e2]"><ChevronLeft className="h-4 w-4" /></button>
            <span className="min-w-[3rem] text-center text-label text-[#444]">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <button onClick={() => go(index + 1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2a2a2a] text-[#444] transition-all hover:border-[#a8a8a8] hover:text-[#e2e2e2]"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={current.id} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <BeforeAfter before={current.before} after={current.after} initialPosition={50} />
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div><p className="font-display text-xl text-[#e2e2e2]">{current.title}</p><p className="mt-1 text-sm text-[#444]">{current.location}</p></div>
          <div className="flex items-center gap-2">{beforeAfterPairs.map((_, i) => <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} className={cn('h-1.5 rounded-full transition-all duration-300', i === index ? 'w-6 bg-[#a8a8a8]' : 'w-1.5 bg-[#2a2a2a] hover:bg-[#444]')} />)}</div>
        </div>
        <p className="mt-4 text-label text-[#333]">Drag the handle to reveal</p>
      </div>
    </section>
  );
}
