import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeartPulse } from "react-icons/fa6";

const ProductCardGrid = () => {
  const productImages = [
    "/assets/single macchiato.jpeg",
    "/assets/reese latte.webp",
    "/assets/spanish coffee.jpg",
    "/assets/starbucks-mocha-lattee.jpg",
    "/assets/caffeine latte.jpg",
    "/assets/tres leches latte.jpg",

  ];

  return (
    <div className="relative text-center p-10 overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 "
        style={{
          backgroundImage: `url('/assets/Cafe Latte.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          filter: "brightness(0.8) blur(4px)",
        }}
      />

      <h2 className="text-4xl md:text-6xl font-bold text-[#38220f] mb-4 z-10 relative drop-shadow-lg">
        Most Requested Coffee
      </h2>
      <h2 className="text-3xl text-white z-10 relative drop-shadow-lg mb-6">
        Order Now....!
      </h2>

      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-20 gap-x-14 mt-10 mb-5 z-10 relative"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="w-80 bg-[#dbc1ac] shadow-lg shadow-[#38220f] rounded-lg duration-500 hover:scale-105 z-10 relative transition-transform ease-out hover:shadow-xl transform hover:-translate-y-3"
          >
            <Link href="#">
              {/* Product Image */}
              <Image
                src={productImages[index]}
                alt={`Product ${index + 1}`}
                width={500}
                height={500}
                className="h-80 w-80 object-cover rounded-t-xl"
              />
              {/* Product Details */}
              <div className="px-4 py-3 w-72">
                <span className="text-white font-semibold mr-3 uppercase text-xs">
                  Category
                </span>
                <p className="text-[#38220f] font-bold text-lg truncate block capitalize">
                  Coffee Name {index + 1}
                </p>

                <div className="flex items-center mt-2">
                  <p className="text-[#38220f] font-semibold text-lg my-3 cursor-auto">
                    $140
                  </p>

                  <del>
                    <p className="text-[#38220f] font-semibold text-lg ml-2 cursor-auto">
                      $200
                    </p>
                  </del>

                  {/* Action Buttons */}
                  <div className="ml-auto flex items-center space-x-2 shadow-lg shadow-[#38220f] bg-[#dbc1ac] rounded-full p-2 transition-transform hover:scale-110">
                    <FaHeartPulse className="w-6 h-6 text-[#38220f] cursor-pointer hover:text-[#967259]" />
                    <FaCartShopping className="w-6 h-6 text-[#38220f] cursor-pointer hover:text-[#967259]" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProductCardGrid;
