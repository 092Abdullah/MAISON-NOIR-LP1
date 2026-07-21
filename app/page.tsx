import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { SignatureWork } from '@/components/sections/signature-work';
import { Work } from '@/components/sections/work';
import { Services } from '@/components/sections/services';
import { BeforeAfter } from '@/components/sections/before-after';
import { Process } from '@/components/sections/process';
import { Studio } from '@/components/sections/studio';
import { Testimonials } from '@/components/sections/testimonials';
import { Faq } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import ClickSpark from '@/components/bits/ClickSpark';

export default function Home() {
  return (
    <ClickSpark sparkColor="#C9A96E" sparkSize={8} sparkRadius={20} sparkCount={8} duration={500}>
      <main className="relative min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Stats />
        <SignatureWork />
        <Work />
        <Services />
        <BeforeAfter />
        <Process />
        <Studio />
        <Testimonials />
        <Faq />
        <Contact />
        <Footer />
      </main>
    </ClickSpark>
  );
}
