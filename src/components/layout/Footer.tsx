'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  institucional: [
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Política de Privacidade', href: '/privacidade' },
    { label: 'Termos de Uso', href: '/termos' },
    { label: 'Política de Troca', href: '/trocas' },
  ],
  ajuda: [
    { label: 'Central de Ajuda', href: '/ajuda' },
    { label: 'Como Comprar', href: '/como-comprar' },
    { label: 'Rastreamento', href: '/rastreamento' },
    { label: 'Fale Conosco', href: '/contato' },
  ],
  categorias: [
    { label: 'Hot Wheels', href: '/miniaturas?brand=hot-wheels' },
    { label: 'Mini GT', href: '/miniaturas?brand=mini-gt' },
    { label: 'Kaido House', href: '/miniaturas?brand=kaido-house' },
    { label: 'Inno64', href: '/miniaturas?brand=inno64' },
    { label: 'Tarmac Works', href: '/miniaturas?brand=tarmac-works' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border mt-auto">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-1 ring-border">
                <Image src="/images/logo.png" alt="Rossano Miniaturas" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-[var(--font-heading)] text-gradient-gold">ROSSANO</h3>
                <p className="text-[10px] tracking-[0.2em] text-text-muted uppercase -mt-1">Miniaturas</p>
              </div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Sua loja premium de miniaturas automotivas colecionáveis na escala 1:64.
              Qualidade, exclusividade e paixão por colecionismo.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { label: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { label: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-bg-tertiary flex items-center justify-center text-text-muted hover:text-accent-gold hover:bg-bg-elevated transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-4">Institucional</h4>
            <ul className="space-y-2.5">
              {footerLinks.institucional.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ajuda */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-4">Ajuda</h4>
            <ul className="space-y-2.5">
              {footerLinks.ajuda.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marcas */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-4">Marcas</h4>
            <ul className="space-y-2.5">
              {footerLinks.categorias.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Security badges */}
        <div className="mt-10 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span>Site Seguro SSL</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span className="text-lg">🛡️</span>
                <span>LGPD</span>
              </div>
            </div>
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} Rossano Miniaturas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
