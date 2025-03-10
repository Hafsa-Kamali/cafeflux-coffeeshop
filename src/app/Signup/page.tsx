'use client';

import { useState, FormEvent } from 'react';
import { auth } from '../Firebas/config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import NavMobile from '../../components/MobileNav';
import Navbar from '../../components/Navbar';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/SignIn");
    } catch (err: unknown) {
      setLoading(false);
      console.log("Signup Error:", err);
      
      if ((err as { code: string }).code === "auth/email-already-in-use") {
        setError("Email already exists! Please use a different email.");
      } else if ((err as { code: string }).code === "auth/invalid-email") {
        setError("Invalid email format. Please enter a valid email.");
      } else if ((err as { code: string }).code === "auth/weak-password") {
        setError("Weak password. Password should be at least 6 characters.");
      } else {
        setError((err as Error).message || "Something went wrong. Please try again.");
      }
    }
  };
  
  return (
    <div className="overflow-x-hidden min-h-screen bg-[#F7E1BC]">
      <Navbar />
      <NavMobile />
      <div className="flex items-center justify-center py-10">
        <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden max-w-5xl w-full shadow-xl shadow-[#38220f]">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 bg-[#ECE0D1]">
            <div className="max-w-md mx-auto">
              <h2 className="text-4xl font-bold text-[#38220F] mb-2">Welcome</h2>
              <p className="text-[#634832] mb-6 text-lg">Create your account to get started</p>
              
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSignup} className="w-full">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-lg font-medium text-[#634832]">Email</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 text-lg border border-[#967259] rounded-lg focus:ring-[#634832] focus:border-[#634832] bg-[#ECE0D1] text-[#38220F] placeholder-[#967259]/70"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-lg font-medium text-[#634832]">Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-3 text-lg border border-[#967259] rounded-lg focus:ring-[#634832] focus:border-[#634832] bg-[#ECE0D1] text-[#38220F] placeholder-[#967259]/70"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 text-xl font-bold bg-[#38220f] text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md hover:bg-[#ece0d1] hover:text-[#38220f] duration-300 rounded-lg  flex items-center justify-center space-x-2 transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing Up...
                    </span>
                  ) : 'Sign Up'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-[#634832] text-lg">
                  Already have an account?{" "}
                  <Link href="/SignIn" className="font-medium text-[#38220F] hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Side - Decorative Side */}
          <div className="hidden md:block md:w-1/2 bg-[#967259] relative">
            <div className="absolute inset-0 bg-[#38220F]/20 z-10"></div>
            <div className="flex flex-col justify-center items-center h-full p-8 relative z-20">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-[#fae0c1] mb-4">Join Our Community</h3>
                <p className="text-[#DBC1AC] text-lg max-w-xs mx-auto">
                  Discover amazing products and connect with like-minded people
                </p>
              </div>
              <div className="relative w-65 h-65 mx-auto">
                <Image 
                  src="/assets/mocha latte.jpg" 
                  alt="Login Hero" 
                  width={400} 
                  height={400} 
                  className="rounded-full object-cover border-4 border-[#DBC1AC] shadow-md shadow-[#38220f] transform transition-all hover:scale-105 duration-300" 
                />
                <div className="absolute -bottom-4 -right-4 bg-[#634832] rounded-full p-3 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#ECE0D1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#38220F] to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;