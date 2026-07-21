import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/data';
import { SectionHeading } from '@/components/SectionHeading';
import { cn } from '@/lib/utils';

const icons: Record<string, React.ReactNode> = {
  '01': <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="22" height="22" rx="2" /><path d="M3 10h22M10 10v15" /></svg>,
  '02': <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="14" cy="14" r="10" /><path d="M14 8v6l4 2" /></svg>,
  '03': <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22L14 6l10 16" /><path d="M8 16h12" /></svg>,
  '04': <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21L14 5l9 16M5 21h18" /><path d="M9 21V14h10v7" /></svg>,
  '05': <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="8" width="20" height="16" rx="2" /><path d="M4 13h20M9 8V5a5 5 0 0 1 10 0v3" /></svg>,
  '06': <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10l10-6 10 6v10" /><rect x="10" y="14" width="8" height="6" /></svg>,
};

function ServiceCard({ service, index, active, onEnter, onLeave }: {
  service: typeof services[0]; index: number; active: boolean;
  onEnter: () => void; onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.1 + Math.floor(index / 2) * 0.08 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn('group flex flex-col gap-6 p-8 transition-colors duration-300 lg:p-10', active ? 'bg-[#111]' : 'bg-[#0a0a0a]')}
    >
      <div className="flex items-start justify-between">
        <div className={cn('transition-colors duration-300', active ? 'text-[#e2e2e2]' : 'text-[#2a2a2a]')}>{icons[service.id]}</div>
        <span className="font-mono text-xs text-[#2a2a2a] transition-colors duration-300 group-hover:text-[#444]">{service.id}</span>
      </div>
      <div className="flex flex-wrap items-baseline gap-3">
        <h3 className={cn('font-display text-2xl tracking-tight transition-colors duration-300 lg:text-3xl', active ? 'text-[#e2e2e2]' : 'text-[#6b6b6b]')}>{service.title}</h3>
        {service.tag && <span className="rounded-full border border-[#2a2a2a] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-[#555]">{service.tag}</span>}
      </div>
      <p className="flex-1 text-sm leading-[1.75] text-[#444]">{service.description}</p>
      <a href="#contact" className={cn('group/link inline-flex items-center gap-2 self-start text-sm font-medium transition-colors duration-300', active ? 'text-[#e2e2e2]' : 'text-[#2a2a2a]')}>
        Learn more
        <span className={cn('flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300', active ? 'border-[#555] bg-white/5' : 'border-[#1e1e1e]')}>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </span>
      </a>
    </motion.div>
  );
}

export function Services() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section id="services" className="border-b border-[#1e1e1e] bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">What we offer</span></div>
            <SectionHeading text="Our Services" className="text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#444] sm:text-right">Each engagement is shaped around your project — no standard packages, no shortcuts.</p>
        </div>
        <div className="grid grid-cols-1 border border-[#1e1e1e] sm:grid-cols-2">
          {services.map((service, i) => {
            const isLastRow = i >= services.length - 2;
            const isRightCol = i % 2 === 1;
            return (
              <div key={service.id} className={cn('relative', !isRightCol && 'sm:border-r sm:border-[#1e1e1e]', !isLastRow && 'border-b border-[#1e1e1e]')}>
                <ServiceCard service={service} index={i} active={activeIdx === i} onEnter={() => setActiveIdx(i)} onLeave={() => setActiveIdx(null)} />
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-[#1e1e1e] pt-8">
          <p className="text-sm text-[#333]">Not sure which service fits? We'll help you figure it out.</p>
          <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90">Talk to us <span className="transition-transform group-hover:translate-x-0.5">→</span></a>
        </div>
      </div>
    </section>
  );
}
