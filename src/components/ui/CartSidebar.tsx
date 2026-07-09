'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0A122C] border-l border-white/10 z-[100] transform transition-transform duration-500 ease-out shadow-2xl flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/50 space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 relative group">
                <div className="relative w-20 h-24 bg-white/[0.02] rounded-xl overflow-hidden flex-shrink-0 border border-white/[0.05]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-white font-medium text-sm leading-tight pr-6">{item.name}</h3>
                    {(item.size || item.color) && (
                      <p className="text-white/50 text-xs mt-0.5">
                        {item.color && <span>{item.color}</span>}
                        {item.color && item.size && <span> | </span>}
                        {item.size && <span>Size: {item.size}</span>}
                      </p>
                    )}
                    <p className="text-white/60 text-sm mt-1">₹{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white/10 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(`${item.id}-${item.size || 'default'}-${item.color || 'default'}`, item.quantity - 1)}
                        className="p-1 text-white/70 hover:text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center text-white text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(`${item.id}-${item.size || 'default'}-${item.color || 'default'}`, item.quantity + 1)}
                        className="p-1 text-white/70 hover:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => removeFromCart(`${item.id}-${item.size || 'default'}-${item.color || 'default'}`)}
                  className="absolute top-4 right-4 text-white/30 hover:text-white/90 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0A122C]/90 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white/70 font-medium">Subtotal</span>
              <span className="text-white font-bold text-xl">₹{totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full py-4 rounded-xl bg-white text-[#0A122C] font-bold tracking-wide hover:bg-white/90 transition-colors">
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}
