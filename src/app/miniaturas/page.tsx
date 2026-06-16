'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { products, brands, categories } from '@/data/products';
import { FilterState } from '@/types';

export default function Catalog() {
  const [filters, setFilters] = useState<FilterState>({
    brand: [],
    scale: [],
    color: [],
    priceRange: [0, 500],
    availability: 'all',
    sortBy: 'newest',
    search: '',
  });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (filters.brand.length > 0 && !filters.brand.includes(p.brand)) return false;
      if (filters.availability === 'inStock' && !p.inStock) return false;
      if (filters.availability === 'preOrder' && !p.isPreOrder) return false;
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'priceAsc': return a.price - b.price;
        case 'priceDesc': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [filters]);

  const toggleBrand = (brandName: string) => {
    setFilters(prev => ({
      ...prev,
      brand: prev.brand.includes(brandName) 
        ? prev.brand.filter(b => b !== brandName)
        : [...prev.brand, brandName]
    }));
  };

  return (
    <div className="container-custom py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-[var(--font-heading)] text-text-primary mb-2">Catálogo de Miniaturas</h1>
        <p className="text-text-secondary">Encontre a próxima peça extraordinária para sua coleção.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          {/* Availability */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-border pb-2">Disponibilidade</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="availability"
                  checked={filters.availability === 'all'}
                  onChange={() => setFilters(prev => ({ ...prev, availability: 'all' }))}
                  className="accent-accent-red cursor-pointer"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">Todos</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="availability"
                  checked={filters.availability === 'inStock'}
                  onChange={() => setFilters(prev => ({ ...prev, availability: 'inStock' }))}
                  className="accent-accent-red cursor-pointer"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">Em Estoque</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="availability"
                  checked={filters.availability === 'preOrder'}
                  onChange={() => setFilters(prev => ({ ...prev, availability: 'preOrder' }))}
                  className="accent-accent-red cursor-pointer"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">Pré-venda</span>
              </label>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-border pb-2">Marcas</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {brands.map(brand => (
                <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={filters.brand.includes(brand.name)}
                    onChange={() => toggleBrand(brand.name)}
                    className="accent-accent-red cursor-pointer rounded-sm"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors flex-1">
                    {brand.name}
                  </span>
                  <span className="text-xs text-text-muted bg-bg-tertiary px-2 py-0.5 rounded-full">
                    {brand.productCount}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-border pb-2">Categorias</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className="px-3 py-1.5 text-xs bg-bg-tertiary hover:bg-bg-elevated text-text-secondary hover:text-text-primary rounded border border-border transition-colors flex items-center gap-1.5"
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 p-4 bg-bg-secondary border border-border rounded-lg">
            <span className="text-sm text-text-secondary">
              Exibindo <strong className="text-text-primary">{filteredProducts.length}</strong> modelos
            </span>
            
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm text-text-secondary">Ordenar por:</label>
              <select 
                id="sort"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="bg-bg-primary border border-border text-text-primary text-sm rounded px-3 py-1.5 outline-none focus:border-accent-red"
              >
                <option value="newest">Lançamentos</option>
                <option value="priceAsc">Menor Preço</option>
                <option value="priceDesc">Maior Preço</option>
                <option value="name">Nome (A-Z)</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-border rounded-xl">
              <span className="text-4xl mb-4 block opacity-50">🏎️</span>
              <h3 className="text-xl font-bold mb-2">Nenhum modelo encontrado</h3>
              <p className="text-text-muted mb-6">Tente ajustar seus filtros para ver mais resultados.</p>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, brand: [], availability: 'all' }))}
                className="px-6 py-2 bg-bg-tertiary hover:bg-bg-elevated border border-border rounded text-sm transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
