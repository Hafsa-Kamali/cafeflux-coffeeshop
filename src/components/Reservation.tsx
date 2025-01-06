"use client";
import React, { useState } from 'react';
import { Coffee, Users, Calendar, Clock, Check } from 'lucide-react';
import Image from 'next/image';

const CoffeeReservation = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      className="py-20 bg-cover bg-center"
      style={{ backgroundImage: 'url("assets/banners/reserve.png")' }}
    >
      <div className="w-full max-w-6xl  mx-auto p-20 bg-opacity-90 bg-[#38220f]/10 backdrop-blur-md backdrop-filter backdrop-opacity/10 border border-[#38220f] rounded-lg shadow-lg shadow-[#38220f]">
        <div className="text-center mb-12 transform transition-all hover:scale-105 duration-300">
          <Image src="/assets/logo.png" alt="logo" width={200} height={200} className='w-16 h-16 rounded-full mx-auto'/>
          <h1 className="text-4xl font-bold text-[#38220f] mb-2">Cafeflux<span className="text-[#967259]">.</span></h1>
          <span className="text-[#967259] text-lg font-semibold mb-2">The Coffee Shop</span>
          <h2 className="text-5xl font-bold text-[#38220f] mb-2 mt-3">Reserve Your Table</h2>
          <p className="text-[#634832]">Experience the perfect coffee moment</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="group">
              <div className="relative">
                <input
                  title='text'
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F7E1BC] text-[#38220f] rounded-lg border border-[#967259] focus:border-[#634832] focus:ring-1 focus:ring-[#967259] outline-none  shadow-[#38220f] shadow-md  transition-all duration-300 peer"
                  placeholder=" "
                />
                <label className="absolute left-4 top-1 text-[#967259] transition-all duration-300 -translate-y-7 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-focus:text-[#634832]">
                  Your Name
                </label>
              </div>
            </div>

            {/* Email Input */}
            <div className="group">
              <div className="relative">
                <input
                  title='text'
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F7E1BC] text-[#38220f] rounded-lg border border-[#967259] focus:border-[#634832] focus:ring-1 focus:ring-[#967259]  shadow-[#38220f] shadow-md  outline-none transition-all duration-300 peer"
                  placeholder=" "
                />
                <label className="absolute left-4 top-1 text-[#967259] transition-all duration-300 -translate-y-7 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-focus:text-[#634832]">
                  Email Address
                </label>
              </div>
            </div>

            {/* Date Selection */}
            <div className="relative group">
              <Calendar className="absolute left-4 top-3 text-[#967259] group-hover:text-[#634832] transition-colors duration-300" size={24} />
              <input
                title='text'
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-[#F7E1BC] text-[#38220f] shadow-[#38220f] shadow-md rounded-lg border border-[#967259] focus:border-[#634832] focus:ring-1 focus:ring-[#967259]  outline-none transition-all duration-300"
              />
            </div>

            {/* Time Selection */}
            <div className="relative group">
              <Clock className="absolute left-4 top-3 text-[#967259] group-hover:text-[#634832] transition-colors duration-300" size={24} />
              <input
                title='text'
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-[#F7E1BC] text-[#38220f] rounded-lg border border-[#967259] focus:border-[#634832] focus:ring-1 focus:ring-[#967259]  shadow-[#38220f] shadow-md outline-none transition-all duration-300"
              />
            </div>

            {/* Number of Guests */}
            <div className="relative group md:col-span-2">
              <Users className="absolute left-4 top-3 text-[#967259] group-hover:text-[#634832] transition-colors duration-300" size={24} />
              <select
                title='text'
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-[#F7E1BC] text-[#38220f] rounded-lg border border-[#967259] focus:border-[#634832] focus:ring-1 focus:ring-[#967259]  shadow-[#38220f] shadow-md outline-none transition-all duration-300"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={`w-[80%] mx-auto py-4 px-6 bg-transparent  border-[#38220f] border-2 hover:bg-[#967259] shadow-[#38220f] shadow-lg text-[#38220f] hover:text-white text-xl rounded-lg transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 ${
              isSubmitted ? 'bg-green-600 hover:bg-green-700' : ''
            }`}
          >
            {isSubmitted ? (
              <>
                <Check className="animate-bounce" size={24} />
                <span>Reservation Confirmed!</span>
              </>
            ) : (
              <>
                <Coffee size={24} />
                <span>Reserve Table</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CoffeeReservation;
