import { useState, useEffect, FormEvent } from 'react';
import { ViewState, Product, Aisle } from '../types';
import { mockProductsByAisle, mockAisles } from '../data';
import { CloudOff, ArrowLeft, MoreVertical, Search, ScanBarcode, ArrowDownAZ, Plus, X } from 'lucide-react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';

interface PasilloDetailViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  selectedAisleNumber: number;
  aisles: Aisle[];
}

export function PasilloDetailView({ onNavigate, selectedAisleNumber, aisles }: PasilloDetailViewProps) {
  const aisle = aisles.find(a => a.number === selectedAisleNumber) || aisles[0] || mockAisles[0];
  const initialProducts = mockProductsByAisle[selectedAisleNumber] || [];
  
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  // Product Creation States
  const [showProductModal, setShowProductModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productSku, setProductSku] = useState('');
  const [productStatusSelect, setProductStatusSelect] = useState<'normal' | 'bajo' | 'crítico'>('normal');

  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const initials = productName.trim().substring(0, 2).toUpperCase();

    const newProduct: Product = {
      id: 'p_' + Date.now(),
      name: productName.trim(),
      brand: productBrand.trim(),
      sku: productSku.trim(),
      status: productStatusSelect,
      initials: initials
    };

    if (isFirebaseConfigured && aisle?.id) {
      try {
        const productRef = doc(db, 'aisles', aisle.id, 'products', newProduct.id);
        await setDoc(productRef, newProduct);
      } catch (error) {
        console.error("Error al guardar producto en Firestore:", error);
      }
    } else {
      setProducts(prev => [...prev, newProduct].sort((a, b) => a.name.localeCompare(b.name)));
    }

    setShowProductModal(false);
  };

  useEffect(() => {
    if (!aisle?.id) return;

    if (isFirebaseConfigured) {
      const productsRef = collection(db, 'aisles', aisle.id, 'products');
      const unsubscribe = onSnapshot(productsRef, (snapshot) => {
        const productsData: Product[] = [];
        snapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() } as Product);
        });
        
        // Default sort by name to keep them stable
        productsData.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(productsData);

        // Update parent aisle count in Firestore if different
        if (aisle.productsCount !== productsData.length) {
          // Import dynamic updateDoc inside if needed or use local mock count
          import('firebase/firestore').then(({ updateDoc }) => {
            updateDoc(doc(db, 'aisles', aisle.id), { productsCount: productsData.length }).catch(err => {
              console.error("Error al actualizar productsCount del pasillo:", err);
            });
          });
        }
      }, (error) => {
        console.error("Error al escuchar productos de Firestore:", error);
      });
      return unsubscribe;
    } else {
      const freshProducts = mockProductsByAisle[selectedAisleNumber] || [];
      setProducts(freshProducts);
    }
  }, [selectedAisleNumber, aisle?.id]);

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const filteredProducts = products.filter(product => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'desc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      {isOffline && (
        <div className="offline-banner w-full py-1.5 flex justify-center items-center gap-2 shadow-sm rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
          <CloudOff size={14} className="text-[#745815]" />
          <span className="font-mono text-[13px] font-medium text-[#745815]">Modo offline activo</span>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => onNavigate('pasillos')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-sans text-[20px] font-semibold text-on-surface">Detalle de Pasillo</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors">
          <MoreVertical size={24} />
        </button>
      </header>

      {/* Search & Sort */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Buscar producto o SKU..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-outline-variant/50 rounded-full py-3 pl-12 pr-12 font-sans text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
        />
        <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary">
          <ScanBarcode size={24} />
        </button>
      </div>

      <div className="flex items-center justify-between px-2 mb-6">
        <span className="font-mono text-[13px] text-on-surface-variant">En Pasillo {aisle.number} - {aisle.name}</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setProductName('');
              setProductBrand('');
              setProductSku('');
              setProductStatusSelect('normal');
              setShowProductModal(true);
            }}
            className="flex items-center gap-1 text-primary font-mono text-[13px] font-semibold hover:bg-primary/5 px-3 py-1.5 rounded-full border border-primary/20 transition-colors cursor-pointer bg-white"
          >
            <Plus size={14} />
            Agregar Producto
          </button>
          
          <button 
            onClick={() => {
              setSortOrder(prev => {
                if (prev === null) return 'asc';
                if (prev === 'asc') return 'desc';
                return null;
              });
            }}
            className={`flex items-center gap-1 font-mono text-[13px] font-medium hover:bg-primary/5 px-3 py-1.5 rounded-full transition-colors ${
              sortOrder ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant'
            }`}
          >
            <ArrowDownAZ size={16} />
            {sortOrder === 'asc' && 'A-Z'}
            {sortOrder === 'desc' && 'Z-A'}
            {sortOrder === null && 'Ordenar'}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full">
        {(() => {
          return (
            <>
              <div className="flex items-center justify-between py-1 px-2">
                <h2 className="font-mono text-[13px] font-medium text-on-surface-variant uppercase tracking-wider">Pasillo {aisle.number} - {aisle.name}</h2>
                <span className="font-mono text-[13px] text-on-surface-variant/70">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'ítem' : 'ítems'}
                </span>
              </div>

              {sortedProducts.length === 0 ? (
                <div className="bg-card-surface rounded-[32px] p-12 text-center border border-outline-variant/30 flex flex-col items-center justify-center max-w-xl mx-auto shadow-sm mt-8 animate-in fade-in duration-300 w-full">
                  <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <ScanBarcode size={36} />
                  </div>
                  <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">No hay productos en este pasillo</h3>
                  <p className="font-sans text-[15px] text-on-surface-variant max-w-md mb-6">Comienza a registrar la mercadería del pasillo con el botón "Agregar Producto".</p>
                </div>
              ) : (
                sortedProducts.map(product => {
                  return (
                    <div key={product.id} className="bg-card-surface rounded-[16px] p-3 shadow-[0_4px_20px_rgba(40,28,25,0.05)] flex items-center gap-3">
                      {/* Product Image / Avatar */}
                      <div className="w-16 h-16 rounded-[12px] bg-white border border-outline-variant/30 flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-sans text-[20px] font-bold text-on-surface-variant/40">{product.initials}</span>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow flex flex-col justify-center overflow-hidden pr-2">
                        <h3 className="font-sans text-[16px] font-semibold text-[#281C19] leading-snug truncate">{product.name}</h3>
                        <span className="font-mono text-[13px] text-[#4f6b53] truncate">{product.brand} • SKU: {product.sku}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          );
        })()}
      </div>

      {/* Product Creation Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowProductModal(false)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">Agregar Nuevo Producto</h3>
              <button onClick={() => setShowProductModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Nombre del Producto</label>
                <input 
                  type="text" 
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Ej. Leche Semidescremada 1L"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Marca</label>
                <input 
                  type="text" 
                  required
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                  placeholder="Ej. Parmalat"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">SKU / Código</label>
                <input 
                  type="text" 
                  required
                  value={productSku}
                  onChange={(e) => setProductSku(e.target.value)}
                  placeholder="Ej. 75010203"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Estado Inicial</label>
                <select 
                  value={productStatusSelect}
                  onChange={(e) => setProductStatusSelect(e.target.value as any)}
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3.5 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                >
                  <option value="normal">Normal</option>
                  <option value="bajo">Bajo</option>
                  <option value="crítico">Crítico</option>
                </select>
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
