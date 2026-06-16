import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { formatCurrency, formatInstallments, getDiscountPercent } from '@/lib/utils';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductActions } from '@/components/product/ProductActions';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const discount = product.originalPrice ? getDiscountPercent(product.originalPrice, product.price) : 0;
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  return (
    <div className="container-custom py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
        <Link href="/" className="hover:text-text-primary transition-colors">Início</Link>
        <span>/</span>
        <Link href="/miniaturas" className="hover:text-text-primary transition-colors">Miniaturas</Link>
        <span>/</span>
        <Link href={`/miniaturas?category=${product.category.toLowerCase()}`} className="hover:text-text-primary transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Gallery */}
        <div className="space-y-4">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-bold text-accent-gold uppercase tracking-widest">{product.brand}</span>
              {product.isNew && (
                <span className="px-2 py-0.5 bg-bg-tertiary text-text-primary text-[10px] font-bold uppercase rounded border border-border">
                  Lançamento
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center text-accent-gold">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
                <span className="text-text-secondary ml-2">({product.reviewCount} avaliações)</span>
              </div>
              <span className="text-text-muted">•</span>
              <span className="text-text-secondary">Escala {product.scale}</span>
            </div>
          </div>

          <div className="p-6 bg-bg-secondary border border-border rounded-xl mb-8 relative overflow-hidden">
            {discount > 0 && (
              <div className="absolute top-0 right-0 bg-accent-red text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Economize {discount}%
              </div>
            )}
            <div className="mb-2">
              {product.originalPrice && (
                <span className="text-sm text-text-muted line-through mr-3">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              <span className="text-4xl font-bold text-text-primary">
                {formatCurrency(product.price)}
              </span>
            </div>
            <p className="text-text-secondary mb-4">
              ou em <strong className="text-text-primary">{formatInstallments(product.price, product.installments)}</strong>
            </p>
            
            <div className="flex items-center gap-2 text-sm">
              {product.inStock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-success pulse-badge"></span>
                  <span className="text-success font-medium">Em estoque ({product.stockQuantity} disponíveis)</span>
                </>
              ) : product.isPreOrder ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-warning pulse-badge"></span>
                  <span className="text-warning font-medium">Pré-venda aberta</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-text-muted"></span>
                  <span className="text-text-muted font-medium">Esgotado</span>
                </>
              )}
            </div>
          </div>

          <ProductActions product={product} />

          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-bold mb-4 font-[var(--font-heading)]">Descrição</h3>
            <p className="text-text-secondary leading-relaxed mb-8">
              {product.description}
            </p>

            <h3 className="text-lg font-bold mb-4 font-[var(--font-heading)]">Especificações</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-muted">Fabricante</span>
                <span className="text-text-primary font-medium">{product.manufacturer}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-muted">Cor</span>
                <span className="text-text-primary font-medium">{product.color}</span>
              </div>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between pb-2 border-b border-border">
                  <span className="text-text-muted">{key}</span>
                  <span className="text-text-primary font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
