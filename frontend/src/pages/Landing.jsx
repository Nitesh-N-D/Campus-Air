import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";
import EventPreview from "../components/landing/EventPreview";
function Landing() {

  return (
    <div>

      <Navbar />

      <Hero />

      <Features />
      <EventPreview />  
      <HowItWorks />

      <CTA />

      <Footer />

    </div>
  );
}

export default Landing;