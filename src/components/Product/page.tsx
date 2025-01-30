"use client";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Link from "next/link";

interface Product {
  title: string;
  slug: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  category: string;
  tags: string[];
  isNew: boolean;
}

const fetchProducts = async (): Promise<Product[]> => {
  const query = encodeURIComponent(
    `*[_type == "product"] {
      title,
      "slug": slug.current,
      "imageUrl": productImage.asset->url,
      price,
      discountPrice,
      category,
      tags,
      isNew
    }`
  );

  const response = await fetch(
    `https://921k9eyf.api.sanity.io/v2025-01-26/data/query/production?query=${query}`,
    { cache: "no-store" }
  );
  const { result } = await response.json();
  return result;
};

const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    fetchData();
  }, []);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative min-h-screen p-10 flex flex-col items-center font-family">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/assets/Cafe Latte.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          filter: "brightness(0.8) blur(4px)",
        }}
      />

      <div className="relative z-10 max-w-7xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#38220f] mb-4 drop-shadow-lg">
          Most Requested Coffee
        </h1>
        <h2 className="text-3xl text-white mb-6 drop-shadow-lg">Order Now....!</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProducts.map((product: Product) => (
            <div
              key={product.slug}
              className="bg-[#dbc1ac] border-[#967259] border-4 rounded-lg shadow-xl shadow-[#38220f] overflow-hidden transform transition-transform duration-300 hover:scale-105 group relative"
            >
              <div className="relative w-full h-66">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={400}
                  height={450}
                  className="rounded-lg mt-4 mx-auto object-cover w-[80%] h-[300px] transition-transform duration-300 group-hover:scale-105"
                />
                
                {product.isNew && (
                  <div className="absolute top-4 left-4 border-[#967259] border-2 bg-[#ece0d1] text-[#38220f] px-3 py-1 shadow-md shadow-[#967259] rounded-full text-md font-semibold">
                    New
                  </div>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button title="Add to Wishlist" className="bg-[#ece0d1] text-[#38220f] p-2 rounded-full hover:bg-[#967259] hover:text-[] border-[#967259] border-2 hover:border-[#ece0d1] hover:border-2 shadow-[#967259] shadow-md hover:shadow-[#dbc1ac] transition-colors duration-300 hover:scale-110">
                    <FaHeart className="w-5 h-5" />
                  </button>
                  <button title="Add to Cart" className="bg-[#ece0d1] text-[#38220f] p-2 rounded-full hover:bg-[#967259] hover:text-[] border-[#967259] border-2 hover:border-[#ece0d1] hover:border-2 shadow-[#967259] shadow-md hover:shadow-[#dbc1ac] transition-colors duration-300 hover:scale-110">
                    <FaShoppingCart className="w-5 h-5" />
                  </button>
                </div>
                
              </div>
              <div className="p-6">
              <p className="text-[#ece0d1] shadow-[#38220f] shadow-md absolute left-10 top-64 text-xl font-semibold mb-3 bg-[#967259] border-[#38220f] border-2 px-4 py-2 rounded-xl inline-block">
                  {product.category}
                </p>
                <h2 className="text-3xl font-bold text-[#38220f] mb-2 mt-2">
                  {product.title}
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-4 mt-3">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-lg font-medium text-[#38220f] border border-[#967259] px-2 py-1 rounded-full bg-[#ece0d1] shadow-[#38220f] shadow-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  {product.discountPrice && (
                    <p className="text-[#967259] text-xl font-semibold line-through">
                      ${product.price}
                    </p>
                  )}
                  <p className="text-[#38220f] font-bold text-xl">
                    ${product.discountPrice || product.price}
                  </p>
                </div>
                <Link href={`/products/${product.slug}`} className="inline-block bg-[#38220f] text-xl text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md px-6 py-2 rounded-full font-semibold hover:bg-[#ece0d1] hover:text-[#38220f] hover:border-[#38220f] hover:border-2 hover:shadow-[#38220f] transition-colors duration-300 hover:scale-105">
                  View Details
                </Link>
              </div>
              
          
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${currentPage === index + 1 ? 'bg-[#38220f] text-[#ece0d1] border-[#967259] border-2 shadow-[#dbc1ac] shadow-md' : 'bg-[#dbc1ac] text-[#38220f] border-[#38220f] border-2 shadow-[#ece0d1] shadow-md hover:bg-[#967259]'}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
