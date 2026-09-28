export type ScreenId = 
  | 'catalogo-mayorista'
  | 'validacion-pedido'
  | 'etiqueta-despacho'
  | 'promociones-b2b'
  | 'tienda'
  | 'detalle-producto'
  | 'bolsa'
  | 'checkout'
  | 'trazabilidad'
  | 'estrategia-precios';

export type AppMode = 'mayorista' | 'boutique';

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'cintos' | 'collares' | 'hebillas' | 'sets';
  retailPrice: number;
  wholesaleTiers: {
    tier1: { min: number; max: number; price: number };
    tier2: { min: number; price: number };
    tier3: { min: number; discount: number; price: number };
  };
  suggestedPVP: number;
  marginPercent: number;
  moq: number;
  image: string;
  imageAlt?: string;
  stockPerSize: {
    T85: number;
    T90: number;
    T95: number;
    T100: number;
  };
  totalStock: number;
  colors: {
    name: string;
    code: string;
    bgHex: string;
  }[];
  materialNotes: string;
  badges?: string[];
  specs?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  image: string;
  size: string;
  color: string;
  unitPrice: number;
  originalPrice: number;
  quantity: number;
  isPack?: boolean;
  packDescription?: string;
  curve?: {
    [key: string]: number;
  };
}

export interface PromoRule {
  id: string;
  name: string;
  type: 'descuento_automatico' | 'flete_bonificado' | 'cupon' | 'pack_especifico';
  benefitType: 'percentage' | 'fixed' | 'free_units';
  benefitValue: number;
  isActive: boolean;
  minUnits?: number;
  minAmount?: number;
  scope: string;
  validity: string;
  usageThisMonth: string;
  code?: string;
  usedCount?: number;
  totalLimit?: number;
  description: string;
  categories: string[];
  accumulativeWithCoupons: boolean;
  notes?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  provider: 'correo_argentino' | 'oca' | 'expreso';
  carrierTag: string;
  description: string;
  price: number;
  isFreeOrDiscounted?: boolean;
  discountBadge?: string;
  estimatedDays: string;
}
