import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { products, brands } from '@/data/products';

export default function Home() {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/banners/hero.png" 
            alt="Hero Banner" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl space-y-6 animate-fade-up">
            <span className="inline-block px-3 py-1 bg-accent-gold/20 text-accent-gold-light border border-accent-gold/30 rounded-full text-xs font-bold tracking-widest uppercase">
              Nova Coleção 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-[var(--font-heading)] leading-tight">
              Sua coleção merece o <span className="text-gradient-gold">extraordinário.</span>
            </h1>
            <p className="text-lg text-text-secondary md:max-w-xl">
              Descubra miniaturas exclusivas na escala 1:64. Detalhamento absurdo, 
              marcas premium e edições limitadas para os colecionadores mais exigentes.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/miniaturas" 
                className="px-8 py-4 bg-accent-red hover:bg-accent-red-hover text-white font-bold rounded shadow-lg shadow-accent-red/20 transition-all hover:-translate-y-1"
              >
                Explorar Coleções
              </Link>
              <Link 
                href="/lancamentos" 
                className="px-8 py-4 bg-bg-tertiary hover:bg-bg-elevated border border-border text-text-primary font-bold rounded transition-all hover:-translate-y-1"
              >
                Ver Lançamentos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Carousel */}
      <section className="py-12 border-y border-border bg-bg-secondary overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {brands.map((brand) => (
              <div key={brand.id} className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all">
                <span className="text-3xl">{brand.logo}</span>
                <span className="text-xs font-bold tracking-wider text-text-muted">{brand.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold font-[var(--font-heading)] text-text-primary">Lançamentos</h2>
              <p className="text-text-secondary mt-2">As últimas adições à nossa garagem.</p>
            </div>
            <Link href="/lancamentos" className="hidden sm:flex items-center gap-2 text-accent-red hover:text-accent-red-hover font-bold transition-colors">
              Ver todos <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 bg-bg-secondary border-y border-border">
        <div className="container-custom">
          <div className="relative rounded-2xl overflow-hidden bg-bg-primary border border-border">
            <div className="absolute inset-0 bg-[url('/images/products/skyline-r34.png')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/90 to-transparent" />
            
            <div className="relative p-8 md:p-16 max-w-xl">
              <h3 className="text-3xl font-bold font-[var(--font-heading)] text-text-primary mb-4">
                Pré-venda Exclusiva
              </h3>
              <p className="text-text-secondary mb-8">
                Garanta as edições limitadas antes que cheguem ao estoque. 
                Reserve com apenas 20% do valor e pague o restante no envio.
              </p>
              <Link 
                href="/pre-venda" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-bg-primary font-bold rounded hover:bg-gray-200 transition-colors"
              >
                Ver Modelos em Pré-venda
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-[var(--font-heading)] text-text-primary">Destaques da Coleção</h2>
            <p className="text-text-secondary mt-2">Os modelos mais desejados pelos colecionadores.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 relative overflow-hidden border-t border-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-accent-red/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="container-custom relative z-10 text-center max-w-2xl">
          <span className="text-4xl mb-6 block">✉️</span>
          <h2 className="text-3xl font-bold font-[var(--font-heading)] text-text-primary mb-4">
            Entre para o Clube
          </h2>
          <p className="text-text-secondary mb-8">
            Assine nossa newsletter e receba 10% de desconto na primeira compra, 
            além de acesso antecipado a pré-vendas e lançamentos limitados.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              required
              className="flex-1 px-4 py-3 bg-bg-secondary border border-border rounded focus:border-accent-gold outline-none transition-colors"
            />
            <button 
              type="submit"
              className="px-8 py-3 bg-accent-gold hover:bg-accent-gold-dark text-bg-primary font-bold rounded transition-colors whitespace-nowrap"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
