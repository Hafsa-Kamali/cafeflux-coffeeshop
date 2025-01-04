import Image from 'next/image'
import React from 'react'

export default function Carousel() {
  return (
    <div>
      <section className="bg-[#634832] font-family">
        <div className="py-8 px-4 mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* First Card */}
            <div className="h-[400px]">
              <div className="group relative h-full w-full overflow-hidden rounded-lg bg-[#967259] shadow-lg shadow-[#38220f]">
                <div className="absolute top-0 left-0 z-20 w-full p-4 bg-gradient-to-b from-[#38220f]/60 to-transparent">
                  <h2 className="text-2xl font-medium text-white">Espresso Mocha</h2>
                </div>
                
                <div className="absolute inset-0 h-full w-full">
                  <Image 
                    src="/assets/coffee biscuit.jpg"
                    alt="latte coffee"
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#967259]/25 to-[#38220f]/40 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                
                <a href="#" className="absolute inset-0">
                  <span className="sr-only">View Espresso Mocha details</span>
                </a>
              </div>
            </div>

            {/* Middle Column with Nested Grid */}
            <div className="space-y-4">
              {/* Top Card */}
              <div className="h-[190px]">
                <div className="group relative h-full w-full overflow-hidden rounded-lg bg-[#967259] shadow-lg shadow-[#38220f]">
                  <div className="absolute top-0 left-0 z-20 w-full p-4 bg-gradient-to-b from-[#38220f]/60 to-transparent">
                    <h2 className="text-2xl font-medium text-white">Cappuccino Latte </h2>
                  </div>
                  
                  <div className="absolute inset-0 h-full w-full">
                    <Image 
                      src="/assets/Cafe Latte.jpg"
                      alt="Heart latte coffee"
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#967259]/25 to-[#38220f]/40 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                  
                  <a href="#" className="absolute inset-0">
                    <span className="sr-only">View Cappuccino Latte details</span>
                  </a>
                </div>
              </div>

              {/* Bottom Grid for 3rd and 4th Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Third Card */}
                <div className="h-[190px]">
                  <div className="group relative h-full w-full overflow-hidden rounded-lg bg-[#967259] shadow-lg shadow-[#38220f]">
                    <div className="absolute top-0 left-0 z-20 w-full p-4 bg-gradient-to-b from-[#38220f]/60 to-transparent">
                      <h2 className="text-xl font-medium text-white">Peanut Latte Coffee</h2>
                    </div>
                    
                    <div className="absolute inset-0 h-full w-full">
                      <Image 
                        src="/assets/peanut latte.jpg"
                        alt="Heart latte coffee"
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#967259]/25 to-[#38220f]/40 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                    
                    <a href="#" className="absolute inset-0">
                      <span className="sr-only">View Peanut Latte Coffee details</span>
                    </a>
                  </div>
                </div>

                {/* Fourth Card */}
                <div className="h-[190px]">
                  <div className="group relative h-full w-full overflow-hidden rounded-lg bg-[#967259] shadow-lg shadow-[#38220f]">
                    <div className="absolute top-0 left-0 z-20 w-full p-4 bg-gradient-to-b from-[#38220f]/60 to-transparent">
                      <h2 className="text-xl font-medium text-white">Flat White Coffee</h2>
                    </div>
                    
                    <div className="absolute inset-0 h-full w-full">
                      <Image 
                        src="/assets/heart coffee.jpeg"
                        alt="Flat white coffee"
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#967259]/25 to-[#38220f]/40 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                    
                    <a href="#" className="absolute inset-0">
                      <span className="sr-only">View Flat White Coffee details</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Card */}
            <div className="h-[400px]">
              <div className="group relative h-full w-full overflow-hidden rounded-lg bg-[#967259] shadow-lg shadow-[#38220f]">
                <div className="absolute top-0 left-0 z-20 w-full p-4 bg-gradient-to-b from-[#38220f]/60 to-transparent">
                  <h2 className="text-2xl font-medium text-white">Mocha-Latte-13</h2>
                </div>
                
                <div className="absolute inset-0 h-full w-full">
                  <Image 
                    src="/assets/mocha-latte-13.jpg"
                    alt="latte coffee"
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#967259]/25 to-[#38220f]/40 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                
                <a href="#" className="absolute inset-0">
                  <span className="sr-only">View Latte Coffee details</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}