"use client";

import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaTag, FaTags, FaShoppingCart, FaPlus, FaEye, FaHeart, FaMinus,FaHome } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface Product {
  title: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  description: string;
  category: string;
  tags: string[];
  isNew: boolean;
  slug: {
    current: string;
  };
  quantity?: number; // Add this for cart functionality
}
const fetchProduct = async (slug: string): Promise<Product> => {
  const query = encodeURIComponent(
    `*[_type == "product" && slug.current == "${slug}"][0] {
      title,
      "imageUrl": productImage.asset->url,
      price,
      discountPrice,
      category,
      tags,
      isNew,
      description,
      slug
    }`
  );

  const response = await fetch(`https://921k9eyf.api.sanity.io/v2025-01-26/data/query/production?query=${query}`, {
    cache: "no-store",
  });
  const { result } = await response.json();
  return result;
};

const fetchRelatedProducts = async (category: string, currentSlug: string): Promise<Product[]> => {
  const query = encodeURIComponent(
    `*[_type == "product" && category == "${category}" && slug.current != "${currentSlug}"][0...4] {
      title,
      "imageUrl": productImage.asset->url,
      price,
      discountPrice,
      category,
      tags,
      isNew,
      slug
    }`
  );

  const response = await fetch(`https://921k9eyf.api.sanity.io/v2025-01-26/data/query/production?query=${query}`, {
    cache: "no-store",
  });
  const { result } = await response.json();
  return result;
};

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();

  const handleProductClick = () => {
    // Using the slug.current from the Sanity data
    if (product.slug?.current) {
      router.push(`/products/${product.slug.current}`);
    }
  };
  const handleAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    // Handle cart/wishlist actions here
    console.log(`${action} clicked for ${product.title}`);
  };

  return (
    <div className="group bg-[#ece0d1] border-[#967259] border-2 rounded-xl shadow-[#38220f] shadow-lg hover:shadow-[#38220f] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
    {/* Image Container */}
    <div className="relative overflow-hidden">
      <Image
        src={product.imageUrl || "/placeholder.jpg"}
        alt={product.title}
        width={200}
        height={200}
        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      
      {/* Quick Action Buttons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
        <button
          onClick={(e) => handleAction(e, 'cart')}
          className="p-2 bg-[#38220f] text-[#ece0d1] rounded-full hover:bg-[#634832] shadow-md hover:scale-110 transition-all"
          title="Add to Cart"
        >
          <FaShoppingCart className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => handleAction(e, 'wishlist')}
          className="p-2 bg-[#38220f] text-[#ece0d1] rounded-full hover:bg-[#634832] shadow-md hover:scale-110 transition-all"
          title="Add to Wishlist"
        >
          <FaHeart className="w-4 h-4" />
        </button>
      </div>

      {/* New Badge */}
      {product.isNew && (
        <span className="absolute top-4 left-4 text-sm border-[#967259] border-2 shadow-[#ece0d1] text-white bg-[#634832] px-3 py-1 rounded-full shadow-md">
          New
        </span>
      )}
    </div>

    {/* Content Section */}
    <div className="p-4">
      {/* Category with Icon */}
      <div className="flex items-center gap-2 text-sm text-[#967259] mb-2">
        <FaTag className="w-3 h-3" />
        <span>{product.category}</span>
      </div>

      {/* Title */}
      <h3 className="text-[#38220f] font-bold text-xl mb-2 line-clamp-1">
        {product.title}
      </h3>

      {/* Price */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#967259] line-through text-sm">
          ${product.price}
        </span>
        {product.discountPrice && (
          <span className="text-[#38220f] font-semibold text-lg">
            ${product.discountPrice}
          </span>
        )}
      </div>
      {/*Tags*/}
      <div className="flex flex-wrap gap-1.5 mb-4 mt-3">
  {product.tags.map((tag, index) => (
    <span
      key={index}
      className="text-sm font-medium text-[#38220f] border border-[#967259] px-2 py-0.5 rounded-full bg-[#ece0d1] shadow-md"
    >
      {tag}
    </span>
  ))}
</div>


      {/* View Details Button */}
      <button
        onClick={handleProductClick}
        className="w-full bg-[#38220f] text-[#ece0d1] py-2 rounded-lg flex items-center justify-center gap-2  border-[#967259] border-2 shadow-[#38220f] shadow-md hover:text-[#38220f] hover:bg-[#ece0d1] hover:border-[#38220f] transition-colors duration-300 group"
      >
        <FaEye className="w-4 h-4 group-hover:animate-pulse" />
        View Details
      </button>
    </div>
  </div>
);
};
const ProductDetail: FC = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loadProductData = async () => {
      if (params?.slug) {
        setLoading(true);
        const productData = await fetchProduct(params.slug as string);
        setProduct(productData);
        
        if (productData?.category) {
          const related = await fetchRelatedProducts(productData.category, params.slug as string);
          setRelatedProducts(related);
        }
        
        setLoading(false);
      }
    };

    loadProductData();
  }, [params?.slug]);

  const handleAddToCart = () => {
    if (!product) return;

    try {
      // Get existing cart items
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Check if product already exists in cart
      const existingItemIndex = existingCart.findIndex(
        (item: Product) => item.slug.current === product.slug.current
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        existingCart[existingItemIndex].quantity = 
          (existingCart[existingItemIndex].quantity || 0) + quantity;
      } else {
        // Add new item with quantity
        existingCart.push({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          discountPrice: product.discountPrice,
          slug: product.slug,
          quantity: quantity
        });
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));

      // Show success popup
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Optionally show an error message to the user
    }
  };

  const router = useRouter();

const handleBackToHome = () => {
  router.push("/");
};
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <div className="text-center text-2xl py-10">Loading...</div>;

  return (
    <main className="bg-[#F7E1BC] min-h-screen">
      <div className="z-50">
      <Navbar /></div>
      <div className="p-6 mx-auto bg-[#ece0d1] rounded-lg shadow-lg">
      <button
  onClick={handleBackToHome}
  className="flex items-center gap-2 bg-[#38220f] text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md px-4 py-2 rounded-lg hover:bg-[#ece0d1] hover:text-[#38220f] transition-all duration-300 mb-4"
>
  <FaHome className="w-5 h-5" />
  Back to Home
</button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl">
          <div>
            <Image
              src={product?.imageUrl || "/placeholder.jpg"}
              alt={product?.title || "Product Image"}
              width={500}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="text-[#38220f] font-family">
            {product?.isNew && <span className="text-sm text-white bg-[#634832] px-3 py-1 rounded-full">New Arrival</span>}
            <h1 className="text-3xl font-bold mb-2 text-[#634832]">{product?.title}</h1>
            <p className="text-[#967259] mb-2 flex items-center gap-2">
              <FaTag /> {product?.category}
            </p>
            <p className="text-gray-700 mb-4">{product?.description}</p>
            <div className="flex items-center gap-4 text-xl font-semibold">
              <span className="text-[#967259] line-through">Price: ${product?.price}</span>
              {product?.discountPrice && (
                <span className="text-[#38220f]">Discount: ${product?.discountPrice}</span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {product?.tags?.map((tag, index) => (
                <span key={index} className="text-sm text-[#634832] bg-[#dbc1ac] border-[#634832] border-2 shadow-[#38220f] shadow-md hover:scale-105 px-3 py-1 rounded-full flex items-center gap-1">
                  <FaTags /> {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:gap-6 justify-center md:justify-start">
              <div className="flex items-center border-2 border-[#967259] rounded-lg overflow-hidden shadow-md shadow-[#38220f] text-sm md:text-base">
                <button title="Decrease Quantity" onClick={decreaseQuantity} className="px-2 py-1 md:px-2 md:py-2 text-[#38220f] transition">
                  <FaMinus />
                </button>
                <span className="px-2 py-1 md:px-3 md:py-2 text-base md:text-lg font-bold bg-transparent text-[#38220f]">{quantity}</span>
                <button title="Increase Quantity" onClick={increaseQuantity} className="px-2 py-1 md:px-2 md:py-2 text-[#38220f] transition">
                  <FaPlus />
                </button>
              </div>

              <button onClick={handleAddToCart} className="bg-[#38220f] text-lg text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md font-semibold hover:bg-[#ece0d1] hover:text-[#38220f] hover:border-[#38220f] hover:border-2 hover:shadow-[#38220f] transition-colors duration-300 hover:scale-105 px-4 py-2 rounded-lg flex items-center gap-2">
                <FaShoppingCart /> Add to Cart
              </button>
<Link href="/Cart">
              <button className="bg-[#634832] text-lg text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] shadow-md font-semibold hover:bg-[#ece0d1] hover:text-[#38220f] hover:border-[#38220f] hover:border-2 hover:shadow-[#38220f] transition-colors duration-300 hover:scale-105 px-4 py-2 rounded-lg flex items-center gap-2">
                <IoBagCheckOutline /> Go To Cart
              </button></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="p-6 mx-auto mt-8">
        <h2 className="text-2xl font-bold text-[#38220f] mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct, index) => (
            <ProductCard key={index} product={relatedProduct} />
          ))}
        </div>
      </div>

      {/* Success Popup */}
      <div className={`fixed top-10 right-10 bg-[#38220f] text-[#ece0d1] border-[#967259] border-2 shadow-[#38220f] px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-4 transition-transform transform ${showPopup ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"} duration-300 ease-out`}>
        <IoBagCheckOutline className="text-3xl text-[#dbc1ac]" />
        <div>
          <p className="font-bold text-lg">Success!</p>
          <p className="text-sm">Item has been added to your cart.</p>
        </div>
        <button onClick={() => setShowPopup(false)} className="ml-auto text-md bg-[#dbc1ac] text-[#38220f] rounded-full px-4 py-2 hover:shadow-[#ece0d1] shadow-md border-[#967259] border-2 hover:text-[#38220f] transition">
          Close
        </button>
      </div>
    </main>
  );
};

export default ProductDetail;