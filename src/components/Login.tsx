import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Package, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LoginProps {
  onBackToStore: () => void;
}

export default function Login({ onBackToStore }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/menu');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#FDFAF7] flex flex-col justify-center py-12 px-5 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[#d946ef]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md mx-auto text-center relative z-10">
        <button 
          onClick={onBackToStore}
          className="mx-auto flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-outline-variant/30 mb-6 sm:mb-8 hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-300 group"
          aria-label="Back to store"
        >
          <div className="relative">
            <span className="text-4xl sm:text-5xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 block">🍦</span>
            <span className="absolute -top-1 -right-2 sm:-right-3 text-base sm:text-lg text-red-500 animate-bounce">🍓</span>
          </div>
        </button>
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mb-2 sm:mb-3">
          Admin Portal
        </h2>
        <p className="text-center text-sm text-on-surface-variant max-w-xs mx-auto font-medium px-4">
          Sign in to manage Berry De Lacreme&apos;s storefront and operations.
        </p>
      </div>

      <div className="mt-8 sm:mt-10 w-full max-w-md mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-2xl py-8 px-6 sm:py-10 sm:px-10 shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[2rem] border border-white">
          <form className="space-y-6 sm:space-y-7" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-on-surface mb-2.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-5 py-4 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-sm placeholder-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm font-medium text-on-surface"
                  placeholder="admin@berrydelacreme.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-on-surface mb-2.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-5 py-4 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-sm placeholder-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm font-medium text-on-surface"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 p-4 border border-red-100 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 bg-red-100 p-1.5 rounded-full text-red-600 mt-0.5">
                    <span className="material-symbols-outlined text-sm block">error</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-red-800">Authentication Failed</h3>
                    <p className="text-xs text-red-600 mt-1 font-medium leading-relaxed">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-4 px-4 rounded-2xl text-sm font-bold text-white transition-all duration-200 ${
                  isLoading 
                    ? 'bg-outline opacity-70 cursor-not-allowed shadow-none' 
                    : 'bg-primary hover:brightness-110 active:scale-95 shadow-[0_8px_20px_rgba(82,163,68,0.25)] hover:shadow-[0_12px_24px_rgba(82,163,68,0.35)]'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></span>
                    Authenticating...
                  </span>
                ) : (
                  <>
                    Sign In Securely
                    <Lock className="ml-2 h-4 w-4 opacity-80" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer info */}
        <div className="mt-10 text-center flex items-center justify-center gap-2 text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest">
          <Lock className="w-3 h-3" />
          Secured Portal
        </div>
      </div>
    </div>
  );
}
