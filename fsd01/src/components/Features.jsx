import React from "react";

export default function Features() {
  const features = [
    { 
      title: "Eco-Friendly Stays", 
      desc: "Partnered with sustainable hotels & lodges certified for environmental responsibility.",
      icon: "🏨",
      color: "from-green-500 to-emerald-500"
    },
    { 
      title: "Carbon Offset", 
      desc: "We offset 150% of your travel emissions through verified tree planting programs.",
      icon: "🌳",
      color: "from-emerald-500 to-teal-500"
    },
    { 
      title: "Local Experiences", 
      desc: "Support local communities while enjoying authentic cultural experiences.",
      icon: "🤝",
      color: "from-teal-500 to-cyan-500"
    },
    
  ];

  return (
    <section id="features" className="bg-white py-24 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-700 mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Our Promise
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">EcoTravel?</span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to making travel sustainable, responsible, and unforgettable for conscious explorers worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                
                <h4 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-green-700 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.desc}
                </p>
                
                {/* Hover arrow */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
