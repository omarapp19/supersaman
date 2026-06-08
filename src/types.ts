export type ViewState = 'panel' | 'pasillos' | 'pasillo-detail' | 'compras' | 'configuracion';

export interface Aisle {
  id: string;
  number: number;
  name: string;
  status: 'assigned' | 'unassigned';
  progress: number;
  itemsEstimated: number;
  lastScanned?: string;
  needsScan?: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  stock: number;
  status: 'normal' | 'bajo' | 'crítico';
  imageUrl?: string;
  initials?: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  brand: string;
  sku: string;
  suggestedQty: number;
  aisle: number;
  user: string;
  status: 'normal' | 'bajo' | 'crítico';
  lastUpdated: string;
}
