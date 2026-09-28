import { Product, PromoRule, ShippingMethod } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'cinto-verona',
    sku: 'CTV-204',
    name: 'Cinto Verona Hebilla Oval',
    subtitle: 'Cuero Vacuno Plena Flor 35mm',
    description: 'Cuero curtido al vegetal grosor 3.8mm con cantos bruñidos a mano con cera de abejas. Hebilla de zamak macizo cepillado.',
    category: 'cintos',
    retailPrice: 24500,
    wholesaleTiers: {
      tier1: { min: 1, max: 11, price: 7200 },
      tier2: { min: 12, price: 6100 },
      tier3: { min: 24, discount: 20, price: 5800 }
    },
    suggestedPVP: 18500,
    marginPercent: 157,
    moq: 6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3suNaSzVu-d7ChvtPxLQu7aHHnRC7Gg1by-sILBba_Kk8_ZVQPmPfOI4hv7-yZ9aB9GGm_BFerJD4flUfF0OGSpmymnWHBaQqr9ihEHLdOChldoGGv40ieW6Le1qcYslFVlizZ0ZzjMTQOYnxjssq41atr5R7lJmb5k2MjdwgMZvQbQAZ9HBVeOu53HK0aHv-3JABAApo2whI_URr-HNpJa5m-IJcxNHBJz9ofCD5eT-sk8MnBS4',
    imageAlt: 'Cinto Verona handcrafted genuine leather belt with artisan brushed brass buckle',
    stockPerSize: {
      T85: 42,
      T90: 58,
      T95: 30,
      T100: 12
    },
    totalStock: 142,
    colors: [
      { name: 'Caramelo Natural', code: 'caramelo', bgHex: '#985E17' },
      { name: 'Suela Natural', code: 'suela', bgHex: '#D99F66' },
      { name: 'Tostado Roble', code: 'roble', bgHex: '#64371F' },
      { name: 'Negro Mate', code: 'negro', bgHex: '#211C1A' }
    ],
    materialNotes: 'Cuero flor entera 3.5mm curtición tanino vegetal sin cromo.',
    badges: ['MOQ: 6 uds', '+157% Margen', 'Curtido Vegetal', 'Hecho a Mano']
  },
  {
    id: 'collar-atenea',
    sku: 'JOY-ATE-04',
    name: 'Collar Atenea Eslabón',
    subtitle: 'Joyería de Autor • Baño 18k',
    description: 'Eslabones entrelazados macizos libres de níquel con cierre marinero. Cadena veneciana de 45cm con eslabón forjado y dije texturado.',
    category: 'collares',
    retailPrice: 18900,
    wholesaleTiers: {
      tier1: { min: 1, max: 5, price: 5400 },
      tier2: { min: 6, price: 4950 },
      tier3: { min: 12, discount: 15, price: 4590 }
    },
    suggestedPVP: 14900,
    marginPercent: 172,
    moq: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAltg6eiUz7d-8dKz6_bStsdJCEhGmo5yrXSy8SzKMGGXM_qvmUxzhz6rQ75ZpGzv3jI0schAyJgPma1Ny7W2wv3Ez54Ak4PkTe-PJ3P9cMe_kAFmtXV8n2tLzr1QiI1k14PeRhbUCi4Uc-vK3Iu8_E61jrHEs8jcturUrAtGRL6xVqRfj-f8tolqkIzsduCdFwT7wZBBZGTHmn0rv0Y8TxvUGh9lR5fuiOdvo4B3cdtufmJxNdu3w',
    imageAlt: 'Collar Atenea handcrafted contemporary necklace with chunky interlocking gold-plated bronze links',
    stockPerSize: {
      T85: 35,
      T90: 45,
      T95: 25,
      T100: 15
    },
    totalStock: 120,
    colors: [
      { name: 'Baño Dorado 18k', code: 'dorado', bgHex: '#D4AF37' },
      { name: 'Alpaca Satinada', code: 'plateado', bgHex: '#C0C0C0' }
    ],
    materialNotes: 'Bronce macizo con baño galvánico 18k e hidrofugado hipoalergénico.',
    badges: ['MOQ: 4 uds', '+172% Margen', 'Hipoalergénico', 'Packaging Boutique']
  },
  {
    id: 'cinto-western',
    sku: 'CIN-WES-88',
    name: 'Cinto Western Repujado',
    subtitle: 'Cuero Repujado • Hebilla Plateada',
    description: 'Troquelado tradicional criollo con herrajes Zamak niquelado envejecido. Guardas botánicas cinceladas a mano.',
    category: 'cintos',
    retailPrice: 28000,
    wholesaleTiers: {
      tier1: { min: 1, max: 11, price: 7900 },
      tier2: { min: 12, price: 6800 },
      tier3: { min: 24, discount: 18, price: 6450 }
    },
    suggestedPVP: 21000,
    marginPercent: 165,
    moq: 6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbzOpiIrHQgBFbA4V7DZTqfLFvDRc5MBNao6PQwL9wvOIvxVE5n8MDBOhGsrpIgTjMimA_0eeFtwXLXJVyH0Hv2GWIa1GBROdZ0sJvPSQYMYdF7AJzu5n7iGWl_cYflVXBhIPabkOblU7cQCFPn1W4qeywFzlrjKq_xNkTBLIgAviO8Vz8v3PjV3fFSSfIFKXwcF4kSLw5vNd9dEQTLrE-xPoNPqPEQuRqpAzFvd170zjpJN9qEAQ',
    imageAlt: 'Western engraved leather belt in deep chocolate brown leather',
    stockPerSize: {
      T85: 18,
      T90: 32,
      T95: 25,
      T100: 14
    },
    totalStock: 89,
    colors: [
      { name: 'Tostado Roble', code: 'roble', bgHex: '#64371F' },
      { name: 'Negro Mate', code: 'negro', bgHex: '#211C1A' }
    ],
    materialNotes: 'Cuero vaqueta 4mm con grabado al calor artesanal.',
    badges: ['MOQ: 6 uds', '+165% Margen', 'Repujado Manual', 'Edición Limitada']
  },
  {
    id: 'cinto-milano',
    sku: 'CIN-MIL-12',
    name: 'Cinto Milano Doble Anilla',
    subtitle: 'Colección Contemporánea 28mm',
    description: 'Diseño versátil para cintura y cadera, cuero satinado sin costura visible, adaptable a vaqueros, trajes o vestidos.',
    category: 'cintos',
    retailPrice: 22000,
    wholesaleTiers: {
      tier1: { min: 1, max: 11, price: 6500 },
      tier2: { min: 12, price: 5500 },
      tier3: { min: 24, discount: 16, price: 5190 }
    },
    suggestedPVP: 16200,
    marginPercent: 148,
    moq: 6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnWUNbo8DBhIoOvfDoarxzpZcW5DjH5Bf-U0CGxbukthnUDe5U7pWTFihkmWrAdS_nbwVqZHWmyvTl2hWCz3isNXnWU1H87uBR4ueV7ErE1hKKb2EKADrR1H9ZP6HI1ArIKBA0qIc9UPd7clhB1XyamtGp2gKGUj1UNJx3W1Up0l5jZP9GxllGH4zwqnJ2_R5na8V4LNK-e1qE1bZSQJutXtvQjaFWP-jOJ1IWNg4Fxc0JRtg7jJw',
    imageAlt: 'Double ring leather belt in glossy black leather with gold-tone hardware',
    stockPerSize: {
      T85: 24,
      T90: 45,
      T95: 31,
      T100: 10
    },
    totalStock: 110,
    colors: [
      { name: 'Negro Satinado', code: 'negro', bgHex: '#1E1B18' },
      { name: 'Chocolate Oscuro', code: 'chocolate', bgHex: '#4A2A1A' },
      { name: 'Caramelo', code: 'caramelo', bgHex: '#A35E38' }
    ],
    materialNotes: 'Cuero graso maleable con doble aro de latón forjado.',
    badges: ['MOQ: 6 uds', '+148% Margen', 'Doble Anilla Zamak', 'Básico Clave']
  }
];

export const PROMO_RULES: PromoRule[] = [
  {
    id: 'promo-1',
    name: 'Descuento Escala Mayorista Tier 2 (12% OFF)',
    type: 'descuento_automatico',
    benefitType: 'percentage',
    benefitValue: 12,
    isActive: true,
    minUnits: 15,
    minAmount: 150000,
    scope: 'Todo el catálogo',
    validity: 'Permanente (FW25)',
    usageThisMonth: '28 Boutiques ($18.2k prom.)',
    description: 'Compras de 15 a 49 unidades acumuladas o pedidos netos superiores a $150.000 ARS.',
    categories: ['Cintos Cuero Vacuno Curtido Vegetal', 'Collares & Dijes de Autor', 'Herrajes & Hebillas Zamak Premium'],
    accumulativeWithCoupons: false
  },
  {
    id: 'promo-2',
    name: 'Bonificación 100% Envío Correo Argentino / OCA',
    type: 'flete_bonificado',
    benefitType: 'fixed',
    benefitValue: 4200,
    isActive: true,
    minAmount: 200000,
    scope: 'Despacho Nacional Encomienda',
    validity: 'Permanente',
    usageThisMonth: '14 despachos cubiertos',
    description: 'Pedidos mayoristas superiores a $200.000 ARS con confirmación de pago por transferencia bancaria inmediata.',
    categories: ['Todo el catálogo'],
    accumulativeWithCoupons: true
  },
  {
    id: 'promo-3',
    name: 'Cupón Bienvenida Nuevas Boutiques (15% OFF)',
    type: 'cupon',
    benefitType: 'percentage',
    benefitValue: 15,
    isActive: true,
    minUnits: 12,
    code: 'ATELIER-PRIMERA-COMPRA',
    usedCount: 19,
    totalLimit: 50,
    scope: 'Primera orden validada',
    validity: 'Expira: 30 Noviembre 2025',
    usageThisMonth: '19 de 50 disponibles (38%)',
    description: 'Válido exclusivamente para la primera orden. Requiere mínimo 12 unidades y CUIT verificado.',
    categories: ['Cintos Cuero Vacuno Curtido Vegetal', 'Collares & Dijes de Autor'],
    accumulativeWithCoupons: false
  },
  {
    id: 'promo-4',
    name: 'Preventa Pack 24u Cintos Verona (+20% OFF)',
    type: 'pack_especifico',
    benefitType: 'percentage',
    benefitValue: 20,
    isActive: false,
    minUnits: 24,
    scope: 'Pack cerrado Cinto Verona',
    validity: 'Pausada manualmente',
    usageThisMonth: 'Última activación: hace 12 días',
    description: 'Pack cerrado de 24 cinturones cuero flor legítimo con curva balanceada (T85 a T100).',
    categories: ['Cintos Cuero Vacuno Curtido Vegetal'],
    accumulativeWithCoupons: false,
    notes: 'Pausada por límite de capacidad productiva de curtición en taller Córdoba.'
  }
];

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'correo_argentino',
    name: 'Correo Argentino (B2B Paquetería)',
    provider: 'correo_argentino',
    carrierTag: 'Bonificado',
    description: 'A Domicilio o Sucursal oficial en todo el país con seguimiento MiCorreo.',
    price: 4200,
    isFreeOrDiscounted: true,
    discountBadge: 'Bonificado',
    estimatedDays: '3 a 5 días hábiles'
  },
  {
    id: 'oca',
    name: 'OCA Encomiendas Exprés',
    provider: 'oca',
    carrierTag: 'Prioritario',
    description: 'Entrega a puerta de local comercial o retiro en sucursal OCA.',
    price: 5900,
    isFreeOrDiscounted: false,
    discountBadge: 'Prioritario',
    estimatedDays: '24 a 48 hs hábiles'
  },
  {
    id: 'expreso',
    name: 'Expreso / Transporte en CABA (Soldati)',
    provider: 'expreso',
    carrierTag: 'Sin cargo CABA',
    description: 'Despacho sin costo en depósito de tu transporte habitual. Flete destino a abonar en origen/destino.',
    price: 0,
    isFreeOrDiscounted: true,
    discountBadge: 'Sin cargo CABA',
    estimatedDays: 'Despacho en 24hs'
  }
];
