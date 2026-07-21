import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { cn } from '@/lib/utils';
const faqs = [
  { q: 'How long does a typical project take?', a: 'Most residential projects take between four and twelve months from concept sign-off to final installation, depending on scope and custom procurement lead times.' },
  { q: 'Do you work internationally?', a: 'Yes — roughly a third of our projects are outside the United States. We have established supplier relationships and partners in Western Europe, the UK, and select locations in the Middle East.' },
  { q: 'What is your typical fee structure?', a: 'We work on a combination of a flat design fee and a trade discount on procurement. The structure is tailored to each project and agreed upon during the initial consultation.' },
  { q: 'Can you work with an existing renovation contractor?', a: 'Absolutely. We collaborate closely with many contractors and are comfortable stepping into an existing build team.' },
];
export function Contact() {
  const [open, setOpen] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  return (
    <section id="contact" className="border-b border-[#1e1e1e] bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal className="mb-10">
              <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">FAQ</span></div>
              <SectionHeading text="Common Questions" className="text-3xl sm:text-4xl text-[#e2e2e2]" />
            </Reveal>
            <ul className="divide-y divide-[#1e1e1e]">
              {faqs.map((faq, i) => (
                <li key={i}>
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                    <span className={cn('text-sm font-medium transition-colors', open === i ? 'text-[#e2e2e2]' : 'text-[#6b6b6b]')}>{faq.q}</span>
                    <span className={cn('shrink-0 font-mono text-lg text-[#a8a8a8] transition-transform duration-300', open === i ? 'rotate-45' : '')}>+</span>
                  </button>
                  <AnimatePresence>
                    {open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden"><p className="pb-5 text-sm leading-relaxed text-[#444]">{faq.a}</p></motion.div>}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Reveal delay={0.1} className="mb-10">
              <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">Get in touch</span></div>
              <SectionHeading text="Start A Conversation" className="text-3xl sm:text-4xl text-[#e2e2e2]" />
            </Reveal>
            <form onSubmit={(e) => { e.preventDefault(); setForm({ name: '', email: '', message: '' }); }} className="space-y-5">
              {(['name', 'email'] as const).map((field) => (
                <div key={field}>
                  <label className="mb-2 block text-label text-[#444]">{field === 'name' ? 'Your name' : 'Email address'}</label>
                  <input type={field === 'email' ? 'email' : 'text'} required value={form[field]} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} className="w-full rounded-lg border border-[#1e1e1e] bg-[#111] px-4 py-3 text-sm text-[#e2e2e2] outline-none transition-colors placeholder:text-[#333] focus:border-[#444]" placeholder={field === 'name' ? 'Jane Smith' : 'jane@example.com'} />
                </div>
              ))}
              <div>
                <label className="mb-2 block text-label text-[#444]">Message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="w-full resize-none rounded-lg border border-[#1e1e1e] bg-[#111] px-4 py-3 text-sm text-[#e2e2e2] outline-none transition-colors placeholder:text-[#333] focus:border-[#444]" placeholder="Tell us about your project…" />
              </div>
              <button type="submit" className="w-full rounded-lg bg-white py-3.5 text-sm font-medium text-black transition-all hover:bg-white/90">Send message →</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
