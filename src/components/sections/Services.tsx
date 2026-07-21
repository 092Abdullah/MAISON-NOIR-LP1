import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { services } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
export function Services() {
  return (
    <section id="services" className="border-b border-[#1e1e1e] bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
        <Reveal className="mb-14">
          <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">What we offer</span></div>
          <SectionHeading text="Our Services" className="text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
        </Reveal>
        <Stagger className="grid gap-px bg-[#1e1e1e]" staggerDelay={0.12}>
          {services.map((s) => (
            <StaggerItem key={s.id}>
              <div className="group flex cursor-default items-start gap-6 bg-[#0a0a0a] p-8 transition-colors hover:bg-[#111] sm:p-10">
                <span className="mt-0.5 shrink-0 font-mono text-base text-[#a8a8a8]">{s.number}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-3 font-display text-2xl text-[#e2e2e2] sm:text-3xl">{s.title}</h3>
                  <p className="max-w-xl leading-relaxed text-[#444]">{s.description}</p>
                </div>
                <ArrowRight className="mt-1 hidden h-4 w-4 shrink-0 text-[#a8a8a8] opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
