'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const projectTypes = [
  'Residential',
  'Commercial',
  'Hospitality',
  'Outdoor',
  'Not sure yet',
];

const budgets = [
  'Under $50k',
  '$50k – $150k',
  '$150k – $500k',
  '$500k+',
  'Let\'s discuss',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      project_type: String(data.get('project_type') || '').trim() || null,
      budget: String(data.get('budget') || '').trim() || null,
      message: String(data.get('message') || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, and a short message.');
      return;
    }

    const { error } = await supabase.from('inquiries').insert(payload);

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong sending your message. Please try again.');
      return;
    }

    setStatus('success');
    form.reset();
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-b border-border/60 bg-background py-24 sm:py-32"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[160px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-accent/30 blur-[160px]" />

      <div className="container-mw container-px relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Left: intro + details */}
          <div>
            <Reveal>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary">
                  Start a project
                </span>
              </div>
              <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Let&apos;s design something that lasts.
              </h2>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
                Tell us a little about your space, your timeline, and how you want
                it to feel. We reply to every inquiry within two business days.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-col gap-px overflow-hidden rounded-2xl border border-border bg-border/40">
                <a
                  href="mailto:hello@maisonnoir.studio"
                  className="group flex items-center gap-4 bg-card/60 p-5 transition-colors hover:bg-accent/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Email
                    </div>
                    <div className="text-foreground group-hover:text-primary">
                      hello@maisonnoir.studio
                    </div>
                  </div>
                </a>
                <a
                  href="tel:+12125550140"
                  className="group flex items-center gap-4 bg-card/60 p-5 transition-colors hover:bg-accent/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Phone
                    </div>
                    <div className="text-foreground group-hover:text-primary">
                      +1 (212) 555-0140
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-4 bg-card/60 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Studio
                    </div>
                    <div className="text-foreground">
                      40 Lispenard St, New York · 6 Rue de Sévigné, Paris
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.15}>
            <div className="relative rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="mt-6 font-display text-3xl font-medium text-foreground">
                      Thank you.
                    </h3>
                    <p className="mt-3 max-w-sm text-pretty text-muted-foreground">
                      Your inquiry is in. A member of the studio will be in touch
                      within two business days.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/40"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" htmlFor="name">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Jane Doe"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Email" htmlFor="email">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="jane@email.com"
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <Field label="Project type" htmlFor="project_type">
                      <select id="project_type" name="project_type" className={inputClass} defaultValue="">
                        <option value="" disabled>
                          Select a project type
                        </option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Budget range" htmlFor="budget">
                      <div className="flex flex-wrap gap-2">
                        {budgets.map((b) => (
                          <BudgetChip key={b} value={b} name="budget" />
                        ))}
                      </div>
                    </Field>

                    <Field label="Tell us about your space" htmlFor="message">
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="A short note about the room, the building, your timeline…"
                        className={cn(inputClass, 'resize-none')}
                      />
                    </Field>

                    {status === 'error' && (
                      <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_-8px] hover:shadow-primary/50 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send inquiry
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  'w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40';

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function BudgetChip({ value, name }: { value: string; name: string }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={name} value={value} className="peer sr-only" />
      <span className="inline-block rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary hover:border-foreground/30">
        {value}
      </span>
    </label>
  );
}
