import React, { useState } from 'react';
import { ScreenId, AppMode, CartItem, Product } from './types';
import { PRODUCTS } from './data/mockData';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { WholesaleCatalog } from './components/WholesaleCatalog';
import { OrderValidation } from './components/OrderValidation';
import { ShippingLabel } from './components/ShippingLabel';
import { WholesalePromos } from './components/WholesalePromos';
import { RetailStore } from './components/RetailStore';
import { ProductDetail } from './components/ProductDetail';
import { ShoppingCart } from './components/ShoppingCart';
import { Checkout } from './components/Checkout';
import { TrackingLogistics } from './components/TrackingLogistics';
import { PriceStrategyAdmin } from './components/PriceStrategyAdmin';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('catalogo-mayorista');
  const [mode, setMode] = useState<AppMode>('mayorista');
  const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');
  const [isMobileSimulated, setIsMobileSimulated] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial cart items for demonstration matching Image 13 & 17
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: 'cinto-verona',
      name: 'Cinto Verona Hebilla Oval',
      sku: 'CTV-204-CRM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3t4o5D0Vj_n66E6V78x4Ld5_k78qHlJ0wJ69pD5jC3X3uL_j1k3m2_vB9L-c_rLw5N8X7tPqS-8R1tXyV5Z3fN9_u7_v1t5L6jM7qA-p2x0C3e_F5t8H4q3L9x0P7k1m4T6v9B8x0Q1m4T7v9B9x0L-c_rLw5N8X7tPqS-8R1',
      size: 'T90',
      color: 'Caramelo Natural',
      unitPrice: 20825, // with 15% discount
      originalPrice: 24500,
      quantity: 2,
    },
    {
      id: 'cart-2',
      productId: 'gargantilla-eslabon',
      name: 'Gargantilla Eslabón Baño Oro',
      sku: 'COL-112-ORO',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC13f_mK6xT9l2Y5h7L4p8V2b9x1n3M4j5K6l7P8q9R0s1T2u3V4w5X6y7Z8a9B0c1D2e3F4g5H6i7J8k9L0m1N2o3P4q5R6s7T8u9V0w1X2y3Z4a5B6c7D8e9F0g1H2i3J4k5L6m7N8o9P0q1R2s3T4u5V6w7X8y9Z0a1B2c3D4e5F6g7H8i9J0k1L2m3',
      size: 'Único (45cm + ext)',
      color: 'Dorado 24k Mate',
      unitPrice: 16830, // with 15% discount
      originalPrice: 19800,
      quantity: 1,
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (product: Product | any, size = 'T90', color = 'Caramelo Natural', qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === (product.id || 'cinto-verona') && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + qty } : item);
      }
      const basePrice = product.retailPrice || 24500;
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          productId: product.id || 'cinto-verona',
          name: product.name || 'Cinto Verona Cuero Vacuno',
          sku: `${product.sku || 'CTV-204'}-${size}`,
          image: product.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3t4o5D0Vj_n66E6V78x4Ld5_k78qHlJ0wJ69pD5jC3X3uL_j1k3m2_vB9L-c_rLw5N8X7tPqS-8R1tXyV5Z3fN9_u7_v1t5L6jM7qA-p2x0C3e_F5t8H4q3L9x0P7k1m4T6v9B8x0Q1m4T7v9B9x0L-c_rLw5N8X7tPqS-8R1',
          size,
          color,
          unitPrice: Math.round(basePrice * 0.85),
          originalPrice: basePrice,
          quantity: qty,
        }
      ];
    });
    showToast(`✓ Agregado al carrito: ${product.name || 'Cinto Verona'} (${qty} un.)`);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('Producto eliminado del carrito');
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Sync mode with screen type
  const handleSelectScreen = (screen: ScreenId) => {
    setCurrentScreen(screen);
    if (['catalogo-mayorista', 'validacion-pedido', 'etiqueta-despacho', 'promociones-b2b'].includes(screen)) {
      setMode('mayorista');
    } else {
      setMode('boutique');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'catalogo-mayorista':
        return <WholesaleCatalog onNavigate={handleSelectScreen} currency={currency} />;
      case 'validacion-pedido':
        return <OrderValidation onNavigate={handleSelectScreen} />;
      case 'etiqueta-despacho':
        return <ShippingLabel onNavigate={handleSelectScreen} />;
      case 'promociones-b2b':
        return <WholesalePromos onNavigate={handleSelectScreen} />;
      case 'tienda':
        return (
          <RetailStore 
            onNavigate={handleSelectScreen} 
            cartItems={cartItems} 
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveCartItem={handleRemoveItem}
          />
        );
      case 'detalle-producto':
        return (
          <ProductDetail 
            onNavigate={handleSelectScreen} 
            onAddToCart={handleAddToCart} 
          />
        );
      case 'bolsa':
        return (
          <ShoppingCart 
            onNavigate={handleSelectScreen} 
            cartItems={cartItems} 
            onUpdateCartQty={handleUpdateCartQty} 
            onRemoveCartItem={handleRemoveItem}
            onAddToCart={handleAddToCart}
          />
        );
      case 'checkout':
        return <Checkout onNavigate={handleSelectScreen} />;
      case 'trazabilidad':
        return <TrackingLogistics onNavigate={handleSelectScreen} />;
      case 'estrategia-precios':
        return <PriceStrategyAdmin onNavigate={handleSelectScreen} />;
      default:
        return <WholesaleCatalog onNavigate={handleSelectScreen} currency={currency} />;
    }
  };

  const screenDirectory: { id: ScreenId; label: string; mode: AppMode; num: string }[] = [
    { id: 'catalogo-mayorista', label: 'Catálogo Mayorista', mode: 'mayorista', num: '01' },
    { id: 'validacion-pedido', label: 'Validación Pedido', mode: 'mayorista', num: '02' },
    { id: 'etiqueta-despacho', label: 'Rótulo Despacho', mode: 'mayorista', num: '03' },
    { id: 'promociones-b2b', label: 'Promociones B2B', mode: 'mayorista', num: '04' },
    { id: 'tienda', label: 'Tienda Minorista', mode: 'boutique', num: '05' },
    { id: 'detalle-producto', label: 'Detalle de Artículo', mode: 'boutique', num: '06' },
    { id: 'bolsa', label: 'Bolsa de Compras', mode: 'boutique', num: '07' },
    { id: 'checkout', label: 'Despacho & Pago', mode: 'boutique', num: '08' },
    { id: 'trazabilidad', label: 'Trazabilidad Postal', mode: 'boutique', num: '09' },
    { id: 'estrategia-precios', label: 'Estrategia Precios', mode: 'boutique', num: '10' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1B18] font-sans flex flex-col selection:bg-[#5C3D2E] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F1B18] text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-[#DDD3C4]/30 animate-bounce">
          <span className="material-symbols-outlined text-[#8FA89B] text-base">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navigation
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
        mode={mode}
        onToggleMode={(m) => {
          setMode(m);
          if (m === 'mayorista') handleSelectScreen('catalogo-mayorista');
          else handleSelectScreen('tienda');
        }}
        cartCount={totalCartCount}
        currency={currency}
        onToggleCurrency={setCurrency}
        isMobileSimulated={isMobileSimulated}
        onToggleMobileSimulated={setIsMobileSimulated}
      />

      {/* Floating Fast-Switch Drawer / Quick Bar for Screen Navigation */}
      <aside aria-label="Navegador de Pantallas" className="bg-[#FAF7F2]/90 border-b border-[#DDD3C4] px-4 py-2 sticky top-[89px] z-30 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-bold text-[#82746E]">
            <span className="material-symbols-outlined text-sm text-[#5C3D2E]">layers</span>
            <span className="hidden sm:inline">PANTALLAS DISPONIBLES:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {screenDirectory.map(screen => {
              const isActive = currentScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => handleSelectScreen(screen.id)}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-[#5C3D2E] text-white border-[#5C3D2E] shadow-sm ring-2 ring-[#5C3D2E]/20'
                      : 'bg-white/80 text-[#50443F] border-[#DDD3C4] hover:bg-[#EFE8DD] hover:text-[#43271A]'
                  }`}
                >
                  <span className={`text-[10px] font-mono px-1 py-0.2 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-[#EFE8DD] text-[#6B4226]'}`}>
                    {screen.num}
                  </span>
                  <span>{screen.label}</span>
                </button>
              );
            })}
          </div>
          <div className="shrink-0 hidden lg:flex items-center gap-1.5 text-xs text-[#50443F]">
            <button
              onClick={() => setIsMobileSimulated(!isMobileSimulated)}
              className="px-2 py-1 rounded-lg border border-[#DDD3C4] bg-white text-[11px] font-semibold flex items-center gap-1 hover:bg-[#F5EFEB]"
              title="Cambiar entre vista móvil y pantalla completa"
            >
              <span className="material-symbols-outlined text-xs">
                {isMobileSimulated ? 'desktop_windows' : 'phone_iphone'}
              </span>
              <span>{isMobileSimulated ? 'Ver Escritorio' : 'Marco Móvil'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center w-full">
        {isMobileSimulated ? (
          <div className="w-full flex justify-center py-6 px-4 bg-[#EFE8DD]/40 min-h-screen">
            <div className="w-full max-w-[440px] bg-[#FAF7F2] rounded-[40px] shadow-[0_25px_60px_-15px_rgba(67,39,26,0.3)] border-[8px] border-[#2B231F] overflow-hidden flex flex-col relative transition-all">
              {/* Phone Speaker Notch */}
              <div className="w-full bg-[#2B231F] h-6 flex items-center justify-center shrink-0">
                <div className="w-24 h-4 bg-black rounded-b-xl flex items-center justify-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-neutral-700"></div>
                  <div className="w-8 h-1 rounded-full bg-neutral-800"></div>
                </div>
              </div>

              {/* Status bar */}
              <div className="bg-[#FAF7F2] px-6 py-2 flex items-center justify-between text-[11px] font-semibold text-[#50443F] shrink-0 border-b border-[#DDD3C4]/30">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[13px]">signal_cellular_4_bar</span>
                  <span className="material-symbols-outlined text-[13px]">wifi</span>
                  <span className="material-symbols-outlined text-[13px]">battery_full</span>
                </div>
              </div>

              {/* Mobile Viewport Content */}
              <div className="flex-1 overflow-y-auto w-full">
                {renderActiveScreen()}
              </div>

              {/* Home indicator bar */}
              <div className="bg-[#FAF7F2] py-2 flex justify-center shrink-0 border-t border-[#DDD3C4]/30">
                <div className="w-32 h-1 bg-[#2B231F]/40 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex-1">
            {renderActiveScreen()}
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer mode={mode} onNavigate={handleSelectScreen} />
    </div>
  );
}
