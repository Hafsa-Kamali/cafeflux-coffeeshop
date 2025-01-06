"use client";
import React from 'react'

type Offer={
  title:string;
  description:string;
}
const SpecialOffers: React.FC =()=>{
  const offers:Offer[]=[
    {
      title:"Happy Hour",
      description:"Get 50% off on all drinks between 5PM to 7PM"
    },
    {
      title:"Family Deal",
      description:"Get 20% off and get a free cup of coffee on orders above $500"
    },
    {
      title:"Weekly Special",
      description:"Get 10% off on all drinks every Monday"
    },
  ];

  const handleOfferClick = (description:string)=>{
    alert(description);
  }

  return (
  <div className="bg-[#F7E1BC]">
      <h1 className="text-3xl font-bold text-center text-[#38220f] mt-10">Special Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {offers.map((offer, index) => (
          <button
          type='button'
            key={index}
            className="bg-[#F7E1BC] p-4 rounded-lg shadow-md shadow-[#38220f] hover:bg-[#F7E1BC] hover:scale-105 transition-all duration-300"
            onClick={() => handleOfferClick(offer.description)}
          >
            <h2 className="text-xl text-[#38220f] font-semibold mb-2">{offer.title}</h2>
            <p className="text-gray-600">{offer.description}</p>
          </button>
        ))}
      </div>
    </div>

  )
}

export default SpecialOffers

