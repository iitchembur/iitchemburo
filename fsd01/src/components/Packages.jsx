import React from "react";

export default function Packages() {
  const packages = [
    { 
      plan: "Weekend Escape", 
      price: "$199", 
      originalPrice: "$299",
      features: ["2 Nights Stay", "Eco-Lodge Accommodation", "Guided Nature Tour", "Organic Meals", "Carbon Offset Included"],
      popular: false,
      color: "from-green-500 to-emerald-500"
    },
    { 
      plan: "Adventure Week", 
      price: "$699", 
      originalPrice: "$899",
      features: ["7 Nights Stay", "Multiple Destinations", "All Activities Included", "Local Guide", "Tree Planting Experience"],
      popular: true,
      color: "from-emerald-500 to-teal-500"
    },
    { 
      plan: "Luxury EcoTrip", 
      price: "Custom", 
      originalPrice: null,
      features: ["5-Star Eco Resorts", "Private Guide", "Exclusive Access", "Helicopter Tours", "Conservation Projects"],
      popular: false,
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section id="packages" className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-green-700 mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Choose Your Adventure
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Packages</span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Carefully crafted experiences that combine adventure, sustainability, and unforgettable memories.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {packages.map((pkg, index) => (
            <div key={index} className={`relative group ${pkg.popular ? 'transform scale-105' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className={`bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${pkg.popular ? 'border-green-200' : 'border-gray-100'} relative overflow-hidden`}>
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-6 text-gray-900">{pkg.plan}</h4>
                  
                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-2">
                      {pkg.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">{pkg.originalPrice}</span>
                      )}
                      <span className={`text-4xl font-bold ${pkg.price === 'Custom' ? 'text-gray-900' : 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'}`}>
                        {pkg.price}
                      </span>
                    </div>
                    {pkg.price !== 'Custom' && (
                      <p className="text-gray-500 mt-1">per person</p>
                    )}
                  </div>
                  
                  <ul className="space-y-4 mb-8 text-left">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:-translate-y-1 ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {pkg.price === 'Custom' ? 'Get Quote' : 'Choose Package'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Need a custom package?</p>
          <button className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 px-8 py-3 rounded-full hover:bg-white hover:shadow-lg transition-all duration-200 font-semibold">
            Contact Our Travel Experts
          </button>
        </div>
      </div>
    </section>
  );
}
