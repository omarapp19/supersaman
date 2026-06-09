import { Aisle, Product, OrderItem } from './types';

export const mockAisles: Aisle[] = [
  {
    id: 'a_1',
    number: 1,
    name: 'Bebidas y Refrescos',
    status: 'assigned',
    progress: 75,
    productsCount: 4
  },
  {
    id: 'a_2',
    number: 2,
    name: 'Granos y Abarrotes',
    status: 'assigned',
    progress: 50,
    productsCount: 4
  },
  {
    id: 'a_3',
    number: 3,
    name: 'Cuidado del Hogar',
    status: 'assigned',
    progress: 33,
    productsCount: 3
  },
  {
    id: 'a_4',
    number: 4,
    name: 'Lácteos y Quesos',
    status: 'assigned',
    progress: 75,
    productsCount: 4
  },
  {
    id: 'a_5',
    number: 5,
    name: 'Cuidado Personal',
    status: 'unassigned',
    progress: 0,
    productsCount: 3
  }
];

export const mockProductsByAisle: Record<number, Product[]> = {
  1: [
    {
      id: 'p_1_1',
      name: 'Coca-Cola Sabor Original 1.5L',
      brand: 'Coca-Cola',
      sku: '7501055300078',
      status: 'normal',
      initials: 'CC'
    },
    {
      id: 'p_1_2',
      name: 'Pepsi Black 1.5L',
      brand: 'Pepsi',
      sku: '7501031302829',
      status: 'bajo',
      initials: 'PB'
    },
    {
      id: 'p_1_3',
      name: 'Agua Mineral Peñafiel 600ml',
      brand: 'Peñafiel',
      sku: '7501011300067',
      status: 'normal',
      initials: 'AP'
    },
    {
      id: 'p_1_4',
      name: 'Jugo de Naranja Del Valle 1L',
      brand: 'Del Valle',
      sku: '7501005112003',
      status: 'crítico',
      initials: 'DV'
    }
  ],
  2: [
    {
      id: 'p_2_1',
      name: 'Arroz Blanco Super Extra 1kg',
      brand: 'Verde Valle',
      sku: '7501018300237',
      status: 'normal',
      initials: 'AB'
    },
    {
      id: 'p_2_2',
      name: 'Aceite Vegetal 1L',
      brand: '1-2-3',
      sku: '7501009123008',
      status: 'normal',
      initials: 'AV'
    },
    {
      id: 'p_2_3',
      name: 'Harina de Trigo Selecta 1kg',
      brand: 'Selecta',
      sku: '7501015112024',
      status: 'bajo',
      initials: 'HT'
    },
    {
      id: 'p_2_4',
      name: 'Azúcar Estándar Zulka 1kg',
      brand: 'Zulka',
      sku: '7501044400017',
      status: 'crítico',
      initials: 'AE'
    }
  ],
  3: [
    {
      id: 'p_3_1',
      name: 'Detergente Líquido Mas Color 1L',
      brand: 'Mas Color',
      sku: '7501021303031',
      status: 'normal',
      initials: 'MC'
    },
    {
      id: 'p_3_2',
      name: 'Cloro Desinfectante Cloralex 1L',
      brand: 'Cloralex',
      sku: '7501025501020',
      status: 'normal',
      initials: 'CD'
    },
    {
      id: 'p_3_3',
      name: 'Lavatrastes Líquido Salvo Limón 750ml',
      brand: 'Salvo',
      sku: '7501006500120',
      status: 'bajo',
      initials: 'SL'
    }
  ],
  4: [
    {
      id: 'p_4_1',
      name: 'Leche Entera pasteurizada 1L',
      brand: 'Lala',
      sku: '7501020512038',
      status: 'normal',
      initials: 'LE'
    },
    {
      id: 'p_4_2',
      name: 'Yogur Batido Fresa Danone 1kg',
      brand: 'Danone',
      sku: '7501032304044',
      status: 'bajo',
      initials: 'YB'
    },
    {
      id: 'p_4_3',
      name: 'Queso Panela Nochebuena 400g',
      brand: 'Nochebuena',
      sku: '7501020301045',
      status: 'crítico',
      initials: 'QP'
    },
    {
      id: 'p_4_4',
      name: 'Mantequilla con Sal Gloria 90g',
      brand: 'Gloria',
      sku: '7501020202026',
      status: 'normal',
      initials: 'MS'
    }
  ],
  5: [
    {
      id: 'p_5_1',
      name: 'Shampoo Caprice Especialidades 750ml',
      brand: 'Palmolive',
      sku: '7501035911409',
      status: 'normal',
      initials: 'SC'
    },
    {
      id: 'p_5_2',
      name: 'Crema Dental Colgate Triple Acción 75ml',
      brand: 'Colgate',
      sku: '7501035911508',
      status: 'bajo',
      initials: 'CD'
    },
    {
      id: 'p_5_3',
      name: 'Jabón de Tocador Camay Clásico 150g',
      brand: 'Camay',
      sku: '7501006512000',
      status: 'normal',
      initials: 'JC'
    }
  ]
};

export const mockOrders: OrderItem[] = [
  {
    id: 'o_1',
    productName: 'Jugo de Naranja Del Valle 1L',
    brand: 'Del Valle',
    sku: '7501005112003',
    suggestedQty: 10,
    unit: 'cajas',
    aisle: 1,
    user: 'Juan Pérez',
    status: 'crítico',
    lastUpdated: '2026-06-08T10:00:00Z'
  },
  {
    id: 'o_2',
    productName: 'Azúcar Estándar Zulka 1kg',
    brand: 'Zulka',
    sku: '7501044400017',
    suggestedQty: 50,
    unit: 'und',
    aisle: 2,
    user: 'María García',
    status: 'crítico',
    lastUpdated: '2026-06-08T11:30:00Z'
  },
  {
    id: 'o_3',
    productName: 'Pepsi Black 1.5L',
    brand: 'Pepsi',
    sku: '7501031302829',
    suggestedQty: 5,
    unit: 'cajas',
    aisle: 1,
    user: 'Juan Pérez',
    status: 'bajo',
    lastUpdated: '2026-06-08T10:15:00Z'
  }
];
