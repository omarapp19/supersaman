import { useState, useEffect, useMemo } from 'react';
import { ViewState, Aisle, Cabezal, PurchaseOrder } from './types';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { PanelView } from './components/PanelView';
import { AislesView } from './components/AislesView';
import { PasilloDetailView } from './components/PasilloDetailView';
import { ComprasView } from './components/ComprasView';
import { ConfiguracionView } from './components/ConfiguracionView';
import { Login } from './components/Login';
import { SugeridosView } from './components/SugeridosView';
import { CabezalesView } from './components/CabezalesView';
import { ODCView } from './components/ODCView';
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
  const [cabezales, setCabezales] = useState<Cabezal[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(() => {
    if (!isFirebaseConfigured) {
      const stored = localStorage.getItem('saman_purchase_orders');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });
  const [odcWeeklyLimit, setOdcWeeklyLimit] = useState<number>(() => {
    if (!isFirebaseConfigured) {
      const stored = localStorage.getItem('saman_odc_limit');
      const n = stored ? parseFloat(stored) : NaN;
      if (!isNaN(n)) return n;
    }
    return 35000;
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

  const handleUpdateOrder = async (orderId: string, updates: any) => {
    if (isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'orders', orderId), updates);
      } catch (error) {
        console.error("Error al actualizar pedido en Firestore:", error);
        toast.error("Error al actualizar el pedido.");
        return;
      }
    } else {
      setOrders(prev => {
        const updated = prev.map(o => o.id === orderId ? { ...o, ...updates } : o);
        localStorage.setItem('saman_orders', JSON.stringify(updated));
        return updated;
      });
    }

    const parts = orderId.split('_');
    const productId = parts.length > 2 ? parts.slice(2).join('_') : null;

    if (productId) {
      const order = orders.find(o => o.id === orderId);
      const aisleNum = order ? order.aisle : updates.aisle;
      
      if (aisleNum !== undefined) {
        const aisleObj = aisles.find(a => a.number === aisleNum);
        if (aisleObj) {
          const productUpdates: any = {};
          if (updates.productName !== undefined) productUpdates.name = updates.productName;
          if (updates.und_x_caja !== undefined) productUpdates.und_x_caja = updates.und_x_caja;
          if (updates.company !== undefined) productUpdates.company = updates.company;

          if (Object.keys(productUpdates).length > 0) {
            if (isFirebaseConfigured) {
              try {
                await setDoc(doc(db, 'aisles', aisleObj.id, 'products', productId), productUpdates, { merge: true });
              } catch (err) {
                console.error("Error al actualizar producto correspondiente en Firestore:", err);
              }
            } else {
              if (productUpdates.name !== undefined) {
                localStorage.setItem(`saman_name_${productId}`, productUpdates.name);
              }
              if (productUpdates.und_x_caja !== undefined) {
                localStorage.setItem(`saman_und_x_caja_${productId}`, String(productUpdates.und_x_caja));
              }
              if (productUpdates.company !== undefined) {
                localStorage.setItem(`saman_company_${productId}`, productUpdates.company);
              }
            }
            if (typeof window !== 'undefined') {
              (window as any).__samanProductsCache = null;
            }
          }
        }
      }
    }
    toast.success("Pedido actualizado con éxito.");
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

      // Subscribe to cabezales
      const unsubscribeCabezales = onSnapshot(collection(db, 'cabezales'), (snapshot) => {
        const cabezalesData: any[] = [];
        snapshot.forEach((doc) => {
          cabezalesData.push({ id: doc.id, ...doc.data() });
        });
        setCabezales(cabezalesData);
      }, (error) => {
        console.error("Error al escuchar cabezales de Firestore:", error);
      });

      // Subscribe to purchase orders (ODC)
      const unsubscribePurchaseOrders = onSnapshot(collection(db, 'purchaseOrders'), (snapshot) => {
        const purchaseOrdersData: any[] = [];
        snapshot.forEach((doc) => {
          purchaseOrdersData.push({ id: doc.id, ...doc.data() });
        });
        purchaseOrdersData.sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));
        setPurchaseOrders(purchaseOrdersData);
      }, (error) => {
        console.error("Error al escuchar órdenes de compra de Firestore:", error);
      });

      // Subscribe to ODC weekly limit config
      const unsubscribeOdcConfig = onSnapshot(doc(db, 'config', 'odc'), (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (typeof data.weeklyLimit === 'number') {
            setOdcWeeklyLimit(data.weeklyLimit);
          }
        }
      }, (error) => {
        console.error("Error al escuchar configuración de ODC:", error);
      });

      return () => {
        unsubscribeAisles();
        unsubscribeOrders();
        unsubscribeUsers();
        unsubscribeCabezales();
        unsubscribePurchaseOrders();
        unsubscribeOdcConfig();
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
    if ((view === 'cabezales' || view === 'odc') && user?.role !== 'admin') {
      return;
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

  const handleUpdateAisle = async (aisleId: string, updates: Partial<Aisle>) => {
    if (isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'aisles', aisleId), updates);
      } catch (error) {
        console.error("Error al actualizar pasillo en Firestore:", error);
      }
    } else {
      setAisles(prev => prev.map(a => a.id === aisleId ? { ...a, ...updates } : a).sort((a, b) => a.number - b.number));
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

  const handleAddCabezal = async (newCabezal: Cabezal) => {
    if (isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'cabezales', newCabezal.id), newCabezal);
      } catch (error) {
        console.error("Error al guardar cabezal en Firestore:", error);
      }
    } else {
      setCabezales(prev => [...prev, newCabezal]);
    }
  };

  const handleUpdateCabezal = async (cabezalId: string, updates: Partial<Cabezal>) => {
    if (isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'cabezales', cabezalId), updates);
      } catch (error) {
        console.error("Error al actualizar cabezal en Firestore:", error);
      }
    } else {
      setCabezales(prev => prev.map(c => c.id === cabezalId ? { ...c, ...updates } : c));
    }
  };

  const handleDeleteCabezal = async (cabezalId: string) => {
    if (isFirebaseConfigured) {
      try {
        const pagosSnap = await getDocs(collection(db, 'cabezales', cabezalId, 'pagos'));
        for (const pagoDoc of pagosSnap.docs) {
          await deleteDoc(pagoDoc.ref);
        }
        await deleteDoc(doc(db, 'cabezales', cabezalId));
      } catch (error) {
        console.error('Error al eliminar cabezal:', error);
      }
    } else {
      setCabezales(prev => prev.filter(c => c.id !== cabezalId));
      localStorage.removeItem(`saman_cabezal_pagos_${cabezalId}`);
    }
  };

  const handleAddPurchaseOrder = async (order: PurchaseOrder) => {
    if (isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'purchaseOrders', order.id), order);
      } catch (error) {
        console.error("Error al guardar orden de compra en Firestore:", error);
      }
    } else {
      setPurchaseOrders(prev => {
        const updated = [order, ...prev];
        localStorage.setItem('saman_purchase_orders', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleUpdatePurchaseOrder = async (orderId: string, updates: Partial<PurchaseOrder>) => {
    if (isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'purchaseOrders', orderId), updates);
      } catch (error) {
        console.error("Error al actualizar orden de compra en Firestore:", error);
      }
    } else {
      setPurchaseOrders(prev => {
        const updated = prev.map(o => o.id === orderId ? { ...o, ...updates } : o);
        localStorage.setItem('saman_purchase_orders', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleDeletePurchaseOrder = async (orderId: string) => {
    if (isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'purchaseOrders', orderId));
      } catch (error) {
        console.error('Error al eliminar orden de compra:', error);
      }
    } else {
      setPurchaseOrders(prev => {
        const updated = prev.filter(o => o.id !== orderId);
        localStorage.setItem('saman_purchase_orders', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleUpdateOdcLimit = async (newLimit: number) => {
    setOdcWeeklyLimit(newLimit);
    if (isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'config', 'odc'), { weeklyLimit: newLimit }, { merge: true });
      } catch (error) {
        console.error("Error al actualizar tope semanal de ODC:", error);
      }
    } else {
      localStorage.setItem('saman_odc_limit', String(newLimit));
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
          <AislesView onNavigate={navigateToView} aisles={aisles} onAddAisle={handleAddAisle} onUpdateAisle={handleUpdateAisle} onDeleteAisle={handleDeleteAisle} user={user} users={users} />
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
          <ComprasView orders={orders} onNavigate={navigateToView} aisles={aisles} checkedOrders={checkedOrders} toggleChecked={toggleChecked} onUpdateOrder={handleUpdateOrder} user={user} />
        )}
        {currentView === 'configuracion' && (
          <ConfiguracionView aisles={aisles} users={users} setUsers={setUsers} onNavigate={navigateToView} user={user} />
        )}
        {currentView === 'cabezales' && (
          <CabezalesView
            cabezales={cabezales}
            aisles={aisles}
            onAddCabezal={handleAddCabezal}
            onUpdateCabezal={handleUpdateCabezal}
            onDeleteCabezal={handleDeleteCabezal}
            user={user}
          />
        )}
        {currentView === 'odc' && (
          <ODCView
            purchaseOrders={purchaseOrders}
            weeklyLimit={odcWeeklyLimit}
            onAddPurchaseOrder={handleAddPurchaseOrder}
            onUpdatePurchaseOrder={handleUpdatePurchaseOrder}
            onDeletePurchaseOrder={handleDeletePurchaseOrder}
            onUpdateOdcLimit={handleUpdateOdcLimit}
            user={user}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav currentView={currentView} onNavigate={(view) => navigateToView(view)} user={user} />
    </div>
  );
}
