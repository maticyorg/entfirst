import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Comparison } from "@/components/comparison";
import { Engine } from "@/components/engine";
import { Portfolio } from "@/components/portfolio";
import { Proof } from "@/components/proof";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <Services />
        <Comparison />
        <Engine />
        <Portfolio />
        <Proof />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
