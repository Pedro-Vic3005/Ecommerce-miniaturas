'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/hooks/useCart';
import { WishlistProvider } from '@/hooks/useWishlist';
import { GarageProvider } from '@/hooks/useGarage';
import { AuthProvider } from '@/hooks/useAuth';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <GarageProvider>
            {children}
          </GarageProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
