import Image from 'next/image'
import React from 'react'

export default function Carousel() {
  return (
    <div>
      <section className="bg-[#634832]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
            <div className="col-span-2 h-[400px]">
              <div className="group relative h-full w-full overflow-hidden rounded-lg bg-[#967259] shadow-lg shadow-[#38220f]">
                {/* Title Container */}
                <div className="absolute top-0 left-0 z-20 w-full p-4 bg-gradient-to-b from-[#38220f]/60 to-transparent">
                  <h2 className="text-2xl font-medium text-white">Mocha-Latte-13</h2>
                </div>
                
                {/* Image Container */}
                <div className="absolute inset-0 h-full w-full">
                  <Image 
                    src="/assets/mocha-latte-13.jpg"
                    alt="latte coffee"
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#967259]/25 to-[#38220f]/40 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                
                {/* Link wrapper */}
                <a href="#" className="absolute inset-0">
                  <span className="sr-only">View Mocha Latte 13 details</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}