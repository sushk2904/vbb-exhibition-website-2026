'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  
  const [selectedColor, setSelectedColor] = useState<{name: string, image: string, hex?: string} | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const { addToCart } = useCart();

  const currentImage = selectedColor ? selectedColor.image : product.image;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: currentImage,
      size: selectedSize || undefined,
      color: selectedColor?.name,
    });
  };

  return (
    <div className="min-h-screen bg-[#0A122C] pt-24 md:pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Back button */}
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 uppercase tracking-widest text-xs font-bold"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Image Viewer */}
          <div className="relative aspect-[4/5] rounded-[2rem] bg-white/[0.02] border border-white/[0.03] flex items-center justify-center p-12">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[2rem]" />
            <div className="relative w-full h-full">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-white/60 font-light">
                {product.subtitle}
              </p>
              <div className="mt-6 text-3xl text-white font-bold">
                ₹{product.price.toFixed(2)}
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                  Select Color: <span className="text-white/60 font-normal normal-case">{selectedColor?.name}</span>
                </h3>
                <div className="flex flex-wrap gap-4">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        selectedColor?.name === color.name 
                          ? 'border-white scale-110' 
                          : 'border-transparent hover:border-white/50'
                      }`}
                      aria-label={color.name}
                    >
                      <span 
                        className="w-10 h-10 rounded-full shadow-inner"
                        style={{ backgroundColor: color.hex || '#fff' }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl border transition-all duration-300 font-medium ${
                        selectedSize === size
                          ? 'bg-white text-[#0A122C] border-white'
                          : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto bg-white text-[#0A122C] px-10 py-5 rounded-xl font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-white/90 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-[1.02] transform duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>

            {/* Details */}
            <div className="mt-16 pt-10 border-t border-white/10 space-y-6">
              <div>
                <h4 className="text-white font-bold mb-2">Premium Materials</h4>
                <p className="text-white/60 leading-relaxed text-sm">
                  Crafted from the highest quality fabrics tailored for comfort and durability. Each piece undergoes rigorous testing to ensure it withstands the demands of daily school life while maintaining its elegant appearance.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
