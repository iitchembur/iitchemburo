import React from "react";

export default function Navbar() {
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🌱</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            EcoTravel
          </h1>
        </div>
        <nav className="space-x-8 hidden md:flex">
          <a href="#destinations" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium relative group">
            Destinations
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
          {/* <a href="#tours" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium relative group">
            Tour Packages
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
          </a> */}
          <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium relative group">
            Why Choose Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
          {/* <a href="#packages" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
          </a> */}
          <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
        </nav>
        <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Book Now
        </button>
      </div>
    </header>
  );
}
