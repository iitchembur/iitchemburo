import React from "react";

export default function Destinations() {
  const destinations = [
    {
      name: "C Rica Rainforest",
      location: "America",
      image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Explore pristine rainforests and support local conservation efforts",
      highlights: ["Wildlife Spotting", "Canopy Tours", "Sustainable Lodges"],
      duration: "7-10 days",
      difficulty: "Moderate",
      carbonOffset: "200%"
    },
    {
      name: "Norwegian Fjords",
      location: "Scandinavia",
      image: "https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Experience breathtaking fjords with zero-emission transportation",
      highlights: ["Electric Boat Tours", "Hiking Trails", "Local Culture"],
      duration: "5-7 days",
      difficulty: "Easy",
      carbonOffset: "150%"
    },
    {
      name: "Himalayan Eco Trek",
      location: "Nepal",
      image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Trek through the Himalayas while supporting local communities",
      highlights: ["Mountain Views", "Cultural Exchange", "Eco Lodges"],
      duration: "12-15 days",
      difficulty: "Challenging",
      carbonOffset: "300%"
    },
    {
      name: "Galápagos Islands",
      location: "Ecuador",
      image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Discover unique wildlife in this UNESCO World Heritage site",
      highlights: ["Endemic Species", "Marine Life", "Conservation Tours"],
      duration: "8-10 days",
      difficulty: "Easy",
      carbonOffset: "250%"
    }
  ];

  return (
    <section id="destinations" className="bg-white py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-700 mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Explore Responsibly
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Destinations</span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover breathtaking locations while contributing to conservation efforts and supporting local communities worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-green-700">
                    {destination.carbonOffset} Offset
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{destination.name}</h4>
                    <span className="text-sm text-gray-500">{destination.location}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {destination.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.map((highlight, i) => (
                        <span key={i} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {destination.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      destination.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      destination.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {destination.difficulty}
                    </span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium text-sm transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                    Explore Destination
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-50 hover:shadow-lg transition-all duration-200 font-semibold">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
}