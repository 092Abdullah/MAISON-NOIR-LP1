import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { cn } from '@/lib/utils';

export function SignatureWork() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    current.current.x += (target.current.x - current.current.x) * 0.1;
    current.current.y += (target.current.y - current.current.y) * 0.1;
    setImgPos({ x: current.current.x, y: current.current.y });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const onEnter = (i: number) => {
    setActiveIndex(i);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  };

  const onLeave = () => {
    setActiveIndex(null);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  return (
    <section className="border-b border-[#1e1e1e] bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
        <Reveal className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-white/20" />
            <span className="text-label text-[#555]">Project</span>
          </div>
          <SectionHeading text="Our Signature Work" className="text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
        </Reveal>

        <div ref={containerRef} className="relative" onMouseMove={onMouseMove} onMouseLeave={onLeave}>
          <AnimatePresence>
            {activeIndex !== null && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute z-30 aspect-[4/5] w-48 overflow-hidden rounded-xl shadow-2xl sm:w-56"
                style={{ left: imgPos.x + 20, top: imgPos.y, transform: 'translateY(-50%)' }}
              >
                <img src={projects[activeIndex]?.image} alt="" className="h-full w-full object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
          <ul>
            {projects.slice(0, 4).map((p, i) => (
              <li key={p.id}>
                <a
                  href="#contact"
                  onMouseEnter={() => onEnter(i)}
                  className={cn(
                    'group flex w-full items-center gap-4 border-t border-[#1e1e1e] py-5 transition-colors sm:gap-8',
                    activeIndex === i ? 'bg-[#111]' : 'hover:bg-[#111]/70'
                  )}
                >
                  <span className={cn('w-9 shrink-0 font-mono text-sm transition-colors', activeIndex === i ? 'text-[#a8a8a8]' : 'text-[#333]')}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={cn('min-w-0 flex-1 font-display text-xl tracking-tight transition-colors sm:text-3xl lg:text-4xl', activeIndex === i ? 'text-[#e2e2e2]' : 'text-[#e2e2e2]/50')}>{p.title}</span>
                  <span className="hidden w-36 shrink-0 text-sm text-[#444] sm:block">{p.category}</span>
                  <span className="hidden w-32 shrink-0 text-sm text-[#333] lg:block">{p.location}</span>
                  <span className={cn('ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all', activeIndex === i ? 'border-[#a8a8a8] bg-[#a8a8a8] text-black' : 'border-[#2a2a2a] text-[#444] group-hover:border-[#444]')}>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </li>
            ))}
            <li className="border-t border-[#1e1e1e]" />
          </ul>
          <div className="mt-8 flex justify-end">
            <a href="#work" className="group flex items-center gap-2 text-label text-[#444] transition-colors hover:text-[#e2e2e2]">
              See all projects <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
