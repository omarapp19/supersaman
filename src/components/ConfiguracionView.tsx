import { useState } from 'react';
import { Shield, Bell, Cpu, Sparkles, Check, RefreshCw, Database, Trash2 } from 'lucide-react';
import { bootstrapFirestore, clearAllFirestoreData } from '../firebase';

export function ConfiguracionView() {
  const [pushAlerts, setPushAlerts] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [dbActionLoading, setDbActionLoading] = useState(false);
  const [dbMessage, setDbMessage] = useState<string | null>(null);

  const triggerSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1500);
  };

  const handleClearDatabase = async () => {
    if (!confirm('¿Estás seguro de que deseas vaciar toda la base de datos de Firestore? Se eliminarán todos los pasillos, productos y sugeridos.')) {
      return;
    }
    setDbActionLoading(true);
    setDbMessage(null);
    try {
      await clearAllFirestoreData();
      setDbMessage('Base de datos vaciada con éxito.');
    } catch (error) {
      setDbMessage('Error al vaciar la base de datos: ' + (error as Error).message);
    } finally {
      setDbActionLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    setDbActionLoading(true);
    setDbMessage(null);
    try {
      await bootstrapFirestore(true);
      setDbMessage('Datos de ejemplo cargados con éxito.');
    } catch (error) {
      setDbMessage('Error al cargar datos de ejemplo: ' + (error as Error).message);
    } finally {
      setDbActionLoading(false);
    }
  };

  return (
    <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight">Configuración</h2>
        <p className="font-sans text-[16px] md:text-[18px] text-on-surface-variant mt-2">Personaliza las alertas, el copiloto Saman AI y los parámetros de reabastecimiento.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - main settings */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* AI Settings */}
          <div className="bg-card-surface rounded-3xl p-6 shadow-[0_4px_20px_rgba(40,28,25,0.05)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 text-primary p-2.5 rounded-2xl">
                <Cpu size={22} />
              </div>
              <div>
                <h3 className="font-sans text-[18px] font-bold text-on-surface">Copiloto Saman AI</h3>
                <p className="font-sans text-[13px] text-on-surface-variant">Ajustes del motor inteligente de análisis de góndolas.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-outline-variant/20">
                <div>
                  <span className="font-sans text-[15px] font-semibold text-on-surface block">Alertas Push de Stock Crítico</span>
                  <span className="font-mono text-[12px] text-on-surface-variant">Notificar inmediatamente a los administradores al detectar quiebre.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={pushAlerts} 
                    onChange={() => setPushAlerts(!pushAlerts)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-outline-variant/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-outline-variant/20">
                <div>
                  <span className="font-sans text-[15px] font-semibold text-on-surface block">Sincronización Offline en Segundo Plano</span>
                  <span className="font-mono text-[12px] text-on-surface-variant">Guardar datos locales y subirlos cuando vuelva la red.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={offlineSync} 
                    onChange={() => setOfflineSync(!offlineSync)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-outline-variant/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Firestore Database Management */}
          <div className="bg-card-surface rounded-3xl p-6 shadow-[0_4px_20px_rgba(40,28,25,0.05)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#ba1a1a]/10 text-[#ba1a1a] p-2.5 rounded-2xl">
                <Database size={22} />
              </div>
              <div>
                <h3 className="font-sans text-[18px] font-bold text-on-surface">Gestión de Datos (Firestore)</h3>
                <p className="font-sans text-[13px] text-on-surface-variant">Herramientas administrativas para limpiar o poblar la base de datos.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleClearDatabase}
                disabled={dbActionLoading}
                className="flex-1 bg-white border border-error/30 hover:bg-error/5 text-[#ba1a1a] rounded-full py-3.5 font-sans text-[14px] font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Trash2 size={16} />
                {dbActionLoading ? 'Limpiando...' : 'Vaciar Base de Datos'}
              </button>

              <button
                onClick={handleSeedDatabase}
                disabled={dbActionLoading}
                className="flex-1 bg-primary text-white hover:bg-primary/95 rounded-full py-3.5 font-sans text-[14px] font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Database size={16} />
                {dbActionLoading ? 'Cargando...' : 'Cargar Datos de Ejemplo'}
              </button>
            </div>
            
            {dbMessage && (
              <p className={`mt-4 font-mono text-[13px] text-center ${dbMessage.includes('Error') ? 'text-[#ba1a1a] font-bold' : 'text-primary'}`}>
                {dbMessage}
              </p>
            )}
          </div>
        </div>

        {/* Right column - Quick Actions / Status */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#fff1ed] rounded-3xl p-6 shadow-[0_4px_20px_rgba(40,28,25,0.05)] border border-[#ffe9e4]">
            <h3 className="font-sans text-[18px] font-bold text-on-surface mb-2 flex items-center gap-2">
              <Sparkles className="text-primary" size={20} />
              Saman AI Activo
            </h3>
            <p className="font-sans text-[14px] text-on-surface-variant mb-6">El modelo local está actualizado con los últimos escaneos de la sucursal.</p>
            
            <div className="flex flex-col gap-3">
              <div className="bg-white/80 p-3 rounded-2xl flex items-center gap-3">
                <div className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center">
                  <Check size={16} />
                </div>
                <div>
                  <span className="font-sans text-[13px] font-semibold block text-on-surface">Base de datos de SKUs</span>
                  <span className="font-mono text-[11px] text-on-surface-variant">Sincronizada</span>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-2xl flex items-center gap-3">
                <div className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center">
                  <Check size={16} />
                </div>
                <div>
                  <span className="font-sans text-[13px] font-semibold block text-on-surface">Última Compilación</span>
                  <span className="font-mono text-[11px] text-on-surface-variant">Hace 2 horas (v2.1)</span>
                </div>
              </div>
            </div>

            <button 
              onClick={triggerSync}
              disabled={syncing}
              className="mt-6 w-full bg-primary text-white rounded-full py-3 font-sans text-[14px] font-semibold shadow-sm flex items-center justify-center gap-2 hover:scale-[0.98] active:scale-95 transition-transform"
            >
              <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Sincronizando...' : 'Forzar Sincronización'}
            </button>
          </div>

          <div className="bg-card-surface rounded-3xl p-6 shadow-[0_4px_20px_rgba(40,28,25,0.05)]">
            <h3 className="font-sans text-[18px] font-bold text-on-surface mb-4 flex items-center gap-2">
              <Shield size={20} className="text-secondary" />
              Seguridad e Info
            </h3>
            <div className="font-mono text-[12px] text-on-surface-variant flex flex-col gap-2">
              <div><strong className="text-on-surface">Rol:</strong> Administrador</div>
              <div><strong className="text-on-surface">Sucursal ID:</strong> SAMAN-MAIN-001</div>
              <div><strong className="text-on-surface">Versión App:</strong> 1.4.2</div>
              <div><strong className="text-on-surface">Motor AI:</strong> Gemini-Flash-3.5-Saman</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
