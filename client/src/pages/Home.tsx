import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Services from "../components/home/Services";
import Portfolio from "../components/home/Portfolio";
import Cinematography from "../components/home/Cinematography";
import EditingShowcase from "../components/home/EditingShowcase";
import Testimonials from "../components/home/Testimonials";
import Contact from "../components/home/Contact";
import Footer from "../components/layout/Footer";

const Home = () => {
  useEffect(() => {
    // Ensure the page starts at the top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <Hero />
      <About />

      <Portfolio />
      <Cinematography />
      <EditingShowcase />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
