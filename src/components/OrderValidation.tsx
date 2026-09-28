import React, { useState } from 'react';
import { ScreenId } from '../types';

interface OrderValidationProps {
  onNavigate: (screen: ScreenId) => void;
}

export const OrderValidation: React.FC<OrderValidationProps> = ({ onNavigate }) => {
  const [shippingMethod, setShippingMethod] = useState<'correo_argentino' | 'oca' | 'expreso'>('correo_argentino');
  const [deliveryPreference, setDeliveryPreference] = useState<'domicilio' | 'sucursal'>('domicilio');
  const [whatsappTracking, setWhatsappTracking] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Form fields
  const [recipientName, setRecipientName] = useState('Camila Rossi - Atelier Boutique');
  const [taxId, setTaxId] = useState('27-38491024-4');
  const [phone, setPhone] = useState('11 5842-9912');
  const [address, setAddress] = useState('Av. Santa Fe 3245, Local 4');
  const [city, setCity] = useState('Rosario');
  const [postalCode, setPostalCode] = useState('S2000');
  const [province, setProvince] = useState('Santa Fe');
  const [notes, setNotes] = useState('Horario boutique 10 a 19 hs. Timbre blanco.');

  // Quantities & items
  const [items, setItems] = useState([
    {
      id: 'item-1',
      name: 'Cinto Verona Cuero Genuino',
      sku: 'CTV-204',
      packText: 'Pack 10 unidades',
      price: 64000,
      unitPrice: 6400,
      curve: ['4× Negro 90', '4× Suela 95', '2× Tostado 85'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYoWPK5NQ0FwK208T2wWkj94pW1wOUJ-xjH_v_-nBfZb6zHwHPCW_ZLZqaQ-n5P87MyvH0zq4PaAgqFC92DvqCCtNJS8xl-KOI-atdDtW0uIik678a06FzxhNbocxDP50S9O-2ZV4F7_w-NV9GRO7E2-fXOlRSWx4FnHNDufsGbZX59QLQ3jKeNj4Z-7xxhPctvc50JOtvEg3ueGOHIXA5aQAkRBET2fOaR-9KPmS3y4IIsqoyxr4'
    },
    {
      id: 'item-2',
      name: 'Collar Atenea Eslabón',
      sku: 'COL-819',
      packText: 'Lote 6 unidades',
      price: 32400,
      unitPrice: 5400,
      specText: 'Surtido equilibrado de fábrica (6 un.)',
      badge: 'Baño Dorado 18k',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFoEFKTBjgcYGr6r6nKA_mHj_oFnSVHtPamv7Hm96_IOF0b4FVBsAJtiJs-lvzErAmjVmcNH154K3HQz79EZAMkEVPsNXwsNsJOGyVCc803BX454bEJM8JwfGb8yUc72Z9WvB-bKKAA1kxvPBNl7wja3C8COEAPSRpTIGukjvIQ8pR8jHXL6K43wtixPAksaVMrVWUmG-Wu5171fUCtqQ3THlmo34y5FshQgqEjjGFLHfnZeQ2hE'
    },
    {
      id: 'item-3',
      name: 'Cinto Milano Doble Anilla',
      sku: 'CTM-112',
      packText: '3 unidades',
      price: 20400,
      unitPrice: 6800,
      specText: '3× Caramelo Talla Única Regulable',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOI1F-8dQnyBRtLi1M9tRJj0_re_R42adsncP5Z0bcjn6YAw2fwU9OdiaTHhetDHyTNm-4wDkiHiLTItQ9yqRYfZLeByrX43ziLNpX2geqC9sVy7kKErmL5UnvlrnwxPd692umY0Ye75jlZMMZ5ltdeD4Q4kPItzt4hM4-KiMWCl2VUYI4pdwY5TfbOd7SLF9Ccg0WLpcUeQwHPAa5o0iRYcZpkRu3Bn62a5IUlFOI3DyZQz0K7sE'
    }
  ]);

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleConfirmOrder = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setIsConfirmed(true);
    }, 1200);
  };

  const shippingCost = shippingMethod === 'correo_argentino' ? 4200 : shippingMethod === 'oca' ? 5900 : 0;
  const subtotalBruto = 170600;
  const descuentoVolumen = 18200;
  const subtotalNeto = subtotalBruto - descuentoVolumen; // 152400
  const iva = 32004;
  const totalFinal = subtotalNeto + iva; // 184404

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-4">
      {/* Header Contextual Mayorista */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-[#6B4226] text-2xl">shopping_cart_checkout</span>
          <h1 className="text-xl font-bold text-[#1F1B18]">Validación de Pedido</h1>
        </div>
        <span className="text-xs bg-[#EFE8DD] border border-[#DDD3C4] px-2.5 py-1 rounded-full text-[#50443F] uppercase tracking-wider font-bold">
          PO #2024-884
        </span>
      </div>

      {/* Barra de Validación de Condiciones Mayoristas */}
      <div className="bg-[#EDF3F0] border border-[#DDD3C4] rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[#2F5D48] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="text-sm font-bold text-[#2F5D48]">Condición Mayorista Aprobada</span>
          </div>
          <span className="bg-[#2F5D48] text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
            Habilitado
          </span>
        </div>

        {/* Progress Tracker Bars */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-xs text-[#50443F]">Monto mínimo ($50.000)</span>
            <span className="text-xs font-bold text-[#2F5D48]">
              $152.400 <span className="text-[#50443F] font-normal">/ $50.000</span>
            </span>
          </div>
          <div className="w-full bg-[#DDD3C4] h-2.5 rounded-full overflow-hidden">
            <div className="bg-[#2F5D48] h-full rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-white/80 border border-[#DDD3C4]/60 p-2.5 rounded-xl flex flex-col justify-center">
            <span className="text-[11px] text-[#50443F] font-medium">Unidades Requeridas</span>
            <span className="text-sm font-bold text-[#1F1B18]">
              19 un. <span className="text-xs text-[#2F5D48] font-normal">(Mín. 12)</span>
            </span>
          </div>
          <div className="bg-white/80 border border-[#DDD3C4]/60 p-2.5 rounded-xl flex flex-col justify-center">
            <span className="text-[11px] text-[#50443F] font-medium">Beneficio Escala</span>
            <span className="text-sm font-bold text-[#2F5D48]">
              -12% OFF <span className="text-[11px] text-[#50443F] font-normal">(Lote &gt;15 un.)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Lista de Ítems del Pedido Mayorista */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1F1B18]">Artículos en Orden ({items.length})</h2>
          <span 
            onClick={() => onNavigate('catalogo-mayorista')}
            className="text-xs text-[#6B4226] underline cursor-pointer font-semibold"
          >
            Reordenar matriz
          </span>
        </div>

        {items.map(item => (
          <div key={item.id} className="bg-white border border-[#DDD3C4] p-4 rounded-2xl shadow-sm space-y-3 relative">
            <div className="flex gap-3">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#DDD3C4]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-sm font-bold text-[#1F1B18] truncate">{item.name}</h3>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-[#82746E] hover:text-[#BA1A1A] transition-colors p-1"
                    title="Eliminar ítem"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
                <p className="text-xs text-[#50443F] mt-0.5">SKU: {item.sku} • {item.packText}</p>
                <div className="flex items-baseline space-x-2 mt-1.5">
                  <span className="text-base font-bold text-[#1F1B18]">${item.price.toLocaleString('es-AR')}</span>
                  <span className="text-xs text-[#50443F]">(${item.unitPrice.toLocaleString('es-AR')} c/u)</span>
                </div>
              </div>
            </div>

            {/* Curva de Talles o Surtido */}
            {item.curve && (
              <div className="bg-[#F5EFEB] border border-[#DDD3C4]/60 p-2.5 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#50443F] font-bold uppercase tracking-wider">Curva Asignada</span>
                  <button 
                    onClick={() => onNavigate('catalogo-mayorista')}
                    className="text-xs text-[#6B4226] font-semibold flex items-center gap-0.5"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span> Editar curva
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {item.curve.map((c, i) => (
                    <span key={i} className="bg-[#EFE8DD] border border-[#DDD3C4] px-2 py-0.5 rounded-md text-[#1F1B18] text-xs font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.specText && (
              <div className="bg-[#F5EFEB] border border-[#DDD3C4]/60 p-2.5 rounded-xl flex items-center justify-between text-xs">
                <span className="text-[#50443F]">{item.specText}</span>
                {item.badge ? (
                  <span className="bg-[#EFE8DD] border border-[#DDD3C4] px-2 py-0.5 rounded text-[#1F1B18] font-semibold">
                    {item.badge}
                  </span>
                ) : (
                  <button 
                    onClick={() => onNavigate('catalogo-mayorista')}
                    className="text-[#6B4226] font-semibold"
                  >
                    Modificar
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sección de Logística y Despacho Mayorista */}
      <div className="bg-white border border-[#DDD3C4] p-4 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[#6B4226] text-xl">local_shipping</span>
            <h2 className="text-base font-bold text-[#1F1B18]">Despacho y Logística Mayorista</h2>
          </div>
          <span className="text-xs bg-[#EDF3F0] text-[#2F5D48] border border-[#DDD3C4]/60 px-2.5 py-0.5 rounded-full font-bold">
            Tarifa B2B
          </span>
        </div>

        {/* Shipping options */}
        <div className="space-y-2">
          {/* Correo Argentino */}
          <label 
            onClick={() => setShippingMethod('correo_argentino')}
            className={`flex items-start p-3 rounded-xl cursor-pointer transition-all border ${
              shippingMethod === 'correo_argentino'
                ? 'bg-[#F5EFEB] border-[#DDD3C4]'
                : 'bg-white border-[#DDD3C4]/60 hover:bg-[#F5EFEB]/50'
            }`}
          >
            <input 
              type="radio" 
              name="shipping_method" 
              checked={shippingMethod === 'correo_argentino'} 
              onChange={() => setShippingMethod('correo_argentino')}
              className="mt-1 accent-[#5C3D2E] shrink-0" 
            />
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-[#1F1B18]">Correo Argentino (B2B Paquetería)</span>
                  <span className="bg-[#EDF3F0] text-[#2F5D48] text-[10px] px-1.5 py-0.2 rounded font-bold border border-[#2F5D48]/20">
                    Bonificado
                  </span>
                </div>
                <span className="text-xs font-bold text-[#2F5D48]">$4.200</span>
              </div>
              <p className="text-xs text-[#50443F] mt-0.5">A Domicilio o Sucursal oficial en todo el país con seguimiento MiCorreo.</p>
            </div>
          </label>

          {/* OCA */}
          <label 
            onClick={() => setShippingMethod('oca')}
            className={`flex items-start p-3 rounded-xl cursor-pointer transition-all border ${
              shippingMethod === 'oca'
                ? 'bg-[#F5EFEB] border-[#DDD3C4]'
                : 'bg-white border-[#DDD3C4]/60 hover:bg-[#F5EFEB]/50'
            }`}
          >
            <input 
              type="radio" 
              name="shipping_method" 
              checked={shippingMethod === 'oca'} 
              onChange={() => setShippingMethod('oca')}
              className="mt-1 accent-[#5C3D2E] shrink-0" 
            />
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-[#1F1B18]">OCA Encomiendas Exprés</span>
                  <span className="bg-[#EFE8DD] text-[#50443F] text-[10px] px-1.5 py-0.2 rounded font-medium border border-[#DDD3C4]">
                    Prioritario
                  </span>
                </div>
                <span className="text-xs font-bold text-[#1F1B18]">$5.900</span>
              </div>
              <p className="text-xs text-[#50443F] mt-0.5">Entrega a puerta de local comercial o retiro en sucursal OCA.</p>
            </div>
          </label>

          {/* Expreso */}
          <label 
            onClick={() => setShippingMethod('expreso')}
            className={`flex items-start p-3 rounded-xl cursor-pointer transition-all border ${
              shippingMethod === 'expreso'
                ? 'bg-[#F5EFEB] border-[#DDD3C4]'
                : 'bg-white border-[#DDD3C4]/60 hover:bg-[#F5EFEB]/50'
            }`}
          >
            <input 
              type="radio" 
              name="shipping_method" 
              checked={shippingMethod === 'expreso'} 
              onChange={() => setShippingMethod('expreso')}
              className="mt-1 accent-[#5C3D2E] shrink-0" 
            />
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1F1B18]">Expreso / Transporte en CABA (Soldati)</span>
                <span className="text-xs font-bold text-[#2F5D48]">Sin cargo CABA</span>
              </div>
              <p className="text-xs text-[#50443F] mt-0.5">Despacho sin costo en depósito de tu transporte habitual. Flete destino a abonar en origen/destino.</p>
            </div>
          </label>
        </div>

        {/* Datos de Envío para Rotulado Oficial */}
        <div className="bg-[#FAF7F2] border border-[#DDD3C4] p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-[#DDD3C4] pb-2">
            <div className="flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[#6B4226] text-base">inventory</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F1B18]">Datos de Envío para Rotulado Oficial</h3>
            </div>
            <span className="text-[11px] text-[#50443F]">Requerido para guía</span>
          </div>

          {/* Modalidad de entrega */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1F1B18] block">
              Modalidad de Entrega <span className="text-[#6B4226]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label 
                onClick={() => setDeliveryPreference('domicilio')}
                className="flex items-center space-x-2 bg-white border border-[#DDD3C4] p-2 rounded-lg cursor-pointer text-xs"
              >
                <input 
                  type="radio" 
                  name="delivery_pref" 
                  checked={deliveryPreference === 'domicilio'}
                  onChange={() => setDeliveryPreference('domicilio')}
                  className="accent-[#5C3D2E]"
                />
                <span className="font-medium text-[#1F1B18]">Envío a Domicilio</span>
              </label>
              <label 
                onClick={() => setDeliveryPreference('sucursal')}
                className="flex items-center space-x-2 bg-white border border-[#DDD3C4] p-2 rounded-lg cursor-pointer text-xs"
              >
                <input 
                  type="radio" 
                  name="delivery_pref" 
                  checked={deliveryPreference === 'sucursal'}
                  onChange={() => setDeliveryPreference('sucursal')}
                  className="accent-[#5C3D2E]"
                />
                <span className="font-medium text-[#1F1B18]">Sucursal Más Cercana</span>
              </label>
            </div>
          </div>

          {/* Nombre / Razón Social */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1F1B18] block">
              Nombre / Razón Social o Boutique <span className="text-[#6B4226]">*</span>
            </label>
            <div className="bg-white border border-[#DDD3C4] rounded-lg p-2 flex items-center focus-within:ring-2 focus-within:ring-[#6B4226]/20">
              <input 
                type="text" 
                value={recipientName}
                onChange={e => setRecipientName(e.target.value)}
                className="w-full bg-transparent text-xs text-[#1F1B18] outline-none" 
              />
            </div>
          </div>

          {/* CUIT & Teléfono */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1F1B18] block">
                DNI o CUIT receptor <span className="text-[#6B4226]">*</span>
              </label>
              <div className="bg-white border border-[#DDD3C4] rounded-lg p-2 flex items-center">
                <input 
                  type="text" 
                  value={taxId}
                  onChange={e => setTaxId(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1F1B18] outline-none" 
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1F1B18] block">
                Teléfono Móvil (WhatsApp) <span className="text-[#6B4226]">*</span>
              </label>
              <div className="bg-white border border-[#DDD3C4] rounded-lg p-2 flex items-center">
                <input 
                  type="tel" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1F1B18] outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1F1B18] block">
              Dirección (Calle, Número, Piso/Depto) <span className="text-[#6B4226]">*</span>
            </label>
            <div className="bg-white border border-[#DDD3C4] rounded-lg p-2 flex items-center">
              <input 
                type="text" 
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full bg-transparent text-xs text-[#1F1B18] outline-none" 
              />
            </div>
          </div>

          {/* Localidad & CP */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1F1B18] block">
                Localidad <span className="text-[#6B4226]">*</span>
              </label>
              <div className="bg-white border border-[#DDD3C4] rounded-lg p-2 flex items-center">
                <input 
                  type="text" 
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1F1B18] outline-none" 
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1F1B18] block">
                Código Postal (CP) <span className="text-[#6B4226]">*</span>
              </label>
              <div className="bg-white border border-[#DDD3C4] rounded-lg p-2 flex items-center">
                <input 
                  type="text" 
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1F1B18] outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Provincia */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1F1B18] block">
              Provincia <span className="text-[#6B4226]">*</span>
            </label>
            <div className="bg-white border border-[#DDD3C4] rounded-lg p-2 flex items-center justify-between">
              <input 
                type="text" 
                value={province}
                onChange={e => setProvince(e.target.value)}
                className="w-full bg-transparent text-xs text-[#1F1B18] outline-none" 
              />
              <span className="material-symbols-outlined text-sm text-[#82746E]">expand_more</span>
            </div>
          </div>

          {/* Observaciones */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1F1B18] block">
              Indicaciones / Observaciones para la entrega
            </label>
            <div className="bg-white border border-[#DDD3C4] rounded-lg p-2 flex items-center">
              <input 
                type="text" 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full bg-transparent text-xs text-[#1F1B18] outline-none" 
              />
            </div>
          </div>
        </div>

        {/* Avisos Automáticos de Seguimiento */}
        <div className="bg-[#EDF3F0] border border-[#DDD3C4] rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[#2F5D48] text-lg">notifications_active</span>
              <h3 className="text-xs font-bold text-[#1F1B18]">Avisos Automáticos de Seguimiento</h3>
            </div>
            <span className="bg-[#2F5D48] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">En Vivo</span>
          </div>
          <p className="text-xs text-[#50443F] leading-relaxed">
            Te enviaremos el número de guía (tracking Correo Argentino / OCA) apenas despachemos el bulto precintado con control de calidad.
          </p>
          <div className="flex items-center space-x-2 pt-1">
            <input 
              type="checkbox" 
              id="wh_tracking"
              checked={whatsappTracking}
              onChange={e => setWhatsappTracking(e.target.checked)}
              className="accent-[#5C3D2E] shrink-0 w-4 h-4 rounded" 
            />
            <label htmlFor="wh_tracking" className="text-xs text-[#1F1B18] font-medium cursor-pointer select-none">
              Recibir código de seguimiento y remito por WhatsApp
            </label>
          </div>
        </div>
      </div>

      {/* Resumen Financiero de la Orden */}
      <div className="bg-white border border-[#DDD3C4] p-4 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#DDD3C4]/40">
          <h2 className="text-base font-bold text-[#1F1B18]">Liquidación de Compra</h2>
          <span className="text-xs bg-[#EDF3F0] text-[#2F5D48] border border-[#DDD3C4]/60 px-2 py-0.5 rounded font-bold">
            Mayorista Tipo A
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center text-[#50443F]">
            <span>Subtotal Bruto (19 unidades)</span>
            <span className="font-semibold text-[#1F1B18]">${subtotalBruto.toLocaleString('es-AR')}</span>
          </div>
          <div className="flex justify-between items-center text-[#2F5D48]">
            <span className="flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-sm">local_offer</span>
              Descuento Volumen (12%)
            </span>
            <span className="font-bold">-${descuentoVolumen.toLocaleString('es-AR')}</span>
          </div>
          <div className="flex justify-between items-center text-[#50443F]">
            <span>Subtotal Neto Gravado</span>
            <span className="font-semibold text-[#1F1B18]">${subtotalNeto.toLocaleString('es-AR')}</span>
          </div>
          <div className="flex justify-between items-center text-[#50443F]">
            <span>IVA Débito Fiscal (21%)</span>
            <span className="font-semibold text-[#1F1B18]">${iva.toLocaleString('es-AR')}</span>
          </div>

          <div className="pt-3 bg-[#FAF7F2] border-t border-[#DDD3C4] -mx-4 px-4 pb-3 rounded-b-2xl mt-2">
            <div className="flex justify-between items-baseline">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#1F1B18]">Total Final Facturado</span>
                <span className="text-[11px] text-[#50443F]">Incluye IVA e impuestos locales</span>
              </div>
              <span className="text-xl font-bold text-[#6B4226]">
                ${totalFinal.toLocaleString('es-AR')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="space-y-2.5 pt-1">
        <button 
          onClick={handleConfirmOrder}
          disabled={isConfirming}
          className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-md transition-all active:scale-[0.99] ${
            isConfirmed 
              ? 'bg-[#2F5D48] hover:bg-[#234737]' 
              : 'bg-[#5C3D2E] hover:bg-[#43271A]'
          }`}
        >
          {isConfirming ? (
            <>
              <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
              <span>Procesando Orden...</span>
            </>
          ) : isConfirmed ? (
            <>
              <span className="material-symbols-outlined text-lg">done_all</span>
              <span>¡Orden #2024-884 Confirmada! Ver Rótulo Postal</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">send</span>
              <span>Confirmar y Enviar Orden de Compra</span>
            </>
          )}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-[#EDF3F0] border border-[#2F5D48]/30 rounded-xl text-center space-y-2">
            <p className="text-xs text-[#2F5D48] font-bold">
              ¡Tu pedido fue emitido exitosamente con la orden de compra #PO-2024-884!
            </p>
            <button
              onClick={() => onNavigate('etiqueta-despacho')}
              className="px-4 py-2 bg-[#2F5D48] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#234737] transition-colors inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">label</span>
              <span>Ver Rótulo y Etiqueta de Despacho (10x15cm)</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onNavigate('etiqueta-despacho')}
            className="bg-[#F5EFEB] hover:bg-[#EFE8DD] border border-[#DDD3C4] text-[#1F1B18] font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base text-[#50443F]">picture_as_pdf</span>
            <span className="truncate">Descargar Presupuesto</span>
          </button>
          <a 
            href="https://wa.me/5491148209900?text=Hola%20Tierra%20Atelier,%20quisiera%20consultar%20sobre%20la%20orden%20PO%20%232024-884"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#EDF3F0] hover:bg-[#d8e7e0] border border-[#2F5D48]/30 text-[#2F5D48] font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            <span className="truncate">WhatsApp Asesor</span>
          </a>
        </div>
      </div>

      {/* Asistencia */}
      <div className="flex items-center justify-center space-x-1.5 text-[#50443F] text-xs pt-1">
        <span className="material-symbols-outlined text-base">support_agent</span>
        <span>Atención exclusiva ejecutiva: Lu a Vi de 9 a 18 hs</span>
      </div>
    </div>
  );
};
