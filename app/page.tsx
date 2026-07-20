import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Books from "@/components/Books";
import Impact from "@/components/Impact";
import Stats from "@/components/Stats";
import Speaking from "@/components/Speaking";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import QuoteSection from "@/components/Quote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";

export default function Home() {
  return (
    <>
      <Particles />
      <Header />
      <main>
        <Hero />
        <About />
        <Books />
        <Impact />
        <Stats />
        <Speaking />
        <Gallery />
        <Testimonials />
        <QuoteSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
