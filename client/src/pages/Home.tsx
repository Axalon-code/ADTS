import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ServiceHighlights from "@/components/sections/ServiceHighlights";
import About from "@/components/sections/About";
import DetailedServices from "@/components/sections/DetailedServices";
import Certifications from "@/components/sections/Certifications";
import CallToAction from "@/components/sections/CallToAction";
import Contact from "@/components/sections/Contact";
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>ADTS - Tailoring Your IT Requirements</title>
        <meta name="description" content="Expert IT consultancy services specializing in Microsoft 365, Azure, and Enterprise Identity Management solutions tailored to your business requirements." />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <ServiceHighlights />
        <About />
        <DetailedServices />
        <Certifications />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
