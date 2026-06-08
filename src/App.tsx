import { useState, useEffect } from 'react';
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
import { auth, isFirebaseConfigured, db, bootstrapFirestore } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { mockOrders, mockAisles } from './data';
import { MapPin, LogOut } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('pasillos');
  const [selectedAisleNumber, setSelectedAisleNumber] = useState<number>(1);
  const [aisles, setAisles] = useState<Aisle[]>(mockAisles);
  const [orders, setOrders] = useState<any[]>(mockOrders);
  const [checkedOrders, setCheckedOrders] = useState<Set<string>>(new Set());

  const toggleChecked = (id: string) => {
    setCheckedOrders(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setAuthLoading(false);
      });
      return unsubscribe;
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

      return () => {
        unsubscribeAisles();
        unsubscribeOrders();
      };
    }
  }, [user]);

  const navigateToView = (view: ViewState, aisleNum?: number) => {
    if (aisleNum !== undefined) {
      setSelectedAisleNumber(aisleNum);
    }
    setCurrentView(view);
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
      setOrders(prev => [...newOrders, ...prev]);
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

  if (authLoading) {
    return (
      <div className="min-h-screen w-full bg-[#DDEBEA] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-mono text-[13px] text-on-surface-variant font-medium">Cargando Sugeridos Super Saman...</span>
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
      <Sidebar currentView={currentView} onNavigate={(view) => navigateToView(view)} onLogout={handleLogout} />
      
      {/* Mobile Top App Bar (Only visible when not in Pasillo Detail which has its own header) */}
      {currentView !== 'pasillo-detail' && (
        <header className="flex justify-between items-center w-full px-4 py-3 md:hidden bg-surface/80 backdrop-blur-md sticky top-0 z-40 mb-4 print-hide border-b border-outline-variant/10">
          <h1 className="font-sans text-[22px] font-bold text-primary">Sugeridos Super Saman</h1>
          <div className="flex gap-4 text-primary">
            <button className="active:scale-95 transition-transform"><MapPin size={24} /></button>
            <button className="active:scale-95 transition-transform" onClick={handleLogout} title="Cerrar Sesión"><LogOut size={22} /></button>
          </div>
        </header>
      )}

      {/* Main Content Workspace */}
      <main className="md:ml-64 p-4 md:p-8 print:ml-0 print:p-0">
        {currentView === 'panel' && (
          <PanelView onNavigate={navigateToView} aisles={aisles} orders={orders} checkedOrders={checkedOrders} />
        )}
        {currentView === 'pasillos' && (
          <AislesView onNavigate={navigateToView} aisles={aisles} onAddAisle={handleAddAisle} />
        )}
        {currentView === 'pasillo-detail' && (
          <PasilloDetailView 
            onNavigate={navigateToView} 
            selectedAisleNumber={selectedAisleNumber}
            aisles={aisles}
          />
        )}
        {currentView === 'sugeridos' && (
          <SugeridosView 
            onNavigate={navigateToView} 
            onAddOrders={handleAddOrders}
            aisles={aisles}
          />
        )}
        {currentView === 'compras' && (
          <ComprasView orders={orders} onNavigate={navigateToView} aisles={aisles} checkedOrders={checkedOrders} toggleChecked={toggleChecked} />
        )}
        {currentView === 'configuracion' && (
          <ConfiguracionView aisles={aisles} />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav currentView={currentView} onNavigate={(view) => navigateToView(view)} />
    </div>
  );
}
