'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency, formatInstallments, getDiscountPercent } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { isLoggedIn } = useAuth();

  const isWished = isInWishlist(product.id);
  const discount = product.originalPrice ? getDiscountPercent(product.originalPrice, product.price) : 0;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-bg-secondary rounded-xl border border-border overflow-hidden card-shine"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isPreOrder && (
          <span className="px-2 py-1 bg-warning text-white text-[10px] font-bold uppercase tracking-wider rounded pulse-badge">
            Pré-Venda
          </span>
        )}
        {product.isNew && !product.isPreOrder && (
          <span className="px-2 py-1 bg-accent-gold text-white text-[10px] font-bold uppercase tracking-wider rounded">
            Lançamento
          </span>
        )}
        {discount > 0 && (
          <span className="px-2 py-1 bg-accent-red text-white text-[10px] font-bold uppercase tracking-wider rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={() => toggleItem(product.id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-bg-primary/50 backdrop-blur-md border border-border text-text-secondary hover:text-accent-red transition-colors"
        aria-label="Adicionar aos favoritos"
      >
        <svg 
          className="w-4 h-4 transition-transform group-hover:scale-110" 
          fill={isWished ? 'currentColor' : 'none'} 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </button>

      {/* Image */}
      <Link href={`/produto/${product.slug}`} className="block relative aspect-[4/3] bg-bg-primary overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover mix-blend-lighten transform group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col h-[180px]">
        <div className="mb-2">
          <p className="text-xs font-bold text-accent-gold mb-1">{product.brand}</p>
          <Link href={`/produto/${product.slug}`}>
            <h3 className="text-sm font-medium text-text-primary line-clamp-2 group-hover:text-accent-gold-light transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-text-muted line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-text-primary">
              {formatCurrency(product.price)}
            </span>
            <span className="text-xs text-text-secondary">
              {formatInstallments(product.price, product.installments)}
            </span>
          </div>

          <button
            onClick={() => {
              if (!isLoggedIn) {
                router.push('/conta/login');
                return;
              }
              addItem(product);
            }}
            disabled={!product.inStock && !product.isPreOrder}
            className={`w-full py-2.5 rounded text-sm font-bold transition-all shadow-lg ${
              !product.inStock && !product.isPreOrder
                ? 'bg-bg-elevated text-text-muted cursor-not-allowed shadow-none'
                : 'bg-accent-red text-white hover:bg-accent-red-hover shadow-accent-red/20 hover:shadow-accent-red/40'
            }`}
          >
            {!product.inStock && !product.isPreOrder 
              ? 'Esgotado' 
              : product.isPreOrder 
                ? 'Reservar' 
                : 'Adicionar'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
