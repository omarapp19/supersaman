import { useState, useEffect, useMemo } from 'react';
import { ViewState, Aisle } from './types';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { PanelView } from './components/PanelView';
import { AislesView } from './components/AislesView';
import { PasilloDetailView } from './components/PasilloDetailView';
import { ComprasView } from './components/ComprasView';
import { ConfiguracionView } from './components/ConfiguracionView';
import { Login } from './components/Login';
import { SugeridosView } from './components/SugeridosView';
import { auth, isFirebaseConfigured, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs, updateDoc } from 'firebase/firestore';
import { mockOrders, mockAisles } from './data';
import { MapPin, LogOut } from 'lucide-react';
import { ToastProvider, useToast } from './components/Toast';

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

function AppContent() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('pasillos');
  const [selectedAisleNumber, setSelectedAisleNumber] = useState<number>(1);
  const [aisles, setAisles] = useState<Aisle[]>(mockAisles);
  const [orders, setOrders] = useState<any[]>(() => {
    if (!isFirebaseConfigured) {
      const stored = localStorage.getItem('saman_orders');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return mockOrders;
        }
      }
    }
    return mockOrders;
  });
  const checkedOrders = useMemo(() => {
    return new Set(orders.filter(o => o.checked).map(o => o.id));
  }, [orders]);
  const [users, setUsers] = useState<any[]>(() => {
    return [
      { id: 'omarapp', username: 'omarapp', fullName: 'Omar (Admin)', role: 'admin', assignedAisles: [] },
      { id: 'u2', username: 'juan', fullName: 'Juan Pérez', role: 'operador', assignedAisles: [1] },
      { id: 'u3', username: 'maria', fullName: 'María García', role: 'supervisor', assignedAisles: [4] }
    ];
  });
  const toast = useToast();

  const toggleChecked = async (id: string) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    const newCheckedState = !order.checked;

    if (isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'orders', id), { checked: newCheckedState });
      } catch (error) {
        console.error("Error al actualizar estado del pedido en Firestore:", error);
        toast.error("Error al actualizar el estado del pedido.");
      }
    } else {
      setOrders(prev => {
        const updated = prev.map(o => o.id === id ? { ...o, checked: newCheckedState } : o);
        localStorage.setItem('saman_orders', JSON.stringify(updated));
        return updated;
      });
    }
  };

  useEffect(() => {
    if (isFirebaseConfigured) {
      let unsubscribeUserDoc: (() => void) | null = null;

      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (unsubscribeUserDoc) {
          unsubscribeUserDoc();
          unsubscribeUserDoc = null;
        }

        if (firebaseUser) {
          const email = firebaseUser.email || '';
          const username = email.split('@')[0].toLowerCase();
          
          if (username === 'omarapp' || username === 'admin') {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || 'Omar (Admin)',
              role: 'admin',
              assignedAisles: [],
              username
            });
            setAuthLoading(false);
          } else {
            // Subscribe to real-time changes on the user document in Firestore
            const { doc, onSnapshot } = await import('firebase/firestore');
            const userDocRef = doc(db, 'users', username);
            
            unsubscribeUserDoc = onSnapshot(userDocRef, (userSnap) => {
              let role = 'operador';
              let assignedAisles: number[] = [];
              let fullName = firebaseUser.displayName || email;

              if (userSnap.exists()) {
                const data = userSnap.data();
                role = data.role || 'operador';
                if (data.assignedAisles) {
                  assignedAisles = data.assignedAisles;
                } else if (data.assignedAisle) {
                  assignedAisles = [data.assignedAisle];
                }
                fullName = data.fullName || fullName;
              }

              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: fullName,
                role,
                assignedAisles,
                username
              });
              setAuthLoading(false);
            }, (error) => {
              console.error("Error al escuchar perfil del usuario de Firestore:", error);
              // Fallback to default operator settings
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || email,
                role: 'operador',
                assignedAisles: [],
                username
              });
              setAuthLoading(false);
            });
          }
        } else {
          setUser(null);
          setAuthLoading(false);
        }
      });

      return () => {
        unsubscribe();
        if (unsubscribeUserDoc) {
          unsubscribeUserDoc();
        }
      };
    } else {
      const storedUser = sessionStorage.getItem('saman_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setAuthLoading(false);
    }
  }, []);

  // Listen to Firestore real-time updates when configured and logged in
  useEffect(() => {
    if (isFirebaseConfigured && user) {
      // Subscribe to aisles
      const unsubscribeAisles = onSnapshot(collection(db, 'aisles'), (snapshot) => {
        const aislesData: any[] = [];
        snapshot.forEach((doc) => {
          aislesData.push({ id: doc.id, ...doc.data() });
        });
        aislesData.sort((a, b) => a.number - b.number);
        setAisles(aislesData);
      }, (error) => {
        console.error("Error al escuchar pasillos de Firestore:", error);
      });

      // Subscribe to orders
      const unsubscribeOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
        const ordersData: any[] = [];
        snapshot.forEach((doc) => {
          ordersData.push({ id: doc.id, ...doc.data() });
        });
        ordersData.sort((a, b) => b.id.localeCompare(a.id));
        setOrders(ordersData);
      }, (error) => {
        console.error("Error al escuchar órdenes de Firestore:", error);
      });

      // Subscribe to users
      const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
        const usersData: any[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          let assignedAisles: number[] = [];
          if (data.assignedAisles) {
            assignedAisles = data.assignedAisles;
          } else if (data.assignedAisle) {
            assignedAisles = [data.assignedAisle];
          }
          usersData.push({ id: doc.id, ...data, assignedAisles });
        });
        
        // Ensure omarapp is always in the list
        if (!usersData.some(u => u.username === 'omarapp')) {
          usersData.unshift({
            id: 'omarapp',
            username: 'omarapp',
            fullName: 'Omar (Admin)',
            role: 'admin',
            assignedAisles: []
          });
        }
        setUsers(usersData);
      }, (error) => {
        console.error("Error al escuchar usuarios de Firestore:", error);
      });

      return () => {
        unsubscribeAisles();
        unsubscribeOrders();
        unsubscribeUsers();
      };
    }
  }, [user]);

  // Initialize history state on mount
  useEffect(() => {
    if (window.history.state === null) {
      window.history.replaceState({ view: 'pasillos', aisleNum: 1 }, '');
    }
  }, []);

  // Listen to popstate event for back button support
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        const { view, aisleNum } = event.state;
        navigateToView(view, aisleNum, true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedAisleNumber, user]);

  const navigateToView = (view: ViewState, aisleNum?: number, fromPopState = false) => {
    if (user?.role === 'operador') {
      if (view !== 'pasillos' && view !== 'pasillo-detail' && view !== 'sugeridos' && view !== 'compras') {
        return;
      }
      if (view === 'pasillo-detail' && aisleNum !== undefined && user.assignedAisles !== undefined && Array.isArray(user.assignedAisles) && user.assignedAisles.length > 0) {
        if (!user.assignedAisles.includes(aisleNum)) {
          return;
        }
      }
    }
    const resolvedAisleNum = aisleNum !== undefined ? aisleNum : selectedAisleNumber;
    if (aisleNum !== undefined) {
      setSelectedAisleNumber(aisleNum);
    }
    setCurrentView(view);

    if (!fromPopState) {
      window.history.pushState({ view, aisleNum: resolvedAisleNum }, '');
    }
  };

  const handleLogout = async () => {
    try {
      if (isFirebaseConfigured) {
        await signOut(auth);
      } else {
        sessionStorage.removeItem('saman_user');
        setUser(null);
      }
      setCurrentView('pasillos');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleMockLogin = (mockUser: any) => {
    sessionStorage.setItem('saman_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const handleAddOrders = async (newOrders: any[]) => {
    if (isFirebaseConfigured) {
      try {
        for (const order of newOrders) {
          await setDoc(doc(db, 'orders', order.id), order);
        }
      } catch (error) {
        console.error("Error al guardar órdenes en Firestore:", error);
      }
    } else {
      setOrders(prev => {
        const updated = [...newOrders, ...prev];
        localStorage.setItem('saman_orders', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleAddAisle = async (newAisle: Aisle) => {
    if (isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'aisles', newAisle.id), newAisle);
      } catch (error) {
        console.error("Error al guardar pasillo en Firestore:", error);
      }
    } else {
      setAisles(prev => [...prev, newAisle].sort((a, b) => a.number - b.number));
    }
  };

  const handleDeleteAisle = async (aisleId: string) => {
    if (isFirebaseConfigured) {
      try {
        // Delete all products in the aisle first
        const productsSnap = await getDocs(collection(db, 'aisles', aisleId, 'products'));
        for (const productDoc of productsSnap.docs) {
          await deleteDoc(productDoc.ref);
        }
        await deleteDoc(doc(db, 'aisles', aisleId));
      } catch (error) {
        console.error('Error al eliminar pasillo:', error);
      }
    } else {
      setAisles(prev => prev.filter(a => a.id !== aisleId));
    }
  };

  const handleDeleteProduct = async (aisleId: string, productId: string) => {
    if (isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'aisles', aisleId, 'products', productId));
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
    // In demo mode, PasilloDetailView handles local state
  };

  if (authLoading) {
    return (
      <div className="min-h-screen w-full bg-[#DDEBEA] flex flex-col items-center justify-center font-sans gap-6 select-none relative overflow-hidden">
        {/* Ambient background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/15 blur-3xl animate-pulse"></div>
        <div className="flex flex-col items-center gap-4 relative z-10 animate-pulse">
          <img src="/logo.svg" alt="Súper Samán" className="w-24 h-24 mb-2 mix-blend-multiply" />
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="font-mono text-[13px] text-on-surface-variant font-semibold tracking-wider uppercase">Cargando Súper Samán...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onMockLogin={handleMockLogin} />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] selection:bg-primary/20 selection:text-primary">
      {/* Desktop Sidebar */}
      <Sidebar currentView={currentView} onNavigate={(view) => navigateToView(view)} onLogout={handleLogout} user={user} />
      
      {/* Mobile Top App Bar (Only visible when not in Pasillo Detail which has its own header) */}
      {currentView !== 'pasillo-detail' && (
        <header className="flex justify-between items-center w-full px-4 py-2 md:hidden bg-card-surface sticky top-0 z-40 mb-4 print-hide border-b border-outline-variant/20">
          <img src="/logo.svg" alt="Súper Samán" className="h-12 w-12 mix-blend-multiply" />
          <div className="flex gap-4 text-primary">
            <button 
              className="active:scale-95 transition-transform cursor-pointer"
              onClick={() => toast.info('Sucursal Principal: Súper Samán')}
              title="Sucursal Conectada"
            >
              <MapPin size={24} />
            </button>
            <button className="active:scale-95 transition-transform cursor-pointer" onClick={handleLogout} title="Cerrar Sesión"><LogOut size={22} /></button>
          </div>
        </header>
      )}

      {/* Main Content Workspace */}
      <main className="md:ml-64 p-4 pb-24 md:p-8 print:ml-0 print:p-0">
        {currentView === 'panel' && (
          <PanelView onNavigate={navigateToView} aisles={aisles} orders={orders} checkedOrders={checkedOrders} />
        )}
        {currentView === 'pasillos' && (
          <AislesView onNavigate={navigateToView} aisles={aisles} onAddAisle={handleAddAisle} onDeleteAisle={handleDeleteAisle} user={user} users={users} />
        )}
        {currentView === 'pasillo-detail' && (
          <PasilloDetailView 
            onNavigate={navigateToView} 
            selectedAisleNumber={selectedAisleNumber}
            aisles={aisles}
            onDeleteProduct={handleDeleteProduct}
            user={user}
          />
        )}
        {currentView === 'sugeridos' && (
          <SugeridosView 
            onNavigate={navigateToView} 
            onAddOrders={handleAddOrders}
            aisles={aisles}
            user={user}
          />
        )}
        {currentView === 'compras' && (
          <ComprasView orders={orders} onNavigate={navigateToView} aisles={aisles} checkedOrders={checkedOrders} toggleChecked={toggleChecked} user={user} />
        )}
        {currentView === 'configuracion' && (
          <ConfiguracionView aisles={aisles} users={users} setUsers={setUsers} />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav currentView={currentView} onNavigate={(view) => navigateToView(view)} user={user} />
    </div>
  );
}
