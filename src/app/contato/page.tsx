'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ContatoPage() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <div className="container-custom py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold font-[var(--font-heading)] mb-4">Fale com o Colecionador</h1>
        <p className="text-text-secondary text-lg">
          Tem alguma dúvida sobre uma miniatura? Está procurando um modelo específico? 
          Ou apenas quer bater um papo sobre coleção? Entre em contato diretamente com o Rossano.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
        {/* Info Direta */}
        <div className="space-y-10">
          <div className="flex items-start gap-6 bg-bg-secondary p-6 rounded-2xl border border-border">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent-gold flex-shrink-0">
              <Image 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rossano&backgroundColor=b6e3f4" 
                alt="Rossano" 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gradient-gold mb-1">Rossano</h2>
              <p className="text-text-secondary text-sm mb-4">Especialista e Curador</p>
              <p className="text-text-muted text-sm italic">
                "Coleciono miniaturas há mais de 15 anos. Meu objetivo é trazer para o Brasil 
                as peças mais exclusivas e raras do mercado mundial."
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold font-[var(--font-heading)] border-b border-border pb-2">Canais Diretos</h3>
            
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 group p-4 rounded-xl hover:bg-bg-secondary transition-colors border border-transparent hover:border-border"
            >
              <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-text-primary">WhatsApp Exclusivo</p>
                <p className="text-text-secondary text-sm">(11) 99999-9999</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-text-primary">E-mail</p>
                <p className="text-text-secondary text-sm">contato@rossanominiaturas.com.br</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-bg-secondary p-8 rounded-2xl border border-border">
          <h3 className="text-2xl font-bold font-[var(--font-heading)] mb-6">Envie uma mensagem</h3>
          
          {enviado ? (
            <div className="bg-success/10 border border-success/30 rounded-xl p-8 text-center h-[350px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-white mb-4 mx-auto pulse-badge">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-success mb-2">Mensagem Enviada!</h4>
              <p className="text-text-secondary">Obrigado pelo contato. O Rossano responderá em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Seu Nome</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg outline-none focus:border-accent-red transition-colors"
                  placeholder="Como devemos te chamar?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Seu E-mail</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg outline-none focus:border-accent-red transition-colors"
                  placeholder="para responder-mos você"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Assunto</label>
                <select className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg outline-none focus:border-accent-red transition-colors text-text-primary">
                  <option>Dúvida sobre um modelo</option>
                  <option>Procurando uma miniatura específica (Encomenda)</option>
                  <option>Problema com pedido</option>
                  <option>Outros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Mensagem</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg outline-none focus:border-accent-red transition-colors resize-none"
                  placeholder="Escreva sua mensagem aqui..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-accent-red hover:bg-accent-red-hover text-white font-bold rounded-lg transition-colors mt-2"
              >
                Enviar Mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
