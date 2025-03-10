"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "../Firebas/config.js";
import createClient from "@sanity/client";
import Login from "../LogIn/page";
import Link from "next/link";

// Sanity Client Setup
const sanity = createClient({
  projectId: "921k9eyf",
  dataset: "production",
  apiVersion: "2025-01-26",
  useCdn: false,
});

interface Order {
  _id: string;
  name: string;
  email: string;
  totalPrice: number;
  status: string;
  orderDate: string;
  products: { _id: string; title: string }[] | null;
}

const Signin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("orders");

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.email) {
          fetchOrders(currentUser.email);
        }
      } else {
        setUser(null);
        setOrders([]);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    console.log("Orders Data:", orders);
  }, [orders]);
  
  const fetchOrders = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const query = `*[_type == "order" && email == $email]{
        _id, name, email, totalPrice, status, orderDate,
        "products": products[]->{ _id, title }
      }`;
      
      const result = await sanity.fetch(query, { email });
      console.log("Fetched orders with products:", result);
      setOrders(result);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Error fetching orders.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      setUser(null);
      setOrders([]);
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Error logging out, please try again.");
    }
  };

  if (!user) return <Login />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECE0D1] px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-6xl flex flex-col md:flex-row shadow-[#38220F]">
        {/* Left Sidebar - Navigation */}
        <div className="w-full md:w-1/4 bg-[#634832] text-white p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#DBC1AC] flex items-center justify-center">
              <span className="text-[#38220F] text-xl font-bold">{user.email?.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h3 className="font-medium">Welcome back</h3>
              <p className="text-sm text-[#DBC1AC] truncate max-w-[120px]">{user.email}</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                activeTab === "orders" ? "bg-[#967259] text-white" : "text-[#DBC1AC] hover:bg-[#38220F]"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              <span>My Orders</span>
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                activeTab === "profile" ? "bg-[#967259] text-white" : "text-[#DBC1AC] hover:bg-[#38220F]"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>Profile</span>
            </button>
            <button 
              onClick={() => setActiveTab("wishlist")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                activeTab === "wishlist" ? "bg-[#967259] text-white" : "text-[#DBC1AC] hover:bg-[#38220F]"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>Wishlist</span>
            </button>
          </nav>
          
          <div className="mt-auto pt-8">
            <button
              onClick={handleLogout}
              className="w-full  px-4 py-3 hover:bg-[#38220f] text-lg hover:text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md font-semibold bg-[#ece0d1] text-[#38220f] duration-300 rounded-lg  flex items-center justify-center space-x-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm5 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Logout</span>
            </button>
            
            <Link href="/">
              <button className="mt-3 w-full px-4 py-3 bg-[#38220f] text-lg text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md font-semibold hover:bg-[#ece0d1] hover:text-[#38220f] duration-300 rounded-lg  flex items-center justify-center space-x-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span>Shop Now</span>
              </button>
            </Link>
          </div>
        </div>
      
        {/* Main Content Area */}
        <div className="w-full md:w-3/4 p-8">
          {activeTab === "orders" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-[#38220F]">Your Orders</h2>
                <div className="bg-[#ECE0D1] px-4 py-2 rounded-lg text-[#634832]">
                  <span className="font-medium">{orders.length} orders</span>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#967259]"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                  {error}
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-[#ECE0D1] border border-[#DBC1AC] rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-[#DBC1AC] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#634832]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-[#634832] mb-2">No Orders Found</h3>
                  <p className="text-[#967259] mb-6">You haven&apos;t placed any orders yet.</p>
                  <Link href="/">
                    <button className="px-6 py-3 bg-[#38220f] text-lg text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md font-semibold hover:bg-[#ece0d1] hover:text-[#38220f] duration-300 rounded-lg transition-colors">
                      Start Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-[#ECE0D1] overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-[#ECE0D1]">
                        <th className="px-6 py-4 bg-[#ECE0D1] text-[#634832] text-left">Order ID</th>
                        <th className="px-6 py-4 bg-[#ECE0D1] text-[#634832] text-left">Products</th>
                        <th className="px-6 py-4 bg-[#ECE0D1] text-[#634832] text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr 
                          key={order._id} 
                          className={`border-b border-[#ECE0D1] ${index % 2 === 0 ? 'bg-white' : 'bg-[#ECE0D1]/20'}`}
                        >
                          <td className="px-6 py-4 text-[#634832] font-medium">
                            <div>{order._id.substring(0, 8)}...</div>
                            <div className="text-sm text-[#967259] mt-1">
                              {new Date(order.orderDate || Date.now()).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#38220F]">
                            {order.products && order.products.length > 0
                              ? order.products
                                  .filter(product => product !== null && product !== undefined)
                                  .map(product => (product && product.title) ? product.title : "Unknown Product")
                                  .join(", ")
                              : "No products available"}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="font-bold text-[#38220F]">Rs {order.totalPrice}</div>
                            <div className="text-sm text-[#967259] mt-1">
                              {order.status || "Processing"}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl border border-[#ECE0D1] p-8">
              <h2 className="text-3xl font-bold text-[#38220F] mb-6">Your Profile</h2>
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-[#DBC1AC] flex items-center justify-center">
                  <span className="text-[#38220F] text-4xl font-bold">{user.email?.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#634832]">{user.displayName || "User"}</h3>
                  <p className="text-[#967259]">{user.email}</p>
                </div>
              </div>
              <p className="text-[#967259] mb-6">Manage your account settings and preferences here.</p>
              <div className="bg-[#ECE0D1]/50 p-4 rounded-lg text-[#634832]">
                <p>Profile features coming soon!</p>
              </div>
            </div>
          )}
          
          {activeTab === "wishlist" && (
            <div className="bg-white rounded-xl border border-[#ECE0D1] p-8">
              <h2 className="text-3xl font-bold text-[#38220F] mb-6">Your Wishlist</h2>
              <div className="bg-[#ECE0D1] border border-[#DBC1AC] rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-[#DBC1AC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#634832]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#634832] mb-2">Your Wishlist is Empty</h3>
                <p className="text-[#967259] mb-6">Add items to your wishlist while shopping.</p>
                <Link href="/">
                  <button className="px-6 py-3 bg-[#967259] text-white rounded-lg hover:bg-[#634832] transition-colors">
                    Discover Products
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;