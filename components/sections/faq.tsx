'use client';

import { Reveal, Stagger, StaggerItem } from '@/components/reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/lib/data';

export function Faq() {
  return (
    <section className="relative border-b border-border/60 bg-card/30 py-24 sm:py-32">
      <div className="container-mw container-px">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                Good to know
              </span>
            </div>
            <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Questions, answered.
            </h2>
            <p className="mt-6 max-w-sm text-pretty text-muted-foreground">
              The things we hear most often. If your question isn&apos;t here, the
              contact form is the fastest way to reach the studio.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
            >
              Ask the studio →
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <Stagger className="flex flex-col" stagger={0.08}>
              <Accordion type="single" collapsible className="flex flex-col">
                {faqs.map((faq, i) => (
                  <StaggerItem key={faq.question}>
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-border/60"
                    >
                      <AccordionTrigger className="py-6 text-left font-display text-xl font-medium text-foreground transition-colors hover:text-primary [&[data-state=open]]:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-pretty leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </StaggerItem>
                ))}
              </Accordion>
            </Stagger>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
