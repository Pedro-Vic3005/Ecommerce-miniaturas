'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { GarageItem } from '@/types';

interface GarageContextType {
  items: GarageItem[];
  addItem: (productId: string, notes?: string, condition?: GarageItem['condition'], isOpened?: boolean) => void;
  removeItem: (productId: string) => void;
  isInGarage: (productId: string) => boolean;
  totalItems: number;
  updateItem: (productId: string, updates: Partial<GarageItem>) => void;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

const GARAGE_KEY = 'rossano-garage';

export function GarageProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<GarageItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(GARAGE_KEY);
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(GARAGE_KEY, JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = useCallback((
    productId: string,
    notes?: string,
    condition: GarageItem['condition'] = 'mint',
    isOpened = false
  ) => {
    setItems(prev => {
      if (prev.some(i => i.productId === productId)) return prev;
      return [...prev, {
        productId,
        addedAt: new Date().toISOString(),
        notes,
        condition,
        isOpened,
      }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  }, []);

  const isInGarage = useCallback((productId: string) => {
    return items.some(i => i.productId === productId);
  }, [items]);

  const updateItem = useCallback((productId: string, updates: Partial<GarageItem>) => {
    setItems(prev =>
      prev.map(i => i.productId === productId ? { ...i, ...updates } : i)
    );
  }, []);

  return (
    <GarageContext.Provider value={{
      items, addItem, removeItem, isInGarage, totalItems: items.length, updateItem,
    }}>
      {children}
    </GarageContext.Provider>
  );
}

export function useGarage() {
  const context = useContext(GarageContext);
  if (!context) throw new Error('useGarage must be used within GarageProvider');
  return context;
}
