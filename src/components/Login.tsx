import { useState, FormEvent } from 'react';
import { auth, isFirebaseConfigured } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LogIn, Lock, User, ShieldAlert } from 'lucide-react';

interface LoginProps {
  onMockLogin: (user: any) => void;
}

export function Login({ onMockLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError('Por favor, ingresa tu usuario y contraseña.');
      setLoading(false);
      return;
    }

    const emailToUse = email.includes('@') ? email : `${email.trim()}@supersaman.com`;

    try {
      if (isFirebaseConfigured) {
        // Real Firebase Auth
        await signInWithEmailAndPassword(auth, emailToUse, password);
      } else {
        // Mock Auth fallback for instant testing
        const normalizedEmail = emailToUse.toLowerCase();
        if (normalizedEmail === 'admin@saman.com' && password === 'admin123') {
          // Simulate successful authentication delay
          await new Promise((resolve) => setTimeout(resolve, 800));
          onMockLogin({
            uid: 'mock-admin-uid',
            email: 'admin@saman.com',
            displayName: 'Admin Principal',
            photoURL: null,
            role: 'admin',
            username: 'admin'
          });
        } else if (normalizedEmail === 'omarapp@supersaman.com' && password === '14006312Op.') {
          await new Promise((resolve) => setTimeout(resolve, 800));
          onMockLogin({
            uid: 'mock-omar-uid',
            email: 'omarapp@supersaman.com',
            displayName: 'Omar (Admin)',
            photoURL: null,
            role: 'admin',
            username: 'omarapp'
          });
        } else if (normalizedEmail === 'juan@supersaman.com' && password === 'operador123') {
          await new Promise((resolve) => setTimeout(resolve, 800));
          onMockLogin({
            uid: 'mock-juan-uid',
            email: 'juan@supersaman.com',
            displayName: 'Juan Pérez',
            photoURL: null,
            role: 'operador',
            assignedAisles: [1],
            username: 'juan'
          });
        } else if (normalizedEmail === 'maria@supersaman.com' && password === 'supervisor123') {
          await new Promise((resolve) => setTimeout(resolve, 800));
          onMockLogin({
            uid: 'mock-maria-uid',
            email: 'maria@supersaman.com',
            displayName: 'María García',
            photoURL: null,
            role: 'supervisor',
            assignedAisles: [4],
            username: 'maria'
          });
        } else {
          await new Promise((resolve) => setTimeout(resolve, 500));
          throw new Error('Credenciales de demostración incorrectas.');
        }
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/configuration-not-found') {
        const normalizedEmail = emailToUse.toLowerCase();
        if (normalizedEmail === 'omarapp@supersaman.com' && password === '14006312Op.') {
          await new Promise((resolve) => setTimeout(resolve, 600));
          onMockLogin({
            uid: 'mock-omar-uid',
            email: 'omarapp@supersaman.com',
            displayName: 'Omar (Admin - Fallback)',
            photoURL: null,
            role: 'admin',
            username: 'omarapp'
          });
          return;
        } else if (normalizedEmail === 'admin@saman.com' && password === 'admin123') {
          await new Promise((resolve) => setTimeout(resolve, 600));
          onMockLogin({
            uid: 'mock-admin-uid',
            email: 'admin@saman.com',
            displayName: 'Admin Principal (Fallback)',
            photoURL: null,
            role: 'admin',
            username: 'admin'
          });
          return;
        } else if (normalizedEmail === 'juan@supersaman.com' && password === 'operador123') {
          await new Promise((resolve) => setTimeout(resolve, 600));
          onMockLogin({
            uid: 'mock-juan-uid',
            email: 'juan@supersaman.com',
            displayName: 'Juan Pérez',
            photoURL: null,
            role: 'operador',
            assignedAisles: [1],
            username: 'juan'
          });
          return;
        } else if (normalizedEmail === 'maria@supersaman.com' && password === 'supervisor123') {
          await new Promise((resolve) => setTimeout(resolve, 600));
          onMockLogin({
            uid: 'mock-maria-uid',
            email: 'maria@supersaman.com',
            displayName: 'María García',
            photoURL: null,
            role: 'supervisor',
            assignedAisles: [4],
            username: 'maria'
          });
          return;
        }
        setError('El proveedor de Correo/Contraseña está inactivo en tu Firebase Console. Habilítalo en Authentication > Sign-in method.');
      } else {
        setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#DDEBEA] flex items-center justify-center p-4 relative overflow-hidden select-none font-sans">
      {/* Decorative Blur Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-primary/20 blur-3xl animate-pulse duration-[6000ms]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary-container/30 blur-3xl animate-pulse duration-[8000ms]"></div>

      <div className="bg-card-surface/90 border border-outline-variant/30 backdrop-blur-md rounded-[32px] w-full max-w-md p-8 md:p-10 shadow-[0_20px_50px_rgba(40,28,25,0.08)] relative z-10 transition-all">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img src="/logo.svg" alt="Súper Samán" className="w-28 h-28 mb-3 drop-shadow-md mix-blend-multiply" />
          <p className="font-sans text-[14px] text-on-surface-variant mt-1">Ingresa al portal de administración de la sucursal</p>
        </div>

        {/* Demo Mode Notice */}
        {!isFirebaseConfigured && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-800 p-3.5 rounded-2xl flex gap-3 items-start mb-6 text-[13px] leading-relaxed">
            <ShieldAlert size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Modo Demo Activo</span>
              Firebase no está configurado aún. Por favor inicia sesión con las credenciales de administrador locales.
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-error-container text-on-error-container border border-error/10 p-3.5 rounded-2xl mb-6 text-[13.5px] font-medium animate-in fade-in duration-200">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider pl-1">Usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70" size={18} />
              <input
                type="text"
                placeholder="Escribe tu usuario (ej: omarapp)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3.5 pl-11 pr-4 font-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all text-on-surface disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider pl-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3.5 pl-11 pr-4 font-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all text-on-surface disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white rounded-full py-4 font-sans text-[16px] font-semibold shadow-[0_8px_30px_rgba(62,158,87,0.2)] flex items-center justify-center gap-2 hover:scale-[0.99] active:scale-95 transition-transform disabled:opacity-50 mt-2 cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn size={20} />
                <span>Iniciar Sesión</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
