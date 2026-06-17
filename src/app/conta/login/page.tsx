'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function ContaLoginPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/conta');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Preencha e-mail e senha para continuar.');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Credenciais inválidas. Tente novamente.');
      return;
    }

    router.push('/conta');
  };

  return (
    <div className="container-custom py-20 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-bg-secondary border border-border rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-[var(--font-heading)] mb-2">Acesse sua Conta</h1>
          <p className="text-text-secondary text-sm">
            Faça login para continuar comprando ou gerenciar produtos como administrador.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-bg-primary border border-border rounded outline-none focus:border-accent-red"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-bg-primary border border-border rounded outline-none focus:border-accent-red"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-accent-red">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-accent-red hover:bg-accent-red-hover text-white font-bold rounded transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-sm text-text-secondary space-y-2">
          <p>Use um e-mail comum para cliente.</p>
          <p>Para entrar como administrador, utilize um e-mail com "admin" ou admin@rossano.com.</p>
        </div>

        <div className="mt-6 text-center text-sm text-text-secondary">
          <Link href="/conta" className="text-accent-gold hover:underline">
            Voltar para a área de conta
          </Link>
        </div>
      </div>
    </div>
  );
}
