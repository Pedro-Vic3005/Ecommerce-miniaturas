'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  totalItems: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'rossano-cart';
const COUPON_KEY = 'rossano-coupon';
const FREE_SHIPPING_THRESHOLD = 199;

const VALID_COUPONS: Record<string, number> = {
  'PRIMEIRA10': 10,
  'COLECAO15': 15,
  'ROSSANO20': 20,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
    }
    const savedCoupon = localStorage.getItem(COUPON_KEY);
    if (savedCoupon) setCouponCode(savedCoupon);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode('');
    localStorage.removeItem(COUPON_KEY);
  }, []);

  const isInCart = useCallback((productId: string) => {
    return items.some(i => i.product.id === productId);
  }, [items]);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 19.90;
  const discountPercent = VALID_COUPONS[couponCode] || 0;
  const discount = subtotal * (discountPercent / 100);
  const total = subtotal - discount + shipping;
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const applyCoupon = useCallback((code: string) => {
    const upper = code.toUpperCase().trim();
    if (VALID_COUPONS[upper]) {
      setCouponCode(upper);
      localStorage.setItem(COUPON_KEY, upper);
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => {
    setCouponCode('');
    localStorage.removeItem(COUPON_KEY);
  }, []);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart, isInCart,
      totalItems, subtotal, shipping, discount, total,
      couponCode, applyCoupon, removeCoupon,
      isCartOpen, setIsCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
