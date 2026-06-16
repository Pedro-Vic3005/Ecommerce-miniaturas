'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

export function CartDrawer() {
  const { 
    isCartOpen, setIsCartOpen, items, removeItem, updateQuantity, 
    subtotal, shipping, discount, total, couponCode, applyCoupon, removeCoupon 
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[100] overlay-blur"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-[110] bg-bg-secondary border-l border-border flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-bg-primary/50 backdrop-blur-md">
              <h2 className="text-lg font-bold font-[var(--font-heading)]">Seu Carrinho</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-bg-tertiary"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-text-muted space-y-4">
                  <svg className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <p>Seu carrinho está vazio.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2 bg-accent-red text-white text-sm font-medium rounded hover:bg-accent-red-hover transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 bg-bg-tertiary rounded-lg border border-border">
                    <div className="relative w-20 h-20 bg-bg-primary rounded border border-border overflow-hidden flex-shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-medium text-text-primary line-clamp-2">{item.product.name}</h3>
                          <button onClick={() => removeItem(item.product.id)} className="text-text-muted hover:text-accent-red">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs text-text-muted mt-1">{item.product.brand}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-bg-primary rounded border border-border">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-1 text-text-secondary hover:text-text-primary"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 text-text-secondary hover:text-text-primary"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-bold text-accent-gold">{formatCurrency(item.product.price)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-border bg-bg-primary/50 backdrop-blur-md">
                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  {shipping > 0 ? (
                    <div className="flex justify-between text-text-secondary">
                      <span>Frete (Grátis acima de R$199)</span>
                      <span>{formatCurrency(shipping)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-success">
                      <span>Frete</span>
                      <span>Grátis</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-accent-red">
                      <span>Desconto ({couponCode})</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-text-primary pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="text-accent-gold">{formatCurrency(total)}</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-accent-red text-white font-bold rounded hover:bg-accent-red-hover transition-colors shadow-lg shadow-accent-red/20">
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
