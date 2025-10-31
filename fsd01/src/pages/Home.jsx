import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Destinations from "../components/Destinations";
import TourPackages from "../components/TourPackages";
import Features from "../components/Features";
import Packages from "../components/Packages";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Destinations />
      <Features />
      <Footer />
    </>
  );
}
