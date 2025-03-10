'use client';

import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from 'react';
import { getAuth, User } from 'firebase/auth';
import { app, auth } from '../Firebas/config.js';
import Image from 'next/image';
import createClient from '@sanity/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link.js';

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
}

interface CartItem {
  _id: string;
  title: string;
  price: string;
  quantity: number;
  imageUrl: string;
}

const sanity = createClient({
  projectId: "921k9eyf",
  dataset: "production",
  apiVersion: '2025-01-26',
  useCdn: false,
  token: "skDlTSEsvXbPSPZ4EK8OTvQj2Kubcs0eX0AmBzFIH6vs0T2kGa0JFN8Be9eTi7ZqeIY8lAOHcAa1rZJ9id9NVUBjQILoryoVtvFU3bSawdcaHe8lkrV3xmpIXZZxeDzipOR7ihC4I6C5cjGc1B3s4BHlI3YtDbQR2i573U3xljmiwmgUGX6t",
});

const Checkout = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
  });
  const router = useRouter();

  const [total, setTotal] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const auth = getAuth(app);
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setFormData((prev) => ({
        ...prev,
        email: currentUser.email || '',
      }));
    }
  }, []);

  const calculateTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  }, [cart]);

  useEffect(() => {
    setTotal(calculateTotal());
  }, [cart, calculateTotal]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const order = {
      userId: user?.uid || '',
      name: formData.name,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      phone: formData.phone,
      products: cart.map((item) => ({
        _type: 'reference',
        _ref: item._id,
      })),
      totalPrice: total,
      status: 'Pending',
      orderDate: new Date().toISOString(),
    };

    console.log('Order being placed:', order);

    try {
      const orderResponse = await sanity.create({
        _type: 'order',
        ...order,
      });
      console.log('Order placed successfully:', orderResponse);

      setShowSuccessPopUp(true);
      setFormData({
        name: '',
        email: '',
        address: '',
        city: '',
        phone: '',
      });
      setCart([]);
      localStorage.removeItem('cart');

      setTimeout(() => {
        setShowSuccessPopUp(false);
        router.push('/SignIn');
      }, 3000);
    } catch (error) {
      console.error('Error placing order: ', error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccessPopUp) {
    setTimeout(() => {
      router.push('/SignIn');
    }, 3000);
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setFormData((prev) => ({
          ...prev,
          email: user.email || '',
        }));
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-[#38220F]/70 flex justify-center items-center z-50 font-family">
        <div className="bg-[#F7E1BC] p-8 rounded-lg text-center shadow-lg max-w-md w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-[#634832]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-bold mb-2 text-[#38220F]">Authentication Required</h2>
          <p className="text-xl mb-6 text-[#967259]">Please sign in to continue with your checkout</p>
          <Link href="/SignIn">
            <button className="bg-[#634832] text-[#ECE0D1] py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#38220F] transition-all duration-300 shadow-md">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7E1BC] font-family">
      <nav className="bg-[#634832] shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#ECE0D1]">Cafeflux-Coffeeshop</h1>
            <Link href="/" className="text-[#DBC1AC] hover:text-[#ECE0D1] transition-colors duration-300">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Shop
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {user && (
          <div className="bg-[#DBC1AC] rounded-lg p-4 mb-8 shadow-md shadow-[#38220F]">
            <div className="flex items-center">
              <div className="bg-[#967259] rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ECE0D1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[#38220F] text-sm">Welcome back</p>
                <h2 className="text-xl font-semibold text-[#634832]">{user.email}</h2>
              </div>
            </div>
          </div>
        )}

        {showSuccessPopUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#38220F]/80 z-50">
            <div className="bg-[#ECE0D1] p-8 rounded-lg shadow-xl max-w-md w-full text-center">
              <div className="rounded-full bg-[#967259] w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#ECE0D1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#38220F] mb-2">Order Placed Successfully!</h3>
              <p className="text-lg text-[#634832] mb-4">Your order is being processed and will be ready soon.</p>
              <p className="text-sm text-[#967259]">Redirecting you in a moment...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-[#DBC1AC] rounded-xl shadow-lg overflow-hidden shadow-[#38220F]">
            <div className="p-6 border-b border-[#967259]">
              <h3 className="text-3xl font-bold text-[#38220F]">Billing Details</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold mb-2 text-[#634832]">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#967259]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      title="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 p-3 bg-[#ECE0D1] shadow-[#634832] shadow-md border border-[#967259] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#634832] text-[#38220F]"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-lg font-semibold mb-2 text-[#634832]">Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#967259]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <input
                      title="phone"
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 p-3 bg-[#ECE0D1] border border-[#967259] shadow-[#634832] shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-[#634832] text-[#38220F]"
                      placeholder="+1 (123) 456-7890"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-lg font-semibold mb-2 text-[#634832]">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#967259]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    title="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 bg-[#ECE0D1]/50 border border-[#967259] rounded-lg shadow-[#634832] shadow-md focus:outline-none focus:ring-2 focus:ring-[#634832] text-[#38220F]"
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-lg font-semibold mb-2 text-[#634832]">Delivery Address</label>
                <div className="relative">
                  <span className="absolute top-3 left-0 flex items-start pl-3 text-[#967259]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <textarea
                    title="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 bg-[#ECE0D1] border border-[#967259] shadow-[#634832] shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-[#634832] text-[#38220F]"
                    rows={3}
                    placeholder="Street address, apartment, suite, etc."
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-lg font-semibold mb-2 text-[#634832]">City</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#967259]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </span>
                  <input
                    title="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 bg-[#ECE0D1] border border-[#967259] rounded-lg shadow-[#634832] shadow-md focus:outline-none focus:ring-2 focus:ring-[#634832] text-[#38220F]"
                    placeholder="New York"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full mt-8 p-4 rounded-lg text-xl font-bold bg-[#38220f] text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md hover:bg-[#ece0d1] hover:text-[#38220f] duration-300  transition-colors ${isSubmitting ? 'bg-[#967259] cursor-not-allowed' : 'bg-[#634832] hover:bg-[#38220F]'} transition-all duration-300`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Order...
                  </span>
                ) : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[#DBC1AC] rounded-xl shadow-lg overflow-hidden sticky top-6 shadow-[#38220f]">
              <div className="p-6 border-b border-[#967259]">
                <h3 className="text-2xl font-bold text-[#38220F] flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Order Summary
                </h3>
              </div>
              
              <div className="p-6">
                <div className="divide-y divide-[#967259]">
                  {cart.map((item, index) => (
                    <div key={index} className="py-4 flex gap-4">
                      <div className="relative w-25 h-25 flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="object-cover rounded-lg border-2 border-[#967259] shadow-md shadow-[#38220f]"
                        />
                        <span className="absolute -top-2 -right-2 bg-[#634832] text-[#ECE0D1] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-[#38220F] line-clamp-1">{item.title}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[#634832]">Rs {Number(item.price).toFixed(2)} × {item.quantity}</span>
                          <span className="font-medium text-[#38220F]">Rs {(Number(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t-2 border-[#967259]">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#634832]">Subtotal</span>
                    <span className="font-medium text-[#38220F]">Rs {Number(total).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#634832]">Shipping</span>
                    <span className="font-medium text-[#38220F]">Free</span>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#967259]">
                    <span className="text-xl font-bold text-[#38220F]">Total</span>
                    <span className="text-2xl font-bold text-[#634832]">Rs {Number(total).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 bg-[#ECE0D1] rounded-lg p-4 shadow-[#634832] shadow-md">
                  <div className="flex items-center text-[#634832] mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Payment Information
                  </div>
                  <p className="text-sm text-[#967259]">Cash on delivery is available. We accept payment upon delivery of your order.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;