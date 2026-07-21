'use client';

import { Reveal, Stagger, StaggerItem } from '@/components/reveal';
import { processSteps } from '@/lib/data';

export function Process() {
  return (
    <section
      id="process"
      className="relative scroll-mt-24 border-b border-border/60 bg-background py-24 sm:py-32"
    >
      <div className="container-mw container-px">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                How we work
              </span>
            </div>
            <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A calm, considered process — from brief to keys in hand.
            </h2>
          </Reveal>
        </div>

        {/* Timeline */}
        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border/40 md:grid-cols-5">
          {processSteps.map((step) => (
            <StaggerItem
              key={step.number}
              className="group relative flex flex-col bg-card/60 p-7 transition-colors duration-500 hover:bg-accent/40"
            >
              <div className="font-display text-5xl font-semibold text-border transition-colors duration-500 group-hover:text-primary/70">
                {step.number}
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              <span className="mt-6 h-px w-8 bg-border transition-all duration-500 group-hover:w-12 group-hover:bg-primary" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
