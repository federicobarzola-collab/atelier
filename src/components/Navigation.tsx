import React, { useState } from 'react';
import { ScreenId, AppMode } from '../types';

interface NavigationProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  mode: AppMode;
  onToggleMode: (mode: AppMode) => void;
  cartCount: number;
  currency: 'ARS' | 'USD';
  onToggleCurrency: (curr: 'ARS' | 'USD') => void;
  isMobileSimulated: boolean;
  onToggleMobileSimulated: (val: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onSelectScreen,
  mode,
  onToggleMode,
  cartCount,
  currency,
  onToggleCurrency,
  isMobileSimulated,
  onToggleMobileSimulated
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const screens: { id: ScreenId; label: string; mode: AppMode; icon: string; badge?: string }[] = [
    { id: 'catalogo-mayorista', label: 'Catálogo Mayorista', mode: 'mayorista', icon: 'storefront' },
    { id: 'validacion-pedido', label: 'Validación Pedido', mode: 'mayorista', icon: 'shopping_cart_checkout', badge: 'PO #884' },
    { id: 'etiqueta-despacho', label: 'Rótulo & Despacho', mode: 'mayorista', icon: 'label', badge: '10x15cm' },
    { id: 'promociones-b2b', label: 'Promociones B2B', mode: 'mayorista', icon: 'tune' },
    { id: 'tienda', label: 'Colección & Tienda', mode: 'boutique', icon: 'shopping_bag' },
    { id: 'detalle-producto', label: 'Detalle Artículo', mode: 'boutique', icon: 'visibility', badge: 'Verona' },
    { id: 'bolsa', label: 'Bolsa de Compras', mode: 'boutique', icon: 'shopping_basket', badge: `${cartCount}` },
    { id: 'checkout', label: 'Despacho & Pago', mode: 'boutique', icon: 'credit_card' },
    { id: 'trazabilidad', label: 'Trazabilidad Postal', mode: 'boutique', icon: 'local_shipping', badge: 'GPS' },
    { id: 'estrategia-precios', label: 'Estrategia Precios', mode: 'boutique', icon: 'price_change' }
  ];

  return (
    <header className="sticky top-0 w-full z-40 bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#DDD3C4]/60 shadow-[0_1px_8px_rgba(67,39,26,0.04)]">
      {/* Top Bar Announcement */}
      <div className="bg-[#EDF3F0] border-b border-[#DDD3C4]/40 py-1 px-4 text-center">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between text-[11px] text-[#2F5D48] font-semibold tracking-wide">
          <span className="hidden sm:inline">Despachos en 48hs hábiles a toda la República Argentina</span>
          <span className="mx-auto sm:mx-0">
            {mode === 'mayorista'
              ? 'Mínimo de compra: $50.000 / 12 un. • Envíos a todo el país • IVA discriminado'
              : 'Envíos a todo el país • Compra minorista sin mínimo • Llevando 3 o más prendas: 15% OFF automático'}
          </span>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D48] animate-pulse"></span>
            <span>Taller Abierto</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div 
            onClick={() => onSelectScreen(mode === 'mayorista' ? 'catalogo-mayorista' : 'tienda')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdwQ6DO952q2Cm-BSz2QhQ0ShRZYCL7_RLTWUhiOC0K8wxwrNe_eUjgNjpUXqlEo7eEvoL3PM5JZsZDPXZ-jCVhykBm34njYBGX0c-Qh2TRN8aHeIZ_TnqNTk4gUlWxIdvFo6tnwXUl7CsongO_ONxINNzP7rLR8PysWORLWG2GYr1qRwTv1HJypjyUr0P1txmseeb_aIhIluzAdEoMkVgMprXed2ieFfw6SF-v_LqjTlydvy0KTo" 
              alt="Tierra Atelier" 
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#43271A] leading-tight">TIERRA ATELIER</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#6B4226]">
                {mode === 'mayorista' ? 'Wholesale Studio B2B' : 'Marroquinería & Joyería'}
              </span>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-2">
            <div className="w-full flex items-center bg-[#F5EFEB] border border-[#DDD3C4] px-3 py-1.5 rounded-xl focus-within:ring-1 focus-within:ring-[#5C3D2E]">
              <span className="material-symbols-outlined text-[#82746E] text-base mr-2">search</span>
              <input 
                type="text" 
                placeholder="Buscar por SKU, cintos, collares, herrajes..."
                className="w-full bg-transparent text-xs text-[#1F1B18] placeholder:text-[#82746E] outline-none"
              />
            </div>
          </div>

          {/* Controls: Mode Switch, Mobile View Simulator, Currency, Cart, Profile */}
          <div className="flex items-center gap-2">
            {/* Mode Switcher pill */}
            <div className="flex items-center bg-[#EFE8DD] p-0.5 rounded-xl border border-[#DDD3C4]">
              <button
                onClick={() => {
                  onToggleMode('mayorista');
                  if (['tienda', 'detalle-producto', 'bolsa', 'checkout'].includes(currentScreen)) {
                    onSelectScreen('catalogo-mayorista');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  mode === 'mayorista'
                    ? 'bg-[#5C3D2E] text-white shadow-sm'
                    : 'text-[#50443F] hover:text-[#43271A]'
                }`}
              >
                Mayorista B2B
              </button>
              <button
                onClick={() => {
                  onToggleMode('boutique');
                  if (['catalogo-mayorista', 'validacion-pedido', 'etiqueta-despacho', 'promociones-b2b'].includes(currentScreen)) {
                    onSelectScreen('tienda');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  mode === 'boutique'
                    ? 'bg-[#5C3D2E] text-white shadow-sm'
                    : 'text-[#50443F] hover:text-[#43271A]'
                }`}
              >
                Boutique / Tienda
              </button>
            </div>

            {/* Mobile View Toggle */}
            <button
              onClick={() => onToggleMobileSimulated(!isMobileSimulated)}
              title={isMobileSimulated ? "Cambiar a pantalla completa" : "Simular vista móvil"}
              className={`p-1.5 rounded-xl border transition-all flex items-center gap-1 text-xs font-semibold ${
                isMobileSimulated
                  ? 'bg-[#2F5D48] text-white border-[#2F5D48]'
                  : 'bg-[#F5EFEB] border-[#DDD3C4] text-[#50443F] hover:bg-[#EFE8DD]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isMobileSimulated ? 'stay_current_portrait' : 'devices'}
              </span>
              <span className="hidden xl:inline">{isMobileSimulated ? 'Móvil' : 'Desktop'}</span>
            </button>

            {/* Currency Switcher */}
            <div className="flex items-center bg-[#F5EFEB] border border-[#DDD3C4] rounded-xl p-0.5 text-xs">
              <button
                onClick={() => onToggleCurrency('ARS')}
                className={`px-2 py-0.5 rounded-lg font-bold ${
                  currency === 'ARS' ? 'bg-white shadow-xs text-[#5C3D2E]' : 'text-[#82746E]'
                }`}
              >
                ARS
              </button>
              <button
                onClick={() => onToggleCurrency('USD')}
                className={`px-2 py-0.5 rounded-lg font-bold ${
                  currency === 'USD' ? 'bg-white shadow-xs text-[#5C3D2E]' : 'text-[#82746E]'
                }`}
              >
                USD
              </button>
            </div>

            {/* Cart button */}
            <button
              onClick={() => onSelectScreen(mode === 'mayorista' ? 'validacion-pedido' : 'bolsa')}
              className="relative p-2 rounded-xl text-[#43271A] hover:bg-[#EFE8DD] transition-colors"
              title="Ver Bolsa / Carrito"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              <span className="absolute -top-0.5 -right-0.5 bg-[#5C3D2E] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            </button>

            {/* Profile Avatar */}
            <div 
              onClick={() => onSelectScreen(mode === 'mayorista' ? 'validacion-pedido' : 'checkout')}
              className="w-8 h-8 rounded-full overflow-hidden border border-[#DDD3C4] cursor-pointer shadow-xs hover:ring-2 hover:ring-[#5C3D2E]/20"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvYGQIuScIh2TGPADwepCPSMxU4zx9mN2jUmSeO0VdUgcUBtpt96BbV9bJQr5twouaVWzXjN1aXnHW7DCws_VZNhKXExMJUWWVW4yVI1b3qdiPggm2-glg-V7OHPrGIs6jpYSgj5JbLvTzwEs56kgz4ZL4vS8PzX04K_P_X-9rMOh2KFqlCLsqFRY-Lb6BQTO12qjm06ixexRj5WG9uZVaIN3csD-EkZ5FkhjeYFvrrQ8HHk_VHmY" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Screen Selector Bar (Tabs / Carousel) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-0.5 no-scrollbar border-t border-[#DDD3C4]/50 mt-2">
          <span className="text-[10px] font-bold text-[#82746E] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">view_carousel</span>
            Pantallas:
          </span>
          {screens.map(screen => {
            const isActive = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => onSelectScreen(screen.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#5C3D2E] text-white font-bold shadow-sm'
                    : 'bg-[#F5EFEB] text-[#50443F] hover:bg-[#EFE8DD] hover:text-[#1F1B18] border border-[#DDD3C4]/60'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{screen.icon}</span>
                <span>{screen.label}</span>
                {screen.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#E6DCCF] text-[#43271A]'
                  }`}>
                    {screen.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
