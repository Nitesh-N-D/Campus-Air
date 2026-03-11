import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";
import EventShowcase from "../components/landing/EventShowcase"
import Stats from "../components/landing/Stats"
function Landing() {

  return (
    <div>

      <Navbar />
     
      <Hero />
      <Stats />
      <Features />
      <EventShowcase /> 
      <HowItWorks />

      <CTA />

      <Footer />

    </div>
  );
}

export default Landing;