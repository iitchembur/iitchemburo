import React, { useState } from "react";

export default function TourPackages() {
  const [activeTab, setActiveTab] = useState('adventure');

  const tourCategories = {
    adventure: {
      title: "Adventure Tours",
      icon: "🏔️",
      tours: [
        {
          name: "Amazon Rainforest Expedition",
          duration: "10 days",
          price: "$1,299",
          originalPrice: "$1,599",
          image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "Deep jungle exploration with indigenous guides and wildlife research",
          includes: ["Expert Guide", "All Meals", "Eco Lodge", "Research Activities"],
          highlights: ["Jaguar Tracking", "Canopy Research", "River Expeditions", "Night Safaris"],
          difficulty: "Challenging",
          groupSize: "8-12 people",
          carbonOffset: "300%",
          rating: 4.9
        },
        {
          name: "Patagonia Glacier Trek",
          duration: "8 days",
          price: "$999",
          originalPrice: "$1,299",
          image: "https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "Trek through pristine glacial landscapes while supporting climate research",
          includes: ["Professional Guide", "Camping Gear", "All Meals", "Research Participation"],
          highlights: ["Glacier Walking", "Ice Climbing", "Wildlife Photography", "Climate Studies"],
          difficulty: "Challenging",
          groupSize: "6-10 people",
          carbonOffset: "250%",
          rating: 4.8
        }
      ]
    },
    cultural: {
      title: "Cultural Immersion",
      icon: "🏛️",
      tours: [
        {
          name: "Bhutan Cultural Journey",
          duration: "12 days",
          price: "$1,899",
          originalPrice: "$2,299",
          image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "Experience the Last Shangri-La with sustainable tourism practices",
          includes: ["Cultural Guide", "Traditional Meals", "Monastery Visits", "Local Crafts"],
          highlights: ["Tiger's Nest Monastery", "Traditional Festivals", "Himalayan Views", "Local Families"],
          difficulty: "Moderate",
          groupSize: "4-8 people",
          carbonOffset: "200%",
          rating: 4.9
        },
        {
          name: "Maasai Community Experience",
          duration: "7 days",
          price: "$799",
          originalPrice: "$999",
          image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "Live with Maasai communities and support conservation efforts",
          includes: ["Community Guide", "Traditional Meals", "Cultural Activities"],
          highlights: ["Traditional Ceremonies", "Wildlife Conservation", "Craft Making", "Storytelling"],
          difficulty: "Easy",
          groupSize: "6-12 people",
          carbonOffset: "180%",
          rating: 4.7
        }
      ]
    },
    wildlife: {
      title: "Wildlife Conservation",
      icon: "🦁",
      tours: [
        {
          name: "Borneo Orangutan Conservation",
          duration: "9 days",
          price: "$1,199",
          originalPrice: "$1,499",
          image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "Work directly with orangutan rehabilitation centers",
          includes: ["Conservation Work", "Expert Guides", "Research Activities"],
          highlights: ["Orangutan Care", "Jungle Trekking", "Research Participation", "Local Communities"],
          difficulty: "Moderate",
          groupSize: "8-14 people",
          carbonOffset: "280%",
          rating: 4.8
        },
        {
          name: "Galápagos Marine Conservation",
          duration: "11 days",
          price: "$2,299",
          originalPrice: "$2,799",
          image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "Participate in marine research and conservation efforts",
          includes: ["Marine Research", "Snorkeling Gear", "Expert Naturalists", "All Meals"],
          highlights: ["Marine Research", "Endemic Species", "Underwater Photography", "Conservation Projects"],
          difficulty: "Moderate",
          groupSize: "10-16 people",
          carbonOffset: "320%",
          rating: 4.9
        }
      ]
    }
  };

  return (
    <section id="tours" className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-green-700 mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Curated Experiences
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tour <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Packages</span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immersive experiences designed to create lasting memories while making a positive impact on the destinations you visit.
          </p>
        </div>
        
        {/* Category Tabs */}
       {/* Category Tabs */}
<div className="flex justify-center mb-12">
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg flex space-x-2">
    {Object.entries(tourCategories).map(([key, category]) => (
      <button
        key={key}
        onClick={() => setActiveTab(key)}
        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
          activeTab === key
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
            : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
        }`}
      >
        <span className="text-lg">{category.icon}</span>
        <span>{category.title}</span>
      </button>
    ))}
  </div>
</div>

        
        {/* Tour Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tourCategories[activeTab].tours.map((tour, index) => (
            <div key={index} className="group">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-green-700">
                    {tour.carbonOffset} Carbon Offset
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center">
                    <svg className="w-3 h-3 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {tour.rating}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{tour.name}</h4>
                      <p className="text-gray-600 leading-relaxed">{tour.description}</p>
                    </div>
                  </div>
                  
                  {/* Tour Details */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-semibold text-gray-900">{tour.duration}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Group Size</div>
                      <div className="font-semibold text-gray-900">{tour.groupSize}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Difficulty</div>
                      <div className={`font-semibold ${
                        tour.difficulty === 'Easy' ? 'text-green-600' :
                        tour.difficulty === 'Moderate' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {tour.difficulty}
                      </div>
                    </div>
                  </div>
                  
                  {/* Highlights */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Tour Highlights</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {tour.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Includes */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-3">What's Included</h5>
                    <div className="flex flex-wrap gap-2">
                      {tour.includes.map((item, i) => (
                        <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400 line-through">{tour.originalPrice}</span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {tour.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">per person</p>
                    </div>
                    <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 px-8 py-3 rounded-full hover:bg-white hover:shadow-lg transition-all duration-200 font-semibold">
            View All Tour Packages
          </button>
        </div>
      </div>
    </section>
  );
}