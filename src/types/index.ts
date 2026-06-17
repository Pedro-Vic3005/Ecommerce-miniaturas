export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  manufacturer: string;
  scale: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  color: string;
  category: string;
  inStock: boolean;
  stockQuantity: number;
  isNew: boolean;
  isPreOrder: boolean;
  isPromotion: boolean;
  isFeatured: boolean;
  preOrderDate?: string;
  preOrderLimit?: number;
  preOrderReserved?: number;
  rating: number;
  reviewCount: number;
  installments: number;
  tags: string[];
  specs: Record<string, string>;
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  productCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface GarageItem {
  productId: string;
  addedAt: string;
  notes?: string;
  condition?: 'mint' | 'excellent' | 'good' | 'fair';
  isOpened?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FilterState {
  brand: string[];
  scale: string[];
  color: string[];
  priceRange: [number, number];
  availability: 'all' | 'inStock' | 'preOrder';
  sortBy: 'name' | 'priceAsc' | 'priceDesc' | 'newest' | 'rating';
  search: string;
}
