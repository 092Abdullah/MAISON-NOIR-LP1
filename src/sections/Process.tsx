import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { processSteps } from '@/lib/data';

export function Process() {
  return (
    <section id="process" className="border-b border-[#1e1e1e] bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
        <Reveal className="mb-14">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-white/20" />
            <span className="text-label text-[#555]">How we work</span>
          </div>
          <SectionHeading text="Our Process" className="text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
        </Reveal>

        <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
          {processSteps.map((s) => (
            <StaggerItem key={s.number}>
              <div className="group">
                <p className="mb-4 font-mono text-2xl text-[#2a2a2a] transition-colors group-hover:text-[#a8a8a8]">{s.number}</p>
                <h3 className="mb-3 font-display text-xl text-[#e2e2e2]">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[#444]">{s.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
