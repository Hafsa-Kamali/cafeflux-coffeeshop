"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosFlash } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { FaRegHeart, FaTrash, FaArrowLeft, FaCheckCircle, FaMinus, FaPlus } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";

interface Product {
  title: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  slug: {
    current: string;
  };
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();

  // Load cart items when component mounts
  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(storedCart);
    };

    loadCart();
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  const updateCart = (updatedCart: Product[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (slug: string) => {
    const updatedCart = cartItems.filter((item) => item.slug.current !== slug);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const updateQuantity = (slug: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.slug.current === slug ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.discountPrice || item.price) * item.quantity,
    0
  );

  return (
    <div className="bg-[#F7E1BC] min-h-screen">
      {/* Navbar */}
      <div className="w-full z-50  shadow-md">
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
                  <h2 className="text-2xl text-[#38220f] font-semibold">
                    Cafeflux<span className="text-[#967259]">.</span>
                  </h2>
                </div>

                {/* Delivery Time */}
                <div className="hidden md:flex items-center md:space-x-2">
                  <IoIosFlash className="w-6 h-6 text-[#38220f]" />
                  <p className="text-xl text-[#967259]">
                    Order me and get it in{" "}
                    <span className="text-[#38220f] font-semibold">15 minutes</span>
                  </p>
                </div>

                {/* Navbar Icons */}
                <div className="flex items-center space-x-4">
                  {/* Home Icon */}
                  <Link href="/">
                    <AiFillHome className="h-7 w-7 text-[#38220f] hover:scale-110 cursor-pointer" />
                  </Link>
                   
                  {/* Heart Icon */}
                  <FaRegHeart className="h-6 w-6 text-[#38220f] hover:scale-110 cursor-pointer" />

                  {/* Cart Icon with Count */}
                  <Link href="/Cart" className="relative">
                    <GrCart className="h-7 w-7 text-[#38220f] hover:scale-110 cursor-pointer" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>

                    <Image
                                    src="/assets/hafsa.PNG"
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

      {/* Cart Page */}
      <div className="p-6 mx-auto max-w-6xl">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 bg-[#38220f] text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md px-4 py-2 rounded-lg hover:bg-[#ece0d1] hover:text-[#38220f] transition-all duration-300 mb-4"
        >
          <FaArrowLeft /> Back to Shopping
        </button>

        <h1 className="text-3xl font-bold text-[#38220f] mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-lg text-[#967259]">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center bg-[#ece0d1] p-4 rounded-lg shadow-md border border-[#967259]">
                  <Image
                    src={item.imageUrl || "/placeholder.jpg"}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-[#38220f] font-bold text-lg">{item.title}</h3>
                    <p className="text-[#967259] text-md">Price: ${item.discountPrice || item.price}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 md:gap-6 justify-center md:justify-start">
                    <div className="flex items-center border-2 border-[#967259] rounded-lg overflow-hidden shadow-md shadow-[#38220f] text-sm md:text-base">
                      <button 
                       title="update"
                      onClick={() => updateQuantity(item.slug.current, item.quantity - 1)} className="px-2 py-1 md:px-2 md:py-2 text-[#38220f] transition"> <FaMinus /> </button>
                      <span className="px-2 py-1 md:px-3 md:py-2 text-base md:text-lg font-bold bg-transparent text-[#38220f]">{item.quantity}</span>
                      <button 
                      title="update"
                      onClick={() => updateQuantity(item.slug.current, item.quantity + 1)} className="px-2 py-1 md:px-2 md:py-2 text-[#38220f] transition"> <FaPlus /> </button>
                    </div>
                  </div>
                  </div>
                  <button
                   title="remove"
                  onClick={() => removeItem(item.slug.current)} className="p-2 bg-red-600 text-white rounded-full">
                    <FaTrash />
                  </button>
                </div>
            
              ))}
              <button onClick={clearCart} className="bg-red-600 text-white px-4 py-2 rounded-lg">Clear Cart</button>
            </div>

            {/* Order Summary */}
            <div className="bg-[#ece0d1] p-6 rounded-lg shadow-lg border border-[#967259] shadow-[#38220f] ">
  <h2 className="text-2xl font-bold text-[#38220f] mb-4">Order Summary</h2>

  {/* List of Products */}
  <div className="space-y-3 mb-4">
    {cartItems.map((item, index) => (
      <div key={index} className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-[#38220f] font-medium">{item.title}</span>
          <span className="text-[#967259] text-sm">x{item.quantity}</span>
        </div>
        <span className="text-[#38220f] font-medium">
          ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
        </span>
      </div>
    ))}
  </div>

  {/* Subtotal */}
  <div className="flex justify-between border-b border-[#967259] pb-2">
    <span className="text-[#967259]">Subtotal</span>
    <span className="text-[#38220f] font-medium">${totalAmount.toFixed(2)}</span>
  </div>

  {/* Delivery Fees */}
  <div className="flex justify-between border-b border-[#967259] py-2">
    <span className="text-[#967259]">Delivery Fees</span>
    <span className="text-[#38220f] font-medium">$5.00</span> {/* Example delivery fee */}
  </div>

  {/* Total */}
  <div className="flex justify-between pt-2">
    <span className="text-[#967259] font-bold">Total</span>
    <span className="text-[#38220f] font-bold">
      ${(totalAmount + 5).toFixed(2)} {/* Add delivery fee to total */}
    </span>
  </div>

  {/* Checkout Button */}
  <button
    className="w-full bg-[#38220f] text-lg text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md font-semibold hover:bg-[#ece0d1] hover:text-[#38220f] transition-colors duration-300 px-4 py-2 rounded-lg mt-4 flex items-center justify-center gap-2"
  >
    <FaCheckCircle /> Proceed to Checkout
  </button>
</div>
          </div>
        )}
      </div>
    </div>
  );
}
