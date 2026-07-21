import { Logo } from '@/components/Logo';
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0a0a0a] px-5 pb-10 pt-20 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 border-b border-[#1e1e1e] pb-16">
          <p className="font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-tight text-[#1a1a1a] select-none">MAISON NOIR</p>
        </div>
        <div className="flex flex-col items-start justify-between gap-10 border-b border-[#1e1e1e] pb-10 sm:flex-row sm:items-end">
          <div><Logo height={32} color="#e2e2e2" className="mb-3 opacity-80" /><p className="text-sm text-[#444]">Full-service interior design studio</p></div>
          <div className="flex gap-6">{['Instagram','LinkedIn','Pinterest'].map((s) => <a key={s} href="#" className="text-sm text-[#444] transition-colors hover:text-[#e2e2e2]">{s}</a>)}</div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <p className="text-label text-[#333]">© {year} Maison Noir. All rights reserved.</p>
          <p className="text-label text-[#333]">New York · Paris</p>
        </div>
      </div>
    </footer>
  );
}
