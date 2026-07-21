'use client';

import { ArrowUpRight, Instagram, Linkedin } from 'lucide-react';
import { navLinks } from '@/lib/data';

const services = [
  'Residential Interiors',
  'Commercial Spaces',
  'Spatial Planning',
  'Lighting Design',
  'Color & Material',
  'Outdoor Design',
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background">
      {/* CTA banner */}
      <div className="container-mw container-px py-20 sm:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/60 via-card to-background p-10 sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your space, reimagined.
              </h2>
              <p className="mt-4 max-w-md text-pretty text-muted-foreground">
                Book a no-obligation consultation with the studio. We&apos;ll
                talk through your brief and whether we&apos;re the right fit.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_40px_-8px] hover:shadow-primary/50"
            >
              Start a project
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="border-t border-border/60">
        <div className="container-mw container-px py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-lg font-semibold text-primary">
                  M
                </span>
                <span className="font-display text-xl font-semibold tracking-wide">
                  Maison Noir
                </span>
              </div>
              <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
                A full-service interior design studio crafting refined, livable
                spaces since 2013. New York · Paris.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Nav */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Explore
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Services
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {services.map((s) => (
                  <li key={s}>
                    <a
                      href="#services"
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Studio
              </h3>
              <ul className="mt-5 flex flex-col gap-3 text-sm text-foreground/80">
                <li>40 Lispenard St, New York</li>
                <li>6 Rue de Sévigné, Paris</li>
                <li>
                  <a
                    href="mailto:hello@maisonnoir.studio"
                    className="transition-colors hover:text-primary"
                  >
                    hello@maisonnoir.studio
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+12125550140"
                    className="transition-colors hover:text-primary"
                  >
                    +1 (212) 555-0140
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="container-mw container-px flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Maison Noir Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#top" className="transition-colors hover:text-foreground">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
