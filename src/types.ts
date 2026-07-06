export type ViewState = 'panel' | 'pasillos' | 'pasillo-detail' | 'sugeridos' | 'compras' | 'configuracion' | 'cabezales' | 'odc';

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

export type PaymentType = 'descuento_factura' | 'porcentaje' | 'regalia';

export interface Cabezal {
  id: string;
  label: string;
  linkedAisleId?: string;
  positionX?: number;
  positionY?: number;
  tenantCompany?: string;
  paymentType?: PaymentType;
  paymentValue?: number;
  paymentNotes?: string;
  periodStart?: string;
  periodEnd?: string;
  /** Billing period label (e.g. "2026-07") of the last month paid. Monthly cycle resets on day 5. */
  lastPaidPeriod?: string;
  lastUpdated: string;
}

export interface CabezalPago {
  id: string;
  periodStart: string;
  periodEnd: string;
  paymentType: PaymentType;
  paymentValue?: number;
  isPaid: boolean;
  paidDate?: string;
  notes?: string;
  createdAt: string;
}

export interface DiagramElement {
  id: string;
  x: number;
  y: number;
  rotation: number;
  width?: number;
  height?: number;
}

export interface PurchaseOrder {
  id: string;
  fecha: string;
  empresa: string;
  numeroOrden: string;
  monto: number;
  user: string;
  lastUpdated: string;
}


