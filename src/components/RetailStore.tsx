import React, { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { ScreenId, CartItem } from '../types';

interface RetailStoreProps {
  onNavigate: (screen: ScreenId) => void;
  cartItems: CartItem[];
  onAddToCart: (product: any, size?: string, color?: string) => void;
  onUpdateCartQty: (id: string, delta: number) => void;
  onRemoveCartItem: (id: string) => void;
}

export const RetailStore: React.FC<RetailStoreProps> = ({
  onNavigate,
  cartItems,
  onAddToCart,
  onUpdateCartQty,
  onRemoveCartItem
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('suela');
  const [postalCode, setPostalCode] = useState<string>('1414');
  const [shippingCalculated, setShippingCalculated] = useState<boolean>(true);

  // Per-card selected size state
  const [cardSizes, setCardSizes] = useState<{ [productId: string]: string }>({
    'cinto-verona': 'T90',
    'cinto-western': 'T90',
    'cinto-milano': 'T90'
  });

  const handleSelectCardSize = (productId: string, size: string) => {
    setCardSizes(prev => ({ ...prev, [productId]: size }));
  };

  // Quantity calculations for discount scale
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  let discountPercent = 0;
  let nextGoalText = 'Agregá 1 producto más para 10% OFF en todo';
  let tierProgress = 33;

  if (totalItemCount === 2) {
    discountPercent = 10;
    nextGoalText = '¡Agregá 1 producto más para 15% OFF total + envío bonificado!';
    tierProgress = 66;
  } else if (totalItemCount >= 3 && totalItemCount <= 4) {
    discountPercent = 15;
    nextGoalText = '¡Agregá productos hasta 5+ para 25% OFF mayorista!';
    tierProgress = 85;
  } else if (totalItemCount >= 5) {
    discountPercent = 25;
    nextGoalText = '¡Máximo beneficio alcanzado: 25% OFF total + Envío Gratis!';
    tierProgress = 100;
  }

  const subtotalRaw = cartItems.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const discountAmount = Math.round(subtotalRaw * (discountPercent / 100));
  const shippingAmount = totalItemCount >= 3 ? 0 : 2950;
  const totalAmount = subtotalRaw - discountAmount + shippingAmount;

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen">
      {/* Banner Superior Editorial */}
      <section className="w-full bg-[#F5EFEB] py-8 sm:py-12 px-4 sm:px-6 lg:px-10 border-b border-[#DDD3C4]/60">
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-[#396752] text-xs font-semibold shadow-xs border border-[#DDD3C4]/50">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="uppercase tracking-wider">Venta Directa de Taller • Sin Mínimos</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1B18] tracking-tight leading-tight">
              Artesanía en Cuero Legítimo y Joyería de Autor
            </h1>
            <p className="text-sm sm:text-base text-[#50443F] max-w-2xl leading-relaxed">
              Comprá 1 pieza individual con precio justo y transparente de origen, o combiná libremente cintos, gargantillas y herrajes para activar <strong className="text-[#5C3D2E] font-bold">descuentos automáticos escalonados</strong>: 2 productos (-10%), 3 productos (-15%), o 5+ productos (-25%) directo en tu bolsa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end text-xs text-[#50443F] font-semibold">
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-[#DDD3C4]/50">
              <span className="material-symbols-outlined text-[#5C3D2E] text-[18px]">local_shipping</span>
              <span>Despacho 24/48hs hábiles</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-[#DDD3C4]/50">
              <span className="material-symbols-outlined text-[#396752] text-[18px]">lock_reset</span>
              <span>3 y 6 Cuotas Sin Interés</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stepper Interactivo de Beneficios por Cantidad */}
      <section className="w-full bg-white py-6 px-4 sm:px-6 lg:px-10 shadow-xs border-b border-[#DDD3C4]/50">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-1">
            <div>
              <span className="text-[10px] text-[#50443F] uppercase tracking-wider font-bold">Escala Progresiva de Ahorro</span>
              <h2 className="text-base font-bold text-[#1F1B18]">Elegí a tu gusto, el descuento se calcula solo</h2>
            </div>
            <span className="text-xs text-[#50443F]">Válido combinando cualquier cinto, dije o accesorio</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Tier 1 */}
            <div className={`p-4 rounded-xl transition-all border ${
              totalItemCount === 1 ? 'bg-[#F5EFEB] border-[#5C3D2E] shadow-sm' : 'bg-[#FAF7F2] border-[#DDD3C4]/60'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-6 h-6 rounded-full bg-white text-[#1F1B18] text-xs font-bold flex items-center justify-center shadow-xs">1</span>
                <span className="text-[10px] uppercase font-bold text-[#50443F]">Individual</span>
              </div>
              <p className="text-sm font-bold text-[#1F1B18] mb-0.5">Precio Directo</p>
              <p className="text-xs text-[#50443F]">Comprá desde 1 sola pieza sin recargos ni registro previo.</p>
            </div>

            {/* Tier 2 */}
            <div className={`p-4 rounded-xl transition-all border ${
              totalItemCount === 2 ? 'bg-[#F5EFEB] border-[#5C3D2E] shadow-sm' : 'bg-[#FAF7F2] border-[#DDD3C4]/60'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-6 h-6 rounded-full bg-[#5C3D2E] text-white text-xs font-bold flex items-center justify-center shadow-xs">2</span>
                <span className="bg-[#5C3D2E]/10 text-[#5C3D2E] px-2 py-0.5 rounded-full text-[10px] font-bold">10% OFF</span>
              </div>
              <p className="text-sm font-bold text-[#1F1B18] mb-0.5">2 Unidades</p>
              <p className="text-xs text-[#50443F]">10% OFF automático en ambas prendas. Ideal para regalo.</p>
            </div>

            {/* Tier 3 (Highlight) */}
            <div className={`p-4 rounded-xl relative overflow-hidden transition-all border ${
              totalItemCount >= 3 && totalItemCount <= 4 ? 'bg-[#EFE8DD] border-[#5C3D2E] shadow-sm ring-2 ring-[#5C3D2E]/20' : 'bg-[#EFE8DD]/70 border-[#DDD3C4]'
            }`}>
              <div className="absolute -top-3 -right-6 bg-[#5C3D2E] text-white text-[9px] font-bold uppercase tracking-wider py-1 px-8 rotate-12 shadow-xs">
                Favorito
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-6 h-6 rounded-full bg-[#5C3D2E] text-white text-xs font-bold flex items-center justify-center shadow-xs">3-4</span>
                <span className="bg-[#5C3D2E] text-white px-2 py-0.5 rounded-full text-[10px] font-bold">15% OFF</span>
              </div>
              <p className="text-sm font-bold text-[#1F1B18] mb-0.5">3 a 4 Unidades</p>
              <p className="text-xs text-[#50443F]">15% OFF en todo + Envío bonificado a sucursal de correo.</p>
            </div>

            {/* Tier 4 */}
            <div className={`p-4 rounded-xl transition-all border ${
              totalItemCount >= 5 ? 'bg-[#EDF3F0] border-[#2F5D48] shadow-sm ring-2 ring-[#2F5D48]/20' : 'bg-[#EDF3F0]/60 border-[#DDD3C4]'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-6 h-6 rounded-full bg-[#2F5D48] text-white text-xs font-bold flex items-center justify-center shadow-xs">5+</span>
                <span className="bg-[#2F5D48] text-white px-2 py-0.5 rounded-full text-[10px] font-bold">25% OFF</span>
              </div>
              <p className="text-sm font-bold text-[#1F1B18] mb-0.5">5 o más Unidades</p>
              <p className="text-xs text-[#2F5D48]">25% OFF total + Envío a domicilio gratis por Correo / OCA.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Split: Products + Floating Bag */}
      <section className="w-full px-4 sm:px-6 lg:px-10 py-8">
        <div className="max-w-[1360px] mx-auto">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#DDD3C4] mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2 pb-1 overflow-x-auto">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  selectedCategory === 'all' ? 'bg-[#1F1B18] text-white' : 'bg-[#F5EFEB] text-[#50443F] hover:bg-[#EFE8DD]'
                }`}
              >
                Todos los productos (28)
              </button>
              <button 
                onClick={() => setSelectedCategory('cintos')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  selectedCategory === 'cintos' ? 'bg-[#1F1B18] text-white' : 'bg-[#F5EFEB] text-[#50443F] hover:bg-[#EFE8DD]'
                }`}
              >
                Cinturones de Cuero Vacuno
              </button>
              <button 
                onClick={() => setSelectedCategory('collares')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  selectedCategory === 'collares' ? 'bg-[#1F1B18] text-white' : 'bg-[#F5EFEB] text-[#50443F] hover:bg-[#EFE8DD]'
                }`}
              >
                Collares &amp; Dijes
              </button>
              <button 
                onClick={() => setSelectedCategory('hebillas')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  selectedCategory === 'hebillas' ? 'bg-[#1F1B18] text-white' : 'bg-[#F5EFEB] text-[#50443F] hover:bg-[#EFE8DD]'
                }`}
              >
                Hebillas y Herrajes
              </button>
              <button 
                onClick={() => onNavigate('estrategia-precios')}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#F5EFEB] text-[#50443F] hover:bg-[#EFE8DD] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-[#5C3D2E]">card_giftcard</span>
                Combos y Sets para Regalar
              </button>
            </div>

            {/* Leather Finishes & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#DDD3C4]/40">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-[#50443F] uppercase tracking-wider font-bold">Acabado:</span>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setSelectedFinish('suela')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs ${
                      selectedFinish === 'suela' ? 'bg-[#EFE8DD] text-[#1F1B18] font-bold border border-[#DDD3C4]' : 'bg-[#F5EFEB] text-[#50443F]'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#d7b189] shadow-inner"></span>
                    <span>Suela Natural</span>
                  </button>
                  <button 
                    onClick={() => setSelectedFinish('negro')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs ${
                      selectedFinish === 'negro' ? 'bg-[#EFE8DD] text-[#1F1B18] font-bold border border-[#DDD3C4]' : 'bg-[#F5EFEB] text-[#50443F]'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#1e1b18] shadow-inner"></span>
                    <span>Negro Mate</span>
                  </button>
                  <button 
                    onClick={() => setSelectedFinish('roble')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs ${
                      selectedFinish === 'roble' ? 'bg-[#EFE8DD] text-[#1F1B18] font-bold border border-[#DDD3C4]' : 'bg-[#F5EFEB] text-[#50443F]'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#5c3726] shadow-inner"></span>
                    <span>Tostado Roble</span>
                  </button>
                  <button 
                    onClick={() => setSelectedFinish('caramelo')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs ${
                      selectedFinish === 'caramelo' ? 'bg-[#EFE8DD] text-[#1F1B18] font-bold border border-[#DDD3C4]' : 'bg-[#F5EFEB] text-[#50443F]'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#a35e38] shadow-inner"></span>
                    <span>Caramelo</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
                <span className="text-[#50443F]">Ordenar por:</span>
                <select className="bg-[#F5EFEB] text-[#1F1B18] font-semibold px-3 py-1.5 rounded-xl border border-[#DDD3C4] outline-none cursor-pointer">
                  <option>Más deseados</option>
                  <option>Novedades de taller</option>
                  <option>Mayor Ahorro por Combo</option>
                  <option>Precio: Menor a Mayor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Products (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PRODUCTS.map(product => {
                const selectedSize = cardSizes[product.id] || 'T90';
                return (
                  <div 
                    key={product.id}
                    className="bg-white rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-[#DDD3C4]/60 group"
                  >
                    <div>
                      {/* Image & Badges */}
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F5EFEB] mb-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-[#1F1B18] px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs">
                          {product.category === 'cintos' ? '100% Cuero Bovino' : 'Baño Dorado 18k'}
                        </span>
                        <span className="absolute top-2.5 right-2.5 bg-[#5C3D2E] text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs">
                          -15% con 3u
                        </span>
                      </div>

                      {/* Info */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-[#82746E]">
                            {product.category === 'cintos' ? 'Marroquinería Premium' : 'Joyería Artesanal'}
                          </span>
                          <div className="flex items-center text-[#7A4700]">
                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-[11px] font-bold ml-0.5">4.9</span>
                          </div>
                        </div>
                        <h3 
                          onClick={() => onNavigate('detalle-producto')}
                          className="text-base font-bold text-[#1F1B18] hover:text-[#5C3D2E] cursor-pointer transition-colors"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#50443F] line-clamp-2">{product.description}</p>
                      </div>

                      {/* Pricing with progressive discount */}
                      <div className="my-3 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4]/50 space-y-1 text-xs">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[#50443F]">Precio 1 unidad:</span>
                          <span className="text-sm font-bold text-[#1F1B18]">${product.retailPrice.toLocaleString('es-AR')} ARS</span>
                        </div>
                        <div className="flex items-center justify-between text-[#2F5D48]">
                          <span className="font-semibold">Llevando 3 en tu bolsa:</span>
                          <span className="font-bold bg-[#EDF3F0] px-1.5 py-0.5 rounded text-[11px]">
                            ${Math.round(product.retailPrice * 0.85).toLocaleString('es-AR')} c/u (-15%)
                          </span>
                        </div>
                      </div>

                      {/* Sizes for belts */}
                      {product.category === 'cintos' && (
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#50443F]">Seleccionar Talle:</span>
                            <span 
                              onClick={() => onNavigate('detalle-producto')}
                              className="text-[#5C3D2E] hover:underline cursor-pointer font-medium"
                            >
                              Guía de talles
                            </span>
                          </div>
                          <div className="grid grid-cols-5 gap-1 text-xs">
                            {['T80', 'T85', 'T90', 'T95', 'T100'].map(sz => (
                              <button
                                key={sz}
                                onClick={() => handleSelectCardSize(product.id, sz)}
                                className={`py-1 rounded-lg font-bold transition-colors ${
                                  selectedSize === sz
                                    ? 'bg-[#1F1B18] text-white shadow-xs'
                                    : 'bg-[#F5EFEB] text-[#50443F] hover:bg-[#EFE8DD]'
                                }`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      <button 
                        onClick={() => onAddToCart(product, selectedSize, 'Suela Natural')}
                        className="flex-1 bg-[#5C3D2E] text-white hover:bg-[#43271A] text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-[0.98]"
                      >
                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                        <span>Agregar a la Bolsa</span>
                      </button>
                      <button 
                        onClick={() => onNavigate('detalle-producto')}
                        className="p-2.5 rounded-xl bg-[#F5EFEB] hover:bg-[#EFE8DD] text-[#1F1B18] transition-colors border border-[#DDD3C4]/60"
                        title="Ver detalle del producto"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Lateral Floating Cart (4 cols) */}
            <aside className="lg:col-span-4 sticky top-28 space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-md border border-[#DDD3C4]">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#DDD3C4]/50">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#5C3D2E] text-[22px]">shopping_bag</span>
                    <h3 className="text-base font-bold text-[#1F1B18]">Tu Bolsa de Compras</h3>
                  </div>
                  <span className="bg-[#F5EFEB] px-2.5 py-0.5 rounded-full text-xs font-bold text-[#1F1B18]">
                    {totalItemCount} prendas
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] my-3 space-y-2 border border-[#DDD3C4]/40">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#2F5D48] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      {discountPercent > 0 ? `${discountPercent}% OFF Aplicado (${totalItemCount}u)` : 'Escala Progresiva'}
                    </span>
                    <span className="text-[#5C3D2E] font-bold">
                      {totalItemCount < 2 ? 'Próximo: 10% OFF' : totalItemCount < 3 ? 'Próximo: 15% OFF' : totalItemCount < 5 ? 'Próximo: 25% OFF' : 'Máximo OFF'}
                    </span>
                  </div>
                  <div className="w-full bg-[#E6DCCF] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#5C3D2E] h-full rounded-full transition-all duration-500" 
                      style={{ width: `${tierProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#50443F] leading-tight">
                    {nextGoalText}
                  </p>
                </div>

                {/* Items in bag */}
                <div className="space-y-3 py-1 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3 p-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4]/50">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-14 h-14 rounded-lg object-cover bg-white shrink-0 border border-[#DDD3C4]/40"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-[#1F1B18] truncate">{item.name}</h4>
                          <button 
                            onClick={() => onRemoveCartItem(item.id)}
                            className="text-[#82746E] hover:text-[#BA1A1A] p-0.5"
                          >
                            <span className="material-symbols-outlined text-[15px]">close</span>
                          </button>
                        </div>
                        <span className="text-[11px] text-[#50443F] block">{item.size} • {item.color}</span>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center bg-white border border-[#DDD3C4] rounded-md px-1 py-0.2">
                            <button 
                              onClick={() => onUpdateCartQty(item.id, -1)}
                              className="w-5 h-5 flex items-center justify-center text-[#50443F] hover:text-[#1F1B18]"
                            >
                              -
                            </button>
                            <span className="px-1.5 text-xs font-bold text-[#1F1B18]">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateCartQty(item.id, 1)}
                              className="w-5 h-5 flex items-center justify-center text-[#50443F] hover:text-[#1F1B18]"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-bold text-[#1F1B18]">
                            ${(item.unitPrice * item.quantity).toLocaleString('es-AR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Estimator */}
                <div className="p-3 rounded-xl bg-[#FAF7F2] mt-3 space-y-2 border border-[#DDD3C4]/40">
                  <span className="text-xs font-bold text-[#1F1B18] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#5C3D2E]">local_shipping</span>
                    Calcular Envío (Correo Argentino / OCA)
                  </span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      placeholder="Tu CP (Ej: 1414)"
                      className="flex-1 bg-white border border-[#DDD3C4] px-2.5 py-1.5 rounded-lg text-xs text-[#1F1B18] outline-none"
                    />
                    <button 
                      onClick={() => setShippingCalculated(true)}
                      className="px-3 py-1.5 rounded-lg bg-[#EFE8DD] text-xs font-bold text-[#1F1B18] hover:bg-[#E6DCCF] transition-colors"
                    >
                      Calcular
                    </button>
                  </div>
                  {shippingCalculated && (
                    <p className="text-[11px] text-[#2F5D48] flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-[14px]">done</span>
                      {totalItemCount >= 3 ? '¡Envío bonificado a sucursal llevando 3+ prendas!' : 'Envío estimado a CABA / GBA: $2.950 ARS'}
                    </p>
                  )}
                </div>

                {/* Totals Breakdown */}
                <div className="pt-4 mt-3 space-y-1.5 border-t border-[#DDD3C4]/60 text-xs">
                  <div className="flex justify-between text-[#50443F]">
                    <span>Subtotal ({totalItemCount} unidades):</span>
                    <span className="font-semibold text-[#1F1B18]">${subtotalRaw.toLocaleString('es-AR')} ARS</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-[#2F5D48] font-bold">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">savings</span>
                        Descuento por Cantidad ({discountPercent}%):
                      </span>
                      <span>-${discountAmount.toLocaleString('es-AR')} ARS</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#50443F]">
                    <span>Envío estimado:</span>
                    <span className="font-semibold text-[#1F1B18]">
                      {shippingAmount === 0 ? 'GRATIS / BONIFICADO' : `$${shippingAmount.toLocaleString('es-AR')} ARS`}
                    </span>
                  </div>
                  <div className="pt-2 flex items-baseline justify-between border-t border-[#DDD3C4]">
                    <div>
                      <span className="text-base font-bold text-[#1F1B18] block">Total:</span>
                      <span className="text-[10px] text-[#50443F]">IVA incluido • Factura A o B</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-[#5C3D2E]">${totalAmount.toLocaleString('es-AR')} ARS</span>
                      {discountAmount > 0 && (
                        <span className="text-[10px] text-[#2F5D48] font-semibold block">
                          Ahorrás ${discountAmount.toLocaleString('es-AR')} en este pedido
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => onNavigate('checkout')}
                  className="w-full mt-4 bg-[#5C3D2E] hover:bg-[#43271A] text-white text-sm font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  <span>Iniciar Compra Segura</span>
                </button>

                <div className="pt-2 flex items-center justify-center gap-3 text-[#82746E] text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">shield</span> Pago Seguro SSL
                  </span>
                  <span>•</span>
                  <span>Cambios Simples 30 días</span>
                </div>
              </div>

              {/* Craft Transparency Box */}
              <div className="p-3.5 rounded-2xl bg-[#F5EFEB] border border-[#DDD3C4] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#5C3D2E] text-[22px] shrink-0">front_hand</span>
                <div className="space-y-0.5">
                  <h5 className="text-xs font-bold text-[#1F1B18]">Oficio de Taller Argentino</h5>
                  <p className="text-[11px] text-[#50443F] leading-relaxed">
                    Cada cinto es confeccionado a pedido con curtido vegetal libre de cromo. No trabajamos con intermediarios comerciales.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Educational FAQ Trio */}
      <section className="w-full bg-[#F5EFEB] py-10 px-4 sm:px-6 lg:px-10 border-t border-[#DDD3C4]/60">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#DDD3C4]/50 space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#5C3D2E] mb-2">
              <span className="material-symbols-outlined text-[20px]">shuffle</span>
            </div>
            <h4 className="text-sm font-bold text-[#1F1B18]">¿Puedo mezclar modelos distintos?</h4>
            <p className="text-xs text-[#50443F] leading-relaxed">
              Sí, absolutamente. Podés llevar 1 cinto para vos, 1 collar para regalar y 1 hebilla de recambio; el sistema sumará automáticamente 3 artículos y te aplicará el 15% OFF en todo.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#DDD3C4]/50 space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#5C3D2E] mb-2">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <h4 className="text-sm font-bold text-[#1F1B18]">Medios de Pago y Financiación</h4>
            <p className="text-xs text-[#50443F] leading-relaxed">
              Aceptamos todas las tarjetas de débito y crédito a través de Mercado Pago y MODO. Además, contás con 10% adicional abonando por Transferencia Bancaria Directa.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#DDD3C4]/50 space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#5C3D2E] mb-2">
              <span className="material-symbols-outlined text-[20px]">package_2</span>
            </div>
            <h4 className="text-sm font-bold text-[#1F1B18]">Packaging Listo para Regalo</h4>
            <p className="text-xs text-[#50443F] leading-relaxed">
              Todos los envíos se despachan en fundas de lienzo de algodón natural estampado con cordón de yute, acompañadas por su tarjeta de autenticidad de cuero argentino.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
