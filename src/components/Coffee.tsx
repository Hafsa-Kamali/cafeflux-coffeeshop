import React from 'react';
import Image from 'next/image';

const products = [
  {
    id: 1,
    title: "Dulce de leche Latte",
    price: "$320",
    image: "/assets/Dulce-de-Leche-Latte-15.jpg",
    bgColor: "#967259",
    category: "Latte"
  },
  {
    id: 2,
    title: "Hazelnut Coffee",
    price: "$560",
    image: "/assets/hazelnut latte.jpg",
    bgColor: "#634832",
    category: "Coffee"
  },
  
  {
    id: 3,
    title: "American Espresso",
    price: "$230",
    image: "/assets/espresso.jpg",
    bgColor: "#967259",
    category: "Espresso"
  }
];

export default function Coffee() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative rounded-xl overflow-hidden shadow-xl shadow-[#38220f] transition-all duration-500 ease-linear transform hover:-translate-y-1"
          style={{ backgroundColor: product.bgColor }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10 transition-transform duration-700 ease-in-out group-hover:scale-125">
            <svg className="w-full h-full" viewBox="0 0 375 283" fill="none">
              <rect
                x="159.52"
                y="152"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 159.52 175)"
                fill="white"
                className="transition-all duration-700 ease-in-out group-hover:opacity-75"
              />
              <rect
                y="107.48"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 0 107.48)"
                fill="white"
                className="transition-all duration-700 ease-in-out group-hover:opacity-75"
              />
            </svg>
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />

          {/* Product Image Container */}
          <div className="relative p-6 overflow-hidden">
            <div className="transform transition-all duration-500 ease-in-out group-hover:scale-105">
              <div className="relative w-full aspect-square">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="contain"
                  className="drop-shadow-xl transition-all duration-500 ease-in-out group-hover:drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md transition-all duration-500 ease-in-out group-hover:bg-black/40">
            <div className="p-4 transform transition-all duration-500">
              <span className="inline-block text-white/75 text-sm mb-1 bg-white/10 px-2 py-0.5 rounded-full">
                {product.category}
              </span>
              <div className="flex justify-between items-center">
                <h3 className="text-white font-semibold text-lg group-hover:text-white/90 transition-colors duration-300">
                  {product.title}
                </h3>
                <span className="bg-white text-[#38220f] px-3 py-1 rounded-full font-bold text-sm transform transition-transform duration-500 ease-in-out group-hover:scale-105">
                  {product.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}