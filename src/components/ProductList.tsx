"use client";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
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

const specificSlugs = ["18","14", "22"]; // Specific products to fetch

const fetchProducts = async (): Promise<Product[]> => {
  const query = encodeURIComponent(
    `*[_type == "product" && slug.current in ${JSON.stringify(specificSlugs)}] {
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

const Coffee: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <Link key={product.slug} href={`/products/${product.slug}`} passHref>
          <div
            className={`group relative rounded-xl overflow-hidden shadow-xl shadow-[#38220f] transition-all duration-500 ease-linear transform hover:-translate-y-1 cursor-pointer ${index % 2 === 0 ? 'bg-[#634832]' : 'bg-[#967259]'}`}
          >
            {/* Product Image Container */}
            <div className="relative p-6 overflow-hidden">
              <div className="transform transition-all duration-500 ease-in-out group-hover:scale-105">
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="drop-shadow-xl transition-all duration-500 ease-in-out group-hover:drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md transition-all duration-500 ease-in-out group-hover:bg-black/40">
              <div className="p-4 transform transition-all duration-500">
                <span className="inline-block text-white/75 text-sm mb-1 bg-white/10 px-2 py-0.5 rounded-full">
                  {product.category}
                </span>
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-semibold text-lg group-hover:text-white/90 transition-colors duration-300">
                    {product.title}
                  </h3>
                  <span className="bg-white text-[#38220f] px-3 py-1 rounded-full font-bold text-sm transform transition-transform duration-500 ease-in-out group-hover:scale-105">
                    {product.discountPrice ? `$${product.discountPrice}` : `$${product.price}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Coffee;