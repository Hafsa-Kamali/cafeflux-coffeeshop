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
      <div className="flex items-center justify-center py-10 px-4">
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
                  className="w-full py-3 text-xl font-bold bg-[#38220f] text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md hover:bg-[#ece0d1] hover:text-[#38220f] duration-300 rounded-lg flex items-center justify-center space-x-2 transition-colors"
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

          {/* Right Side - Decorative Side (Now responsive) */}
          <div className="w-full md:w-1/2 bg-[#967259] relative flex flex-col items-center p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-[#fae0c1] mb-4">Join Our Community</h3>
              <p className="text-[#DBC1AC] text-lg max-w-xs mx-auto">
                Discover amazing products and connect with like-minded people
              </p>
            </div>
            <div className="relative w-64 h-64">
              <Image 
                src="/assets/mocha latte.jpg" 
                alt="Signup Hero" 
                width={400} 
                height={400} 
                className="rounded-full object-cover border-4 border-[#DBC1AC] shadow-md transform transition-all hover:scale-105 duration-300" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
