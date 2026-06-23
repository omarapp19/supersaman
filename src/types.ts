export type ViewState = 'panel' | 'pasillos' | 'pasillo-detail' | 'sugeridos' | 'compras' | 'configuracion';

export interface Aisle {
  id: string;
  number: number;
  name: string;
  status: 'assigned' | 'unassigned';
  progress: number;
  productsCount?: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  status: 'normal' | 'bajo' | 'crítico';
  imageUrl?: string;
  initials?: string;
  und_x_caja?: number;
  company?: string;
  sellingUnit?: 'und' | 'kg';
}

export interface OrderItem {
  id: string;
  productName: string;
  brand: string;
  sku: string;
  suggestedQty: number;
  unit: 'cajas' | 'und' | 'kg';
  aisle: number;
  user: string;
  status: 'normal' | 'bajo' | 'crítico';
  lastUpdated: string;
  checked?: boolean;
  company?: string;
  und_x_caja?: number;
}


