import React from "react";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosFlash } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-4">
          <div className="py-3 px-4 rounded-xl border border-[#dbc1ac]">
            <div className="flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/logo.png"
                  alt="logo"
                  width={150}
                  height={150}
                  className="w-12 h-12 rounded-full hover:scale-110 shadow-[#38220f] shadow-md"
                />
                <h2 className="text-2xl text-[#38220f] font-semibold">Cafeflux.</h2>
              </div>

              {/* Delivery Time - Hidden on mobile */}
              <div className="flex items-center md:space-x-2">
                <IoIosFlash className="w-4 h-4 md:w-6 md:h-6 text-[#38220f]" />
                <p className=" text-[10px] md:text-xl text-[#967259]">
                  Order me and get it in
                  <span className="text-[#38220f] font-semibold md:ml-1">15 minutes</span>
                </p>
              </div>

              {/* Right Section with Search, Icons, and Profile */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center">
                  <div className="relative">
                    <input
                      className="rounded-3xl py-3 px-3 text-xs text-[#38220f] focus:outline-none w-[200px] lg:w-[250px] pr-10 bg-transparent border border-[#dbc1ac]"
                      type="text"
                      placeholder="Search for your favorite coffee"
                      title="Search"
                    />
                    <IoSearchOutline className="w-5 h-5 absolute right-3 top-1/2 text-xl text-[#38220f] transform -translate-y-1/2" />
                  </div>
                </div>
                
                <FaRegHeart className="block h-4 w-4 md:w-6 md:h-6 text-[#38220f] hover:scale-110 cursor-pointer" />
                <GrCart className="h-4 w-4 md:w-6 md:h-6 text-[#38220f] hover:scale-110 cursor-pointer" />
                <Image
                  src="/assets/hafsa.png"
                  alt="avatar"
                  width={50}
                  height={50}
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full hover:scale-110 shadow-[#38220f] shadow-lg ring-2 ring-[#38220f] ring-offset-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}