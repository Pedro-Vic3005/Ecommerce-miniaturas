'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useGarage } from '@/hooks/useGarage';
import { useAuth } from '@/hooks/useAuth';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { addItem, setIsCartOpen } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addItem: addToGarage, isInGarage } = useGarage();

  const isWished = isInWishlist(product.id);
  const inGarage = isInGarage(product.id);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push('/conta/login');
      return;
    }
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      router.push('/conta/login');
      return;
    }
    addItem(product, quantity);
    setIsCartOpen(true);
  };

  const handleAddToGarage = () => {
    if (!inGarage) {
      addToGarage(product.id);
      // Optional: show toast notification here
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity & Add to Cart */}
      <div className="flex gap-4">
        <div className="flex items-center bg-bg-secondary border border-border rounded-lg px-2">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-12 text-text-secondary hover:text-text-primary transition-colors text-lg"
          >
            -
          </button>
          <span className="w-8 text-center font-bold text-text-primary">{quantity}</span>
          <button 
            onClick={() => setQuantity(Math.min(product.stockQuantity || 1, quantity + 1))}
            disabled={!product.inStock && !product.isPreOrder}
            className="w-10 h-12 text-text-secondary hover:text-text-primary transition-colors text-lg disabled:opacity-50"
          >
            +
          </button>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock && !product.isPreOrder}
          className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
            !product.inStock && !product.isPreOrder
              ? 'bg-bg-elevated text-text-muted cursor-not-allowed'
              : 'bg-bg-tertiary border border-border hover:bg-bg-elevated text-text-primary'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Adicionar ao Carrinho
        </button>
      </div>

      {/* Buy Now */}
      <button
        onClick={handleBuyNow}
        disabled={!product.inStock && !product.isPreOrder}
        className={`w-full py-4 rounded-lg font-bold text-lg shadow-xl transition-all ${
          !product.inStock && !product.isPreOrder
            ? 'bg-bg-elevated text-text-muted cursor-not-allowed shadow-none'
            : 'bg-accent-red text-white hover:bg-accent-red-hover shadow-accent-red/20 hover:-translate-y-1'
        }`}
      >
        {product.isPreOrder ? 'Reservar na Pré-Venda' : 'Comprar Agora'}
      </button>

      {/* Secondary Actions */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={() => toggleItem(product.id)}
          className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 border transition-colors ${
            isWished 
              ? 'bg-accent-red/10 border-accent-red text-accent-red' 
              : 'bg-transparent border-border text-text-secondary hover:text-text-primary'
          }`}
        >
          <svg className="w-5 h-5" fill={isWished ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          Lista de Desejos
        </button>

        <button
          onClick={handleAddToGarage}
          disabled={inGarage}
          className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 border transition-colors ${
            inGarage 
              ? 'bg-success/10 border-success text-success cursor-not-allowed' 
              : 'bg-transparent border-border text-text-secondary hover:text-text-primary hover:border-accent-gold hover:text-accent-gold'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 00-.879-2.121l-3.371-3.371A3 3 0 0014.25 7.5H3.375c-.621 0-1.125.504-1.125 1.125v8.25c0 .621.504 1.125 1.125 1.125h.75" />
          </svg>
          {inGarage ? 'Já na Garagem' : '+ Minha Garagem'}
        </button>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center gap-6 pt-6 border-t border-border mt-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-xl">🛡️</span>
          <span className="text-[10px] text-text-muted uppercase">Compra Segura</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-xl">📦</span>
          <span className="text-[10px] text-text-muted uppercase">Embalagem Premium</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-xl">🏆</span>
          <span className="text-[10px] text-text-muted uppercase">100% Original</span>
        </div>
      </div>
    </div>
  );
}
