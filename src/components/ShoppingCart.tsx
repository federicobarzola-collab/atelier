import React, { useState } from 'react';
import { ScreenId, CartItem } from '../types';

interface ShoppingCartProps {
  onNavigate: (screen: ScreenId) => void;
  cartItems: CartItem[];
  onUpdateCartQty: (id: string, delta: number) => void;
  onRemoveCartItem: (id: string) => void;
  onAddToCart: (product: any, size?: string, color?: string) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  onNavigate,
  cartItems,
  onUpdateCartQty,
  onRemoveCartItem,
  onAddToCart
}) => {
  const [shippingType, setShippingType] = useState<'home' | 'branch'>('home');
  const [postalCode, setPostalCode] = useState('1414 - Palermo, CABA');
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [userPhone, setUserPhone] = useState('11 5824-9102');

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  let discountPercent = 0;
  let tierProgress = 25;
  let nextUpsellText = '¡Sumá 1 accesorio más para desbloquear 10% OFF en tu orden!';

  if (totalCount === 2) {
    discountPercent = 10;
    tierProgress = 50;
    nextUpsellText = '¡Sumá 1 accesorio más para desbloquear 15% OFF total en tu orden!';
  } else if (totalCount >= 3 && totalCount <= 4) {
    discountPercent = 15;
    tierProgress = 75;
    nextUpsellText = '¡Sumá prendas hasta 5+ para desbloquear 25% OFF + Envío Gratis!';
  } else if (totalCount >= 5) {
    discountPercent = 25;
    tierProgress = 100;
    nextUpsellText = '¡Alcanzaste el beneficio máximo de 25% OFF total!';
  }

  const subtotalRaw = cartItems.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const discountAmount = Math.round(subtotalRaw * (discountPercent / 100));
  const shippingCost = totalCount >= 3 ? 0 : 3800;
  const totalFinal = subtotalRaw - discountAmount + shippingCost;

  const handleAddUpsell = () => {
    onAddToCart({
      id: 'cinto-milano-upsell',
      name: 'Cinto Milano Doble Anilla',
      sku: 'CTM-112',
      retailPrice: 22000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ92IZErRjqQCkpVU2CeovICfnYuNkOJEmYNwTxOBOAVjxrh4Mys_8OCMNgCrssrgLTlgNH8Gvc2EshzpUjqxlhzc1IBldd0JOZIX_oiR-qYzjroZYggN--xEykj7R9NVFYHj2JTa1E_Ht0lt5OGisYrdQyd0-FCfDiAm6ymbISvlvcvUzLRg9bZFRw6KVtqn-i5hWQ7DeG1NWZ0X1O5AwihsQ3k1mFSuhLTq9zR3s4ExsIrN8Fhc'
    }, 'T90', 'Chocolate');
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-4 space-y-4">
      {/* Progress Milestone Card */}
      <section className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="material-symbols-outlined text-[#5C3D2E] text-[20px]">stars</span>
          <span className="text-base font-bold text-[#1F1B18]">Escalera de Ahorro</span>
          <span className="ml-auto bg-[#EDF3F0] text-[#2F5D48] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-[#2F5D48]/20">
            {discountPercent > 0 ? `${discountPercent}% OFF Activo` : 'Sin Descuento'}
          </span>
        </div>
        <p className="text-xs text-[#50443F] mb-3">
          {nextUpsellText}
        </p>

        {/* Visual Tier Bar */}
        <div className="relative w-full mb-2 pt-1">
          <div className="w-full bg-[#E6DCCF] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#5C3D2E] h-full rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${tierProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-start mt-2">
            {/* Milestone 1 */}
            <div className="flex flex-col items-center w-1/3 text-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-xs mb-1 font-bold ${
                totalCount >= 2 ? 'bg-[#5C3D2E] text-white' : 'bg-[#E6DCCF] text-[#82746E]'
              }`}>
                {totalCount >= 2 ? <span className="material-symbols-outlined text-[13px]">check</span> : '2'}
              </div>
              <span className="text-[11px] text-[#1F1B18] font-bold">2 items</span>
              <span className="text-[10px] text-[#2F5D48] font-bold">10% OFF</span>
            </div>

            {/* Milestone 2 */}
            <div className="flex flex-col items-center w-1/3 text-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-xs mb-1 font-bold ${
                totalCount >= 3 ? 'bg-[#5C3D2E] text-white' : 'bg-[#E6DCCF] text-[#82746E]'
              }`}>
                {totalCount >= 3 ? <span className="material-symbols-outlined text-[13px]">check</span> : '3'}
              </div>
              <span className="text-[11px] text-[#1F1B18] font-bold">3 items</span>
              <span className="text-[10px] text-[#5C3D2E] font-bold">15% OFF</span>
            </div>

            {/* Milestone 3 */}
            <div className="flex flex-col items-center w-1/3 text-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-xs mb-1 font-bold ${
                totalCount >= 5 ? 'bg-[#2F5D48] text-white' : 'bg-[#E6DCCF] text-[#82746E]'
              }`}>
                {totalCount >= 5 ? <span className="material-symbols-outlined text-[13px]">check</span> : '5'}
              </div>
              <span className="text-[11px] text-[#50443F]">5+ items</span>
              <span className="text-[10px] text-[#82746E] font-bold">25% + Envío</span>
            </div>
          </div>
        </div>
      </section>

      {/* Items in Bag */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-[#1F1B18]">Artículos en la Bolsa</h2>
          <span className="text-xs text-[#50443F] font-semibold">{totalCount} seleccionados</span>
        </div>

        {cartItems.map(item => (
          <article key={item.id} className="bg-white rounded-2xl p-3 shadow-xs border border-[#DDD3C4] flex gap-3 relative">
            <div className="w-18 h-22 rounded-xl bg-[#FAF7F2] overflow-hidden shrink-0 relative border border-[#DDD3C4]/60">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <span className="absolute bottom-1 left-1 bg-white/90 px-1 py-0.5 rounded text-[8px] uppercase tracking-wider font-bold text-[#1F1B18]">
                {item.color}
              </span>
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0 pr-6">
              <div>
                <h3 className="text-xs font-bold text-[#1F1B18] truncate">{item.name}</h3>
                <p className="text-[11px] text-[#50443F]">{item.size} • {item.color}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-[#5C3D2E]">
                  ${(item.originalPrice * (1 - discountPercent / 100)).toLocaleString('es-AR')}
                </span>
                <span className="text-[10px] text-[#82746E] line-through">
                  ${item.originalPrice.toLocaleString('es-AR')}
                </span>
                {discountPercent > 0 && (
                  <span className="bg-[#EDF3F0] text-[#2F5D48] text-[9px] px-1.5 py-0.2 rounded font-bold">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center bg-[#F5EFEB] rounded-lg px-1.5 py-0.5 border border-[#DDD3C4]/60">
                  <button 
                    onClick={() => onUpdateCartQty(item.id, -1)}
                    className="w-6 h-6 flex items-center justify-center text-[#50443F] hover:text-[#1F1B18]"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="text-xs font-bold px-2 text-[#1F1B18]">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateCartQty(item.id, 1)}
                    className="w-6 h-6 flex items-center justify-center text-[#50443F] hover:text-[#1F1B18]"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
                <span className="text-[11px] text-[#50443F]">
                  Subtotal: ${(item.originalPrice * (1 - discountPercent / 100) * item.quantity).toLocaleString('es-AR')}
                </span>
              </div>
            </div>
            <button 
              onClick={() => onRemoveCartItem(item.id)}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center text-[#82746E] hover:text-[#BA1A1A] transition-colors"
              title="Eliminar producto"
            >
              <span className="material-symbols-outlined text-[18px]">delete_outline</span>
            </button>
          </article>
        ))}
      </section>

      {/* Suggestion Upsell Card */}
      <section className="bg-[#F5EFEB] rounded-2xl p-3.5 border border-[#DDD3C4] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#5C3D2E] text-[18px]">auto_awesome</span>
            <span className="text-xs font-bold text-[#1F1B18]">Completá tu Promo (Agregá 1 más)</span>
          </div>
          <span className="bg-[#5C3D2E]/10 text-[#5C3D2E] text-[10px] px-2 py-0.5 rounded-full font-bold">
            Ahorrás +$6.500
          </span>
        </div>
        <div className="bg-white rounded-xl p-2.5 flex items-center gap-3 border border-[#DDD3C4]/60">
          <div className="w-14 h-16 rounded-lg bg-[#FAF7F2] overflow-hidden shrink-0 border border-[#DDD3C4]/50">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ92IZErRjqQCkpVU2CeovICfnYuNkOJEmYNwTxOBOAVjxrh4Mys_8OCMNgCrssrgLTlgNH8Gvc2EshzpUjqxlhzc1IBldd0JOZIX_oiR-qYzjroZYggN--xEykj7R9NVFYHj2JTa1E_Ht0lt5OGisYrdQyd0-FCfDiAm6ymbISvlvcvUzLRg9bZFRw6KVtqn-i5hWQ7DeG1NWZ0X1O5AwihsQ3k1mFSuhLTq9zR3s4ExsIrN8Fhc" 
              alt="Cinto Milano Doble Anilla" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#1F1B18] truncate">Cinto Milano Doble Anilla</h4>
            <p className="text-[11px] text-[#50443F] truncate">Cuero Chocolate • Regulable</p>
            <p className="text-xs text-[#1F1B18] mt-0.5">
              +$18.700 <span className="text-[10px] text-[#2F5D48] font-bold">llevando el pack</span>
            </p>
          </div>
          <button 
            onClick={handleAddUpsell}
            className="bg-[#5C3D2E] hover:bg-[#43271A] text-white text-[11px] font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1 shrink-0 shadow-xs"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            <span>Sumar y 15% OFF</span>
          </button>
        </div>
      </section>

      {/* Shipping & Delivery Selection */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#DDD3C4] space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#2F5D48] text-[20px]">local_shipping</span>
          <h3 className="text-sm font-bold text-[#1F1B18]">Envío y Entrega Nacional</h3>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 gap-2 bg-[#F5EFEB] p-1 rounded-xl">
          <button
            onClick={() => setShippingType('home')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              shippingType === 'home'
                ? 'bg-white text-[#1F1B18] shadow-xs'
                : 'text-[#50443F]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>A Domicilio</span>
          </button>
          <button
            onClick={() => setShippingType('branch')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              shippingType === 'branch'
                ? 'bg-white text-[#1F1B18] shadow-xs'
                : 'text-[#50443F]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">storefront</span>
            <span>Sucursal OCA/Correo</span>
          </button>
        </div>

        {/* Postal Code Input */}
        <div className="space-y-1.5">
          <label className="text-xs text-[#50443F] font-semibold">Código Postal de Destino</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DDD3C4] text-[#1F1B18] text-xs rounded-xl px-3 py-2 outline-none"
              />
              <span className="material-symbols-outlined absolute right-2.5 top-2 text-[#2F5D48] text-[18px]">check_circle</span>
            </div>
            <button 
              onClick={() => alert('Código postal validado')}
              className="bg-[#EFE8DD] text-[#43271A] text-xs font-bold px-3 py-2 rounded-xl border border-[#DDD3C4]"
            >
              Cambiar
            </button>
          </div>
          <div className="flex items-center justify-between text-xs bg-[#FAF7F2] p-2.5 rounded-xl border border-[#DDD3C4]/50">
            <div className="flex items-center gap-1.5 text-[#50443F]">
              <span className="material-symbols-outlined text-[16px] text-[#2F5D48]">schedule</span>
              <span>Correo Argentino Clásico (3 a 5 días)</span>
            </div>
            <span className="font-bold text-[#1F1B18]">
              {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toLocaleString('es-AR')}`}
            </span>
          </div>
        </div>

        {/* WhatsApp Tracking Notification */}
        <div className="pt-2 border-t border-[#DDD3C4]/40 space-y-2">
          <label className="flex items-start gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={whatsappAlerts}
              onChange={e => setWhatsappAlerts(e.target.checked)}
              className="mt-0.5 accent-[#5C3D2E] w-4 h-4 rounded" 
            />
            <span className="text-xs text-[#1F1B18]">Quiero recibir el seguimiento de despacho y entrega por WhatsApp</span>
          </label>
          <div className="flex items-center bg-[#FAF7F2] border border-[#DDD3C4] rounded-xl px-3 py-2 gap-2 text-xs">
            <span className="text-[#82746E] font-semibold">+54 9</span>
            <input 
              type="tel" 
              value={userPhone}
              onChange={e => setUserPhone(e.target.value)}
              className="bg-transparent text-[#1F1B18] flex-1 outline-none font-medium"
            />
            <span className="material-symbols-outlined text-[#2F5D48] text-[18px]">chat</span>
          </div>
        </div>
      </section>

      {/* Resumen del Pedido */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#DDD3C4] space-y-2 text-xs">
        <h3 className="text-sm font-bold text-[#1F1B18] mb-1">Resumen del Pedido</h3>
        <div className="flex justify-between text-[#50443F]">
          <span>Subtotal ({totalCount} accesorios)</span>
          <span className="font-semibold text-[#1F1B18]">${subtotalRaw.toLocaleString('es-AR')}</span>
        </div>
        {discountPercent > 0 && (
          <div className="flex justify-between text-[#2F5D48] font-bold">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">percent</span>
              Descuento por Cantidad ({discountPercent}% OFF)
            </span>
            <span>-${discountAmount.toLocaleString('es-AR')}</span>
          </div>
        )}
        <div className="flex justify-between text-[#50443F]">
          <span>Envío Nacional (Correo Argentino)</span>
          <span className="font-semibold text-[#1F1B18]">
            {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toLocaleString('es-AR')}`}
          </span>
        </div>
        <div className="h-[1px] bg-[#DDD3C4]/60 my-1"></div>
        <div className="flex justify-between items-baseline pt-1">
          <div>
            <span className="text-base font-bold text-[#1F1B18] block">Total Final</span>
            {discountAmount > 0 && (
              <span className="text-[10px] text-[#2F5D48] font-bold">
                Te ahorraste ${discountAmount.toLocaleString('es-AR')} en este pedido
              </span>
            )}
          </div>
          <span className="text-2xl font-bold text-[#1F1B18] tracking-tight">
            ${totalFinal.toLocaleString('es-AR')}
          </span>
        </div>

        {/* Payment Perk Badge */}
        <div className="mt-2 bg-[#FAF7F2] border border-[#DDD3C4]/60 rounded-xl p-3 flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#5C3D2E] text-[20px] shrink-0">credit_card</span>
          <div className="text-[11px] text-[#50443F]">
            <span className="font-bold text-[#1F1B18] block">Hasta 3 cuotas sin interés</span>
            <span>o <strong>10% OFF extra</strong> pagando por Transferencia Bancaria</span>
          </div>
        </div>
      </section>

      {/* Continue CTA */}
      <div className="space-y-2 pt-1">
        <button 
          onClick={() => onNavigate('checkout')}
          className="w-full bg-[#5C3D2E] hover:bg-[#43271A] text-white text-sm font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[20px]">lock</span>
          <span>Continuar al Checkout Seguro</span>
        </button>

        <div className="flex items-center justify-center gap-2 text-[#82746E] text-[10px] text-center">
          <span className="material-symbols-outlined text-[14px]">verified_user</span>
          <span>Compra protegida • Factura directa de Taller • Garantía Tierra Atelier</span>
        </div>
      </div>
    </div>
  );
};
