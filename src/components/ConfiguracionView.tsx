import { useState, useEffect, FormEvent } from 'react';
import { Shield, Bell, Cpu, Sparkles, Check, RefreshCw, Database, Trash2, Users, UserPlus, Edit, X } from 'lucide-react';
import { db, isFirebaseConfigured, bootstrapFirestore, clearAllFirestoreData } from '../firebase';
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Aisle } from '../types';

interface ConfiguracionViewProps {
  aisles: Aisle[];
}

export function ConfiguracionView({ aisles }: ConfiguracionViewProps) {
  const [pushAlerts, setPushAlerts] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [dbActionLoading, setDbActionLoading] = useState(false);
  const [dbMessage, setDbMessage] = useState<string | null>(null);

  // User Management States
  const [users, setUsers] = useState<any[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userFullName, setUserFullName] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState<'admin' | 'supervisor' | 'operador'>('operador');
  const [userAisle, setUserAisle] = useState<number | undefined>(undefined);

  // Sync users list in real-time
  useEffect(() => {
    if (isFirebaseConfigured) {
      const usersRef = collection(db, 'users');
      const unsubscribe = onSnapshot(usersRef, (snapshot) => {
        const usersData: any[] = [];
        snapshot.forEach((doc) => {
          usersData.push({ id: doc.id, ...doc.data() });
        });
        
        // Ensure omarapp is always in the list
        if (!usersData.some(u => u.username === 'omarapp')) {
          usersData.unshift({
            id: 'omarapp',
            username: 'omarapp',
            fullName: 'Omar (Admin)',
            role: 'admin',
            assignedAisle: null
          });
        }

        setUsers(usersData);
      }, (error) => {
        console.error("Error al escuchar usuarios de Firestore:", error);
      });
      return unsubscribe;
    } else {
      setUsers([
        { id: 'omarapp', username: 'omarapp', fullName: 'Omar (Admin)', role: 'admin' },
        { id: 'u2', username: 'juan', fullName: 'Juan Pérez', role: 'operador', assignedAisle: 1 },
        { id: 'u3', username: 'maria', fullName: 'María García', role: 'supervisor', assignedAisle: 4 }
      ]);
    }
  }, []);

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

  const handleUserSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const usernameKey = userUsername.trim().toLowerCase();
    
    // Prepare profile fields
    const profile = {
      username: userUsername.trim(),
      fullName: userFullName.trim(),
      role: userRole,
      assignedAisle: userAisle || null
    };

    if (isFirebaseConfigured) {
      try {
        if (editingUserId) {
          const userRef = doc(db, 'users', editingUserId);
          await updateDoc(userRef, profile);
        } else {
          // In Firestore, use the username as doc ID for simplicity
          const userRef = doc(db, 'users', usernameKey);
          await setDoc(userRef, profile);
        }
      } catch (error) {
        console.error("Error al guardar usuario en Firestore:", error);
        alert("Error al guardar usuario: " + (error as Error).message);
      }
    } else {
      if (editingUserId) {
        setUsers(prev => prev.map(u => u.id === editingUserId ? { ...u, ...profile } : u));
      } else {
        const newUser = {
          id: 'u_' + Date.now(),
          ...profile
        };
        setUsers(prev => [...prev, newUser]);
      }
    }

    setShowUserModal(false);
  };

  const handleDeleteUser = async (id: string, username: string) => {
    if (username === 'omarapp') {
      alert("No puedes eliminar al usuario Administrador principal.");
      return;
    }
    if (!confirm(`¿Estás seguro de que deseas eliminar al usuario @${username}?`)) {
      return;
    }

    if (isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'users', id));
      } catch (error) {
        console.error("Error al eliminar usuario en Firestore:", error);
        alert("Error al eliminar: " + (error as Error).message);
      }
    } else {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight">Configuración</h2>
        <p className="font-sans text-[16px] md:text-[18px] text-on-surface-variant mt-2">Personaliza parámetros de reabastecimiento, gestiona usuarios y administra bases de datos.</p>
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

          {/* User Management Card */}
          <div className="bg-card-surface rounded-3xl p-6 shadow-[0_4px_20px_rgba(40,28,25,0.05)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2.5 rounded-2xl">
                  <Users size={22} />
                </div>
                <div>
                  <h3 className="font-sans text-[18px] font-bold text-on-surface">Gestión de Usuarios</h3>
                  <p className="font-sans text-[13px] text-on-surface-variant">Crea operadores/supervisores, edita roles y asigna pasillos.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingUserId(null);
                  setUserFullName('');
                  setUserUsername('');
                  setUserPassword('');
                  setUserRole('operador');
                  setUserAisle(undefined);
                  setShowUserModal(true);
                }}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-primary text-white hover:bg-primary/95 rounded-full font-sans text-[13px] font-semibold transition-all shadow-sm cursor-pointer self-start sm:self-auto"
              >
                <UserPlus size={16} />
                Nuevo Usuario
              </button>
            </div>

            <div className="overflow-x-auto border border-outline-variant/20 rounded-2xl bg-white/50">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-on-surface-variant/80 font-mono text-[11px] uppercase tracking-wider bg-surface-variant/10">
                    <th className="py-3.5 px-4 font-semibold">Usuario</th>
                    <th className="py-3.5 px-4 font-semibold">Rol</th>
                    <th className="py-3.5 px-4 font-semibold">Pasillo Asignado</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-[14px] text-on-surface">
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-outline-variant/10 hover:bg-surface-variant/10 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[13px]">
                          {u.fullName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-on-surface leading-tight">{u.fullName}</span>
                          <span className="font-mono text-[11px] text-on-surface-variant">@{u.username}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {u.role === 'admin' && <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full font-mono text-[10px] font-bold uppercase border border-primary/20">Admin</span>}
                        {u.role === 'supervisor' && <span className="px-2 py-0.5 bg-blue-500/10 text-blue-700 rounded-full font-mono text-[10px] font-bold uppercase border border-blue-500/20">Supervisor</span>}
                        {u.role === 'operador' && <span className="px-2 py-0.5 bg-amber-500/10 text-amber-700 rounded-full font-mono text-[10px] font-bold uppercase border border-amber-500/20">Operador</span>}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[13px] text-on-surface-variant">
                        {u.assignedAisle ? `Pasillo ${u.assignedAisle}` : 'Ninguno'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingUserId(u.id);
                              setUserFullName(u.fullName);
                              setUserUsername(u.username);
                              setUserRole(u.role);
                              setUserAisle(u.assignedAisle || undefined);
                              setShowUserModal(true);
                            }}
                            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                            title="Editar Usuario"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id, u.username)}
                            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors cursor-pointer"
                            title="Eliminar Usuario"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <p className="mt-4 font-mono text-[13px] text-center text-primary">
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
            <p className="font-sans text-[14px] text-on-surface-variant mb-6">El modelo local está actualizado con los últimos datos de la sucursal.</p>
            
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

      {/* User Creation / Edit Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowUserModal(false)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">
                {editingUserId ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
              </h3>
              <button onClick={() => setShowUserModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUserSubmit} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Nombre Completo</label>
                <input 
                  type="text" 
                  required
                  value={userFullName}
                  onChange={(e) => setUserFullName(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Usuario (Login)</label>
                <input 
                  type="text" 
                  required
                  disabled={!!editingUserId}
                  value={userUsername}
                  onChange={(e) => setUserUsername(e.target.value)}
                  placeholder="Ej. juan"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm disabled:opacity-50"
                />
              </div>

              {!editingUserId && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Contraseña</label>
                  <input 
                    type="password" 
                    required
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="Contraseña del usuario"
                    className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Rol</label>
                  <select 
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value as any)}
                    className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3.5 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  >
                    <option value="admin">Administrador</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="operador">Operador</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Pasillo Asignado</label>
                  <select 
                    value={userAisle || ''}
                    onChange={(e) => setUserAisle(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                    className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3.5 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  >
                    <option value="">Ninguno</option>
                    {aisles.map(a => (
                      <option key={a.id} value={a.number}>Pasillo {a.number} - {a.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  {editingUserId ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
