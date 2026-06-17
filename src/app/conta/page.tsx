'use client';

import Link from 'next/link';
import { products } from '@/data/products';
import { useAuth } from '@/hooks/useAuth';

export default function ContaPage() {
  const { user, isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="container-custom py-20 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-bg-secondary border border-border rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-bold font-[var(--font-heading)] mb-4">Área de Conta</h1>
          <p className="text-text-secondary mb-6">
            Você precisa entrar para continuar. Faça login para acessar o carrinho, pedidos e a área administrativa.
          </p>
          <Link
            href="/conta/login"
            className="inline-flex px-6 py-3 bg-accent-red text-white font-bold rounded hover:bg-accent-red-hover transition-colors"
          >
            Ir para Login
          </Link>
        </div>
      </div>
    );
  }

  if (user?.role === 'admin') {
    return (
      <div className="container-custom py-12 min-h-[60vh]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-bold font-[var(--font-heading)] mb-2">Painel do Administrador</h1>
            <p className="text-text-secondary">Bem-vindo(a), <strong className="text-text-primary">{user.name}</strong>. Gerencie produtos e atualize o catálogo.</p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-2 bg-bg-tertiary hover:bg-bg-elevated border border-border rounded text-sm transition-colors text-accent-red"
          >
            Sair da Conta
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_2fr] items-start">
          <div className="bg-bg-secondary border border-border rounded-xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-3">Visão Rápida</h2>
              <p className="text-sm text-text-secondary">
                Aqui você encontra os principais recursos para atualizar produtos, estoque e ofertas do site.
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Produtos cadastrados</span>
                <strong className="text-text-primary">{products.length}</strong>
              </div>
              <div className="flex justify-between">
                <span>Pedidos recentes</span>
                <strong className="text-text-primary">12</strong>
              </div>
              <div className="flex justify-between">
                <span>Pedidos aguardando</span>
                <strong className="text-text-primary">3</strong>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full py-3 bg-accent-red text-white rounded font-bold hover:bg-accent-red-hover transition-colors">
                Adicionar Novo Produto
              </button>
              <button className="w-full py-3 bg-bg-tertiary border border-border rounded font-bold hover:bg-bg-elevated transition-colors">
                Atualizar Estoque
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold font-[var(--font-heading)]">Gerenciar Produtos</h2>
                <p className="text-text-secondary text-sm">Use esta interface para revisar e editar os itens do catálogo.</p>
              </div>
              <button className="px-5 py-3 bg-bg-tertiary border border-border rounded font-bold hover:bg-bg-elevated transition-colors">
                Ver relatórios
              </button>
            </div>

            <div className="grid gap-4">
              {products.slice(0, 6).map((product) => (
                <div key={product.id} className="bg-bg-secondary border border-border rounded-xl p-5 flex flex-col gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{product.name}</h3>
                    <p className="text-sm text-text-secondary">{product.brand}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-text-secondary">
                    <span className="px-3 py-1 bg-bg-primary border border-border rounded-full">R$ {product.price.toFixed(2)}</span>
                    <span className="px-3 py-1 bg-bg-primary border border-border rounded-full">{product.inStock ? `${product.stockQuantity} em estoque` : 'Sem estoque'}</span>
                    {product.isPreOrder && <span className="px-3 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full">Pré-venda</span>}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-accent-red text-white rounded font-semibold hover:bg-accent-red-hover transition-colors">
                      Editar
                    </button>
                    <button className="px-4 py-2 bg-bg-tertiary border border-border rounded font-semibold hover:bg-bg-elevated transition-colors">
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12 min-h-[60vh]">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10 pb-6 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold font-[var(--font-heading)] mb-2">Meu Perfil</h1>
          <p className="text-text-secondary">Bem-vindo(a), <strong className="text-text-primary">{user?.name}</strong>!</p>
        </div>
        <button 
          onClick={logout}
          className="px-6 py-2 bg-bg-tertiary hover:bg-bg-elevated border border-border rounded text-sm transition-colors text-accent-red"
        >
          Sair da Conta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">👤</span> Dados Pessoais
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-text-muted">Nome</span>
                <span className="text-text-primary font-medium">{user?.name}</span>
              </div>
              <div>
                <span className="block text-text-muted">E-mail</span>
                <span className="text-text-primary font-medium">{user?.email}</span>
              </div>
              <div>
                <span className="block text-text-muted">Telefone</span>
                <span className="text-text-primary font-medium">(11) 98765-4321</span>
              </div>
              <button className="text-accent-gold hover:text-accent-gold-light mt-2 transition-colors">
                Editar dados
              </button>
            </div>
          </div>

          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">📍</span> Endereço Principal
            </h2>
            <div className="text-sm text-text-secondary space-y-1">
              <p className="font-medium text-text-primary">Casa</p>
              <p>Av. Paulista, 1000 - Apto 42</p>
              <p>Bela Vista - São Paulo, SP</p>
              <p>CEP: 01310-100</p>
              <button className="text-accent-gold hover:text-accent-gold-light mt-3 transition-colors">
                Gerenciar endereços
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-6 font-[var(--font-heading)]">Meus Pedidos</h2>
          
          <div className="space-y-4">
            <div className="bg-bg-secondary border border-border rounded-xl p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <span className="text-text-muted text-sm block">Pedido #1042</span>
                  <span className="font-bold text-text-primary">R$ 149,80</span>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-success/10 text-success border border-success/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    Entregue
                  </span>
                  <p className="text-text-muted text-xs mt-2">Feito em 10 de Junho, 2026</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-bg-primary rounded border border-border overflow-hidden opacity-50 grayscale">
                  <div className="w-full h-full bg-[url('/images/products/skyline-r34.png')] bg-cover bg-center" />
                </div>
                <div className="w-16 h-16 bg-bg-primary rounded border border-border overflow-hidden opacity-50 grayscale">
                  <div className="w-full h-full bg-[url('/images/products/porsche-911.png')] bg-cover bg-center" />
                </div>
                <button className="ml-auto text-sm text-accent-red font-medium hover:underline">
                  Ver Detalhes
                </button>
              </div>
            </div>

            <div className="bg-bg-secondary border border-border rounded-xl p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <span className="text-text-muted text-sm block">Pedido #1055</span>
                  <span className="font-bold text-text-primary">R$ 89,90</span>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    Em Trânsito
                  </span>
                  <p className="text-text-muted text-xs mt-2">Feito em 15 de Junho, 2026</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-bg-primary rounded border border-border overflow-hidden">
                  <div className="w-full h-full bg-[url('/images/products/supra-mk4.png')] bg-cover bg-center" />
                </div>
                <button className="ml-auto text-sm text-accent-red font-medium hover:underline">
                  Rastrear Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
