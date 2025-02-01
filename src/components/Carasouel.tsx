"use client";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  title: string;
  slug: string;
  imageUrl: string;
  isNew: boolean;
}

const specificSlugs = ["7", "4", "22", "15", "20"]; // Specific products to fetch in this exact order

const fetchProducts = async (): Promise<Product[]> => {
  const query = encodeURIComponent(
    `*[_type == "product" && slug.current in ${JSON.stringify(specificSlugs)}] {
      title,
      "slug": slug.current,
      "imageUrl": productImage.asset->url,
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

interface CardProps {
  data?: Product; // Make data optional
  className?: string;
}

const Card: FC<CardProps> = ({ data, className }) => {
  if (!data) {
    return null; // or return a placeholder/loading state
  }

  return (
    <Link href={`/products/${data.slug}`} passHref>
      <div
        className={`relative ${className} group overflow-hidden rounded-lg bg-[#967259] shadow-lg shadow-[#38220f]`}
      >
        {/* Gradient Overlay at the Top */}
        <div className="absolute top-0 left-0 z-20 w-full p-4 bg-gradient-to-b from-[#38220f]/60 to-transparent">
          <h2 className="text-2xl font-medium text-white">{data.title}</h2>
          {data.isNew && (
            <span className="text-sm text-yellow-400">New</span>
          )}
        </div>

        {/* Image */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#967259]/25 to-[#38220f]/40 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
      </div>
    </Link>
  );
};

const Carousel: React.FC = () => {
  const [cardsData, setCardsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();

        // Sort products based on the order in specificSlugs
        const sortedProducts = specificSlugs.map((slug) =>
          products.find((product) => product.slug === slug)
        );

        setCardsData(sortedProducts.filter(Boolean) as Product[]); // Remove undefined values
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a more sophisticated loading spinner
  }

  return (
    <div>
      <section className="bg-[#634832] font-family">
        <div className="py-8 px-4 mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* First Card */}
            <Card data={cardsData[0]} className="h-[400px] animate-fade-in" />

            {/* Middle Column with Nested Grid */}
            <div className="space-y-4">
              {/* Top Card */}
              <Card data={cardsData[1]} className="h-[190px] animate-fade-in" />

              {/* Bottom Grid for 3rd and 4th Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Third Card */}
                <Card data={cardsData[2]} className="h-[190px] animate-fade-in" />

                {/* Fourth Card */}
                <Card data={cardsData[3]} className="h-[190px] animate-fade-in" />
              </div>
            </div>

            {/* Last Card */}
            <Card data={cardsData[4]} className="h-[400px] animate-fade-in" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carousel;