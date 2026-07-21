import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
export function Studio() {
  return (
    <section id="studio" className="border-b border-[#1e1e1e] bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">The studio</span></div>
            <SectionHeading text="About Us" className="mb-8 text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
            <p className="mb-5 leading-relaxed text-[#444]">Founded in New York in 2013, Maison Noir is a multidisciplinary interior design studio with a reputation for spaces that feel effortlessly composed — because the effort is never visible.</p>
            <p className="leading-relaxed text-[#444]">We work with a small, curated client list at any given time. This lets us bring the same intensity we'd give to a private home to every project, whether it's a penthouse in Manhattan or a hillside retreat on the Amalfi coast.</p>
            <a href="#contact" className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] px-6 py-3 text-sm text-[#6b6b6b] transition-all hover:border-[#a8a8a8] hover:text-[#e2e2e2]">Work with us →</a>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl">
              <img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Studio" className="h-[400px] w-full object-cover sm:h-[500px]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
