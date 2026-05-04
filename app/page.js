import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import About from "./components/About/About";
import Photographer from "./components/Photographer/Photographer";
import Services from "./components/Services/Services";
import Work from "./components/Work/Work";
import Testimonials from "./components/Testimonials/Testimonials";
import News from "./components/News/News";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <About />
      <Photographer />
      <Services />
      <Work />
      <Testimonials />
      <News />
      <Footer />
    </>
  );
}
