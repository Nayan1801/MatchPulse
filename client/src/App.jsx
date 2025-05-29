import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import UpcomingMatchesSection from "./components/UpcomingMatches";

const App = () =>{
  return (
    <main className="relatiive min-h-screen w-screen  overflow-x-hidden">
     <Navbar />
     <Hero />
     <About />
     <UpcomingMatchesSection/>    
     <Contact />
     <Footer />
    </main>
  )
}
export default App