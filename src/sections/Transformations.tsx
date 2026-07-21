import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { beforeAfterPairs } from '@/lib/data';
import { BeforeAfter } from '@/components/BeforeAfter';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { cn } from '@/lib/utils';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }),
};

export function Transformations() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + beforeAfterPairs.length) % beforeAfterPairs.length);
  };
  const pair = beforeAfterPairs[index];

  return (
    <section id="transformations" className="border-b border-[#1e1e1e] bg-[#111]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">Before &amp; After</span></div>
              <SectionHeading text="The Transformation" className="text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => paginate(-1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center border border-[#333] text-[#888] transition-all hover:border-[#666] hover:text-[#e2e2e2]"><ArrowLeft size={16} strokeWidth={1.5} /></button>
              <span className="min-w-[3rem] text-center font-mono text-[11px] text-[#444]">{String(index + 1).padStart(2, '0')} / {String(beforeAfterPairs.length).padStart(2, '0')}</span>
              <button onClick={() => paginate(1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center border border-[#333] text-[#888] transition-all hover:border-[#666] hover:text-[#e2e2e2]"><ArrowRight size={16} strokeWidth={1.5} /></button>
            </div>
          </div>
        </Reveal>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={index} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit">
              <BeforeAfter before={pair.before} after={pair.after} initialPosition={50} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-xl text-[#e2e2e2]">{pair.title}</p>
            <p className="mt-1 text-sm text-[#444]">{pair.location}</p>
          </div>
          <div className="flex items-center gap-2">
            {beforeAfterPairs.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }} aria-label={`Slide ${i + 1}`} className={cn('h-1 rounded-full transition-all duration-300', i === index ? 'w-6 bg-[#e2e2e2]' : 'w-1.5 bg-[#333] hover:bg-[#555]')} />
            ))}
          </div>
        </div>
        <p className="mt-4 text-label text-[#333]">Drag the handle to reveal</p>
      </div>
    </section>
  );
}
