import { useState, FormEvent } from 'react';
import { auth, isFirebaseConfigured, getFriendlyErrorMessage } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LogIn, Lock, User, ShieldAlert, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onMockLogin: (user: any) => void;
}

export function Login({ onMockLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        setError(getFriendlyErrorMessage(err, 'El proveedor de Correo/Contraseña está inactivo en tu Firebase Console. Habilítalo en Authentication > Sign-in method.'));
      } else {
        setError(getFriendlyErrorMessage(err, 'Error al iniciar sesión. Verifica tus credenciales.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-primary-container flex flex-col font-sans">
      {/* Marca */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-[max(2rem,env(safe-area-inset-top))] pb-8 min-h-[34dvh]">
        <div className="bg-card-surface rounded-[28px] p-3 shadow-[0_8px_24px_rgba(40,28,25,0.25)]">
          <img src="/logo.svg" alt="Súper Samán" className="w-24 h-24 mix-blend-multiply" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-on-primary-container text-center">Súper Samán</h1>
        <p className="mt-1 text-sm text-on-primary-container/80 text-center">Gestión de pasillos, sugeridos y compras</p>
      </div>

      {/* Formulario */}
      <div className="bg-card-surface rounded-t-[32px] w-full md:max-w-md md:mx-auto md:mb-10 md:rounded-[32px] px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(40,28,25,0.18)]">
        <h2 className="text-xl font-bold text-on-surface mb-5">Iniciar sesión</h2>

        {!isFirebaseConfigured && (
          <div className="bg-tertiary-container/50 text-on-tertiary-fixed-variant p-3.5 rounded-2xl flex gap-3 items-start mb-5 text-sm leading-relaxed">
            <ShieldAlert size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Modo demo</span>
              Firebase no está configurado. Usa las credenciales locales.
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-user" className="text-sm font-semibold text-on-surface">Usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" size={20} />
              <input
                id="login-user"
                type="text"
                inputMode="email"
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Ej: omarapp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full min-h-14 bg-white border border-outline rounded-2xl pl-12 pr-4 font-sans text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors text-on-surface placeholder:text-on-surface-variant/60 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-pass" className="text-sm font-semibold text-on-surface">Contraseña</label>
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${error ? 'text-error' : 'text-on-surface-variant'}`} size={20} />
              <input
                id="login-pass"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                aria-invalid={!!error}
                aria-describedby={error ? 'login-error' : undefined}
                className={`w-full min-h-14 bg-white border rounded-2xl pl-12 pr-14 font-sans text-base focus:outline-none focus:ring-2 transition-colors text-on-surface placeholder:text-on-surface-variant/60 disabled:opacity-60 ${
                  error ? 'border-error focus:ring-error/30' : 'border-outline focus:border-primary focus:ring-primary/30'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center text-on-surface-variant rounded-full cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && (
              <p id="login-error" role="alert" className="text-sm text-error font-semibold">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-14 bg-primary-container text-on-primary rounded-2xl font-sans text-base font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-60 mt-2 cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Entrando…</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Entrar</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
