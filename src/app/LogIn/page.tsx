"use client";
import { useState, FormEvent } from "react";
import { auth, signInWithEmailAndPassword } from "../../app/Firebas/config.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import NavMobile from "../../components/MobileNav";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/SignIn");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden min-h-screen bg-[#F7E1BC]">
      <NavMobile />   
      <Navbar/>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen mt-20 md:mt-0">
        <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden max-w-5xl w-full shadow-[#38220f] ">
          {/* Left Side - Decorative Side */}
          <div className="w-full md:w-1/2 bg-[#634832] relative hidden md:flex flex-col justify-between p-8">
            <div className="relative z-10">
              <h2 className="text-[#DBC1AC] text-3xl font-bold mb-4">Welcome Back</h2>
              <p className="text-[#ECE0D1] text-lg mb-8">Sign in to access your account and continue your shopping journey.</p>
              
              <div className="bg-[#38220F]/20 backdrop-blur-sm p-6 rounded-lg border border-[#DBC1AC]/30">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#967259] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ECE0D1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#DBC1AC] font-medium">Exclusive Deals</h3>
                    <p className="text-[#ECE0D1]/80 text-sm">Access members-only offers</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#967259] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ECE0D1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#DBC1AC] font-medium">Order History</h3>
                    <p className="text-[#ECE0D1]/80 text-sm">Track your purchases</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#967259] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ECE0D1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#DBC1AC] font-medium">Secure Login</h3>
                    <p className="text-[#ECE0D1]/80 text-sm">Your data is protected</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[#967259]/20"></div>
              <div className="absolute top-32 -left-12 w-40 h-40 rounded-full bg-[#DBC1AC]/10"></div>
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-[#38220F]/20"></div>
            </div>
            
            <div className="relative z-10 mt-12">
              <p className="text-[#DBC1AC] text-sm">New to our store?</p>
              <Link href="/Signup" className="inline-block mt-2 px-6 py-2 rounded-lg bg-[#967259] text-white hover:bg-[#38220F] transition-colors duration-300">
                Create an Account
              </Link>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold text-[#38220F]">Sign In</h2>
              <p className="mt-2 text-[#967259]">Enter your credentials to access your account</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-700 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-md font-medium text-[#634832]">Email</label>
                <div className="mt-1 relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#967259]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="w-full py-3 pl-10 pr-4 border border-[#DBC1AC] focus:border-[#967259] focus:ring focus:ring-[#967259]/20 rounded-lg shadow-sm text-[#38220F] placeholder-[#DBC1AC]"
                    placeholder="your-email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-md font-medium text-[#634832]">Password</label>
                <div className="mt-1 relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#967259]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full py-3 pl-10 pr-10 border border-[#DBC1AC] focus:border-[#967259] focus:ring focus:ring-[#967259]/20 rounded-lg shadow-sm text-[#38220F] placeholder-[#DBC1AC]"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#967259] hover:text-[#634832] focus:outline-none"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#967259] focus:ring-[#967259] border-[#DBC1AC] rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[#634832]">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-[#967259] hover:text-[#634832]">
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="w-full py-3 px-4 flex justify-center items-center text-md font-semibold rounded-lg text-white bg-[#634832] hover:bg-[#38220F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#967259] transition-colors duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#DBC1AC]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#967259]">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <Link
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-[#DBC1AC] rounded-lg shadow-sm bg-white text-sm font-medium text-[#634832] hover:bg-[#ECE0D1]/30"
                  >
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                </div>
      
                <div>
                  <Link
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-[#DBC1AC] rounded-lg shadow-sm bg-white text-sm font-medium text-[#634832] hover:bg-[#ECE0D1]/30"
                  >
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <p className="text-[#634832]">
                Don&apos;t have an account? <Link href="/Signup" className="font-medium text-[#967259] hover:text-[#38220F]">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;