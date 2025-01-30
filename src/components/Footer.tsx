import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CafefluxFooter = () => {
  return (
    <footer className="bg-gradient-to-b from-[#38220f] to-[#634832] text-[#F7E1BC]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/assets/logo.png" alt="logo" width={200} height={200} className="w-16 h-16 rounded-full" />
              <h3 className="text-3xl font-bold text-[#F7E1BC]">Cafeflux.</h3>
            </div>
            <p className="text-[#F7E1BC]/80 max-w-md leading-relaxed">
              Experience the perfect blend of artisanal coffee, delivered to your doorstep in just 15 minutes. Every cup tells a story of passion and perfection.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold text-[#F7E1BC]">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Menu', href: '/menu' },
                { name: 'Delivery', href: '/delivery' },
                { name: 'Contact', href: '/contact' },
                { name: 'Career', href: '/career' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href}
                     className="hover:text-[#F7E1BC] text-[#F7E1BC]/80 no-underline hover:underline hover:underline-offset-4 transition-colors duration-300 block">
                      {item.name}
                    
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold text-[#F7E1BC]">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:+1234567890" className="flex items-center space-x-4 hover:scale-105 hover:text-[#967259] transition-colors duration-300">
                <Phone size={24} />
                <span>(123) 456-7890</span>
              </a>
              <a href="mailto:info@cafeflux.com" className="flex items-center space-x-4 hover:scale-105 hover:text-[#967259] transition-colors duration-300">
                <Mail size={24} />
                <span>info@cafeflux.com</span>
              </a>
              <div className="flex items-center space-x-4">
                <MapPin size={24} />
                <span>123 Coffee Street, Brew City, BC 12345</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-6">
              <div className="flex space-x-6">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="bg-[#967259] p-3 rounded-full hover:bg-[#F7E1BC] text-[#F7E1BC] hover:text-[#38220f] transition-colors duration-300"
                  >
                    <Icon size={20} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#967259]/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#F7E1BC]/80">
              © {new Date().getFullYear()} Cafeflux. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#"
                 className="text-[#F7E1BC]/80 hover:text-[#F7E1BC] transition-colors duration-300">Privacy Policy</Link>
              <Link href="#"
               className="text-[#F7E1BC]/80 hover:text-[#F7E1BC] transition-colors duration-300">Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CafefluxFooter;
