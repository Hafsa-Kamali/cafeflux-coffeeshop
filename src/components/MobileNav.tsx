"use client"
import React, { useState } from "react";
import Image from "next/image";
import { IoIosFlash, IoIosMenu, IoIosClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";

export default function MobileNavbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="w-full z-50 fixed top-0 bg-[#F7E1BC] shadow-sm block md:hidden">
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
                <h2 className="text-2xl text-[#38220f] font-semibold">Cafeflux<span className="text-[#967259]">.</span></h2>
              </div>

              {/* Hamburger Menu for Mobile */}
              <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-[#38220f] focus:outline-none">
                  {isMobileMenuOpen ? <IoIosClose className="w-8 h-8" /> : <IoIosMenu className="w-8 h-8" />}
                </button>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4 z-50">
                {/* Delivery Time */}
                <div className="flex items-center space-x-2">
                  <IoIosFlash className="w-6 h-6 text-[#38220f]" />
                  <p className="text-xl text-[#967259]">
                    Order me and get it in
                    <span className="text-[#38220f] font-semibold ml-1">15 minutes</span>
                  </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative">
                    <input
                      className="rounded-3xl py-3 px-3 text-xs text-[#38220f] focus:outline-none w-[200px] lg:w-[250px] pr-10 bg-transparent border border-[#dbc1ac]"
                      type="text"
                      placeholder="Search for your favorite coffee"
                      title="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <IoSearchOutline className="w-5 h-5 absolute right-3 top-1/2 text-xl text-[#38220f] transform -translate-y-1/2" />
                  </div>
                </form>

                {/* Icons */}
                <FaRegHeart className="h-6 w-6 text-[#38220f] hover:scale-110 cursor-pointer" />
                <Link href="/Cart" className="relative">
                  <GrCart className="h-6 w-6 text-[#38220f] hover:scale-110 cursor-pointer" />
                </Link>
                <Image
                  src="/assets/hafsa.PNG"
                  alt="avatar"
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full hover:scale-110 shadow-[#38220f] shadow-lg ring-2 ring-[#38220f] ring-offset-2"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4">
                <div className="flex flex-col space-y-4">
                  {/* Delivery Time */}
                  <div className="flex items-center space-x-2">
                    <IoIosFlash className="w-6 h-6 text-[#38220f]" />
                    <p className="text-sm text-[#967259]">
                      Order me and get it in
                      <span className="text-[#38220f] font-semibold ml-1">15 minutes</span>
                    </p>
                  </div>

                  {/* Search Bar */}
                  <form onSubmit={handleSearch} className="flex items-center">
                    <div className="relative w-full">
                      <input
                        className="rounded-3xl py-3 px-3 text-xs text-[#38220f] focus:outline-none w-full pr-10 bg-transparent border border-[#dbc1ac]"
                        type="text"
                        placeholder="Search for your favorite coffee"
                        title="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <IoSearchOutline className="w-5 h-5 absolute right-3 top-1/2 text-xl text-[#38220f] transform -translate-y-1/2" />
                    </div>
                  </form>

                  {/* Icons */}
                  <div className="flex items-center justify-around">
                    <FaRegHeart className="h-6 w-6 text-[#38220f] hover:scale-110 cursor-pointer" />
                    <Link href="/Cart" className="relative">
                      <GrCart className="h-6 w-6 text-[#38220f] hover:scale-110 cursor-pointer" />
                    </Link>
                    <Image
                      src="/assets/hafsa.PNG"
                      alt="avatar"
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full hover:scale-110 shadow-[#38220f] shadow-lg ring-2 ring-[#38220f] ring-offset-2"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}