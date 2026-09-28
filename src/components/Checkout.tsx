import React, { useState } from 'react';
import { ScreenId } from '../types';

interface CheckoutProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const [invoiceType, setInvoiceType] = useState<'B' | 'A'>('B');
  const [shippingProvider, setShippingProvider] = useState<'correo' | 'oca'>('correo');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'card'>('transfer');
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [copiedBankInfo, setCopiedBankInfo] = useState(false);
  const [uploadedReceipt, setUploadedReceipt] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState('Valeria');
  const [lastName, setLastName] = useState('Navarro Güemes');
  const [email, setEmail] = useState('valeria.navarro@estudioba.com.ar');
  const [taxId, setTaxId] = useState('34.908.214');
  const [street, setStreet] = useState('Av. Quintana');
  const [streetNumber, setStreetNumber] = useState('458');
  const [floorApt, setFloorApt] = useState('4º B');
  const [postalCode, setPostalCode] = useState('C1014ACO');
  const [city, setCity] = useState('Recoleta');
  const [province, setProvince] = useState('Ciudad Autónoma de Buenos Aires');
  const [notes, setNotes] = useState('Portería 24hs o dejar con encargado de edificio Sr. Horacio');

  const handleCopyBankData = () => {
    navigator.clipboard.writeText('Alias: TIERRA.ATELIER.ACC | CBU: 0070089220000045812903 | CUIT: 30-71649281-9');
    setCopiedBankInfo(true);
    setTimeout(() => setCopiedBankInfo(false), 2500);
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedReceipt(e.target.files[0].name);
    }
  };

  const handleConfirmAndPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onNavigate('trazabilidad');
    }, 1200);
  };

  // Pricing
  const subtotalLista = 65400;
  const descuentoVolumen = 9810; // 15% OFF
  const shippingExtra = shippingProvider === 'oca' ? 2150 : 0;
  const baseForTransfer = subtotalLista - descuentoVolumen;
  const descuentoTransferencia = paymentMethod === 'transfer' ? Math.round(baseForTransfer * 0.10) : 0;
  const totalAPagar = baseForTransfer - descuentoTransferencia + shippingExtra;
  const totalAhorro = descuentoVolumen + descuentoTransferencia;

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner Progress */}
      <div className="bg-[#F5EFEB] rounded-2xl p-4 border border-[#DDD3C4] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2F5D48] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div>
              <span className="text-sm font-bold text-[#1F1B18] block">Escala Mayorista &amp; Minorista Activa</span>
              <span className="text-xs text-[#2F5D48] font-semibold">3 piezas seleccionadas • Descuento automático 15% aplicado</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-[#50443F]">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[#2F5D48]">Cesta</span>
              <span>→</span>
              <span className="text-[#5C3D2E] font-bold">Despacho &amp; Pago</span>
              <span>→</span>
              <span className="text-[#82746E]">Confirmación</span>
            </div>
            <span className="bg-[#EDF3F0] text-[#2F5D48] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 border border-[#2F5D48]/20">
              <span className="material-symbols-outlined text-[14px]">local_shipping</span> Envío Bonificado Nacional
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Steps (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* PASO 1: Contacto y Facturación */}
          <section className="bg-white rounded-2xl p-5 shadow-xs border border-[#DDD3C4] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD3C4]/60">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#5C3D2E] text-white text-xs font-bold flex items-center justify-center">1</span>
                <div>
                  <h2 className="text-sm font-bold text-[#1F1B18]">Contacto &amp; Facturación Legal</h2>
                  <p className="text-[11px] text-[#50443F]">Comprobante electrónico emitido con validez fiscal AFIP / ARCA</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#82746E]">badge</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#1F1B18]">Nombre</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] px-3 py-2 rounded-xl text-[#1F1B18] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#1F1B18]">Apellido</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] px-3 py-2 rounded-xl text-[#1F1B18] outline-none"
                />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-[#1F1B18]">Correo Electrónico (para remito &amp; seguimiento)</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] px-3 py-2 rounded-xl text-[#1F1B18] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#1F1B18]">Tipo de Factura</label>
                <div className="grid grid-cols-2 gap-2 bg-[#FAF7F2] p-1 rounded-xl border border-[#DDD3C4]">
                  <button 
                    type="button"
                    onClick={() => setInvoiceType('B')}
                    className={`py-1.5 px-2 rounded-lg font-bold text-xs transition-all ${
                      invoiceType === 'B' ? 'bg-white text-[#5C3D2E] shadow-xs' : 'text-[#50443F]'
                    }`}
                  >
                    Factura B (Consumidor)
                  </button>
                  <button 
                    type="button"
                    onClick={() => setInvoiceType('A')}
                    className={`py-1.5 px-2 rounded-lg font-bold text-xs transition-all ${
                      invoiceType === 'A' ? 'bg-white text-[#5C3D2E] shadow-xs' : 'text-[#50443F]'
                    }`}
                  >
                    Factura A (Responsable)
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#1F1B18]">DNI / CUIT</label>
                <input 
                  type="text" 
                  value={taxId}
                  onChange={e => setTaxId(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] px-3 py-2 rounded-xl text-[#1F1B18] outline-none font-medium"
                />
              </div>
            </div>
          </section>

          {/* PASO 2: Despacho y Logística */}
          <section className="bg-white rounded-2xl p-5 shadow-xs border border-[#DDD3C4] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD3C4]/60">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#5C3D2E] text-white text-xs font-bold flex items-center justify-center">2</span>
                <div>
                  <h2 className="text-sm font-bold text-[#1F1B18]">Despacho &amp; Operador Logístico</h2>
                  <p className="text-[11px] text-[#50443F]">Paquetería asegurada con precinto lacrado artesanal</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#82746E]">local_shipping</span>
            </div>

            {/* Carriers */}
            <div className="space-y-2">
              <label 
                onClick={() => setShippingProvider('correo')}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                  shippingProvider === 'correo' ? 'bg-[#F5EFEB] border-[#5C3D2E]' : 'bg-[#FAF7F2] border-[#DDD3C4]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input type="radio" checked={shippingProvider === 'correo'} onChange={() => setShippingProvider('correo')} className="accent-[#5C3D2E]" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1F1B18]">Correo Argentino Clásico</span>
                      <span className="bg-[#EDF3F0] text-[#2F5D48] text-[9px] px-1.5 py-0.2 rounded font-bold">E-commerce MiCorreo</span>
                    </div>
                    <p className="text-[11px] text-[#50443F]">3 a 5 días hábiles a domicilio con código de tracking 24/7</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#82746E] line-through block">$4.850</span>
                  <span className="text-xs font-bold text-[#2F5D48]">GRATIS</span>
                </div>
              </label>

              <label 
                onClick={() => setShippingProvider('oca')}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                  shippingProvider === 'oca' ? 'bg-[#F5EFEB] border-[#5C3D2E]' : 'bg-[#FAF7F2] border-[#DDD3C4]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input type="radio" checked={shippingProvider === 'oca'} onChange={() => setShippingProvider('oca')} className="accent-[#5C3D2E]" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1F1B18]">OCA Express Prioritario</span>
                      <span className="bg-[#EFE8DD] text-[#50443F] text-[9px] px-1.5 py-0.2 rounded font-medium">Domicilio o Sucursal</span>
                    </div>
                    <p className="text-[11px] text-[#50443F]">Entrega 24/48hs hábiles con franja horaria acordada</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1F1B18]">+$2.150</span>
              </label>
            </div>

            {/* Address Form */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#DDD3C4]/60 space-y-3 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#82746E] block tracking-wider">
                Datos de Rotulado Postal Oficial
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                <div className="sm:col-span-4 space-y-1">
                  <label className="font-bold text-[#1F1B18]">Calle / Avenida</label>
                  <input 
                    type="text" 
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    className="w-full bg-white border border-[#DDD3C4] px-3 py-1.5 rounded-lg outline-none"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-[#1F1B18]">Altura</label>
                  <input 
                    type="text" 
                    value={streetNumber}
                    onChange={e => setStreetNumber(e.target.value)}
                    className="w-full bg-white border border-[#DDD3C4] px-3 py-1.5 rounded-lg outline-none"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-[#1F1B18]">Piso / Dpto (Opcional)</label>
                  <input 
                    type="text" 
                    value={floorApt}
                    onChange={e => setFloorApt(e.target.value)}
                    className="w-full bg-white border border-[#DDD3C4] px-3 py-1.5 rounded-lg outline-none"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-[#1F1B18]">Código Postal</label>
                  <input 
                    type="text" 
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    className="w-full bg-white border border-[#DDD3C4] px-3 py-1.5 rounded-lg outline-none"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-[#1F1B18]">Localidad</label>
                  <input 
                    type="text" 
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-white border border-[#DDD3C4] px-3 py-1.5 rounded-lg outline-none"
                  />
                </div>
                <div className="sm:col-span-6 space-y-1">
                  <label className="font-bold text-[#1F1B18]">Provincia</label>
                  <input 
                    type="text" 
                    value={province}
                    onChange={e => setProvince(e.target.value)}
                    className="w-full bg-white border border-[#DDD3C4] px-3 py-1.5 rounded-lg outline-none"
                  />
                </div>
                <div className="sm:col-span-6 space-y-1">
                  <label className="font-bold text-[#1F1B18]">Instrucciones o timbrado para el transportista</label>
                  <input 
                    type="text" 
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full bg-white border border-[#DDD3C4] px-3 py-1.5 rounded-lg outline-none"
                  />
                </div>
              </div>

              {/* WhatsApp Check */}
              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={whatsappAlerts}
                  onChange={e => setWhatsappAlerts(e.target.checked)}
                  className="mt-0.5 accent-[#5C3D2E] w-4 h-4 rounded" 
                />
                <div className="text-[11px] text-[#1F1B18] leading-tight">
                  <span>Recibir notificaciones inmediatas del estado de despacho por WhatsApp al (+54 9 11) 6890-4421</span>
                  <span className="block text-[#82746E]">Enviamos remito de salida, ingreso a centro de distribución y aviso de visita.</span>
                </div>
              </label>
            </div>
          </section>

          {/* PASO 3: Método de Pago */}
          <section className="bg-white rounded-2xl p-5 shadow-xs border border-[#DDD3C4] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD3C4]/60">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#5C3D2E] text-white text-xs font-bold flex items-center justify-center">3</span>
                <div>
                  <h2 className="text-sm font-bold text-[#1F1B18]">Medio de Pago Seguro</h2>
                  <p className="text-[11px] text-[#50443F]">Seleccione la alternativa para liquidar su compra</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#82746E]">credit_card</span>
            </div>

            {/* Transferencia */}
            <div className={`p-4 rounded-xl border transition-all ${
              paymentMethod === 'transfer' ? 'bg-[#FAF7F2] border-[#5C3D2E]' : 'bg-white border-[#DDD3C4]'
            }`}>
              <div className="flex items-start justify-between">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={paymentMethod === 'transfer'} 
                    onChange={() => setPaymentMethod('transfer')}
                    className="mt-1 accent-[#5C3D2E]" 
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[#1F1B18]">Transferencia Bancaria Directa</span>
                      <span className="bg-[#EDF3F0] text-[#2F5D48] text-[9px] px-2 py-0.5 rounded font-bold">
                        10% OFF EXTRA INMEDIATO
                      </span>
                    </div>
                    <p className="text-[11px] text-[#50443F] mt-0.5">
                      Acreditación inmediata vía CBU o Alias bancario institucional.
                    </p>
                  </div>
                </label>
                <span className="material-symbols-outlined text-[#2F5D48] text-[22px]">account_balance</span>
              </div>

              {/* Bank Details Drawer */}
              {paymentMethod === 'transfer' && (
                <div className="mt-3.5 bg-white p-3 rounded-xl border border-[#DDD3C4]/60 space-y-2.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="bg-[#F5EFEB] p-2.5 rounded-lg">
                      <span className="text-[9px] uppercase font-bold text-[#82746E] block">Alias Bancario</span>
                      <span className="font-bold text-[#5C3D2E] text-sm">TIERRA.ATELIER.ACC</span>
                    </div>
                    <div className="bg-[#F5EFEB] p-2.5 rounded-lg">
                      <span className="text-[9px] uppercase font-bold text-[#82746E] block">CBU Banco Galicia</span>
                      <span className="font-mono text-xs text-[#1F1B18]">0070089220000045812903</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#50443F]">
                    <span>Titular: TIERRA ATELIER S.R.L. | CUIT 30-71649281-9</span>
                    <button 
                      onClick={handleCopyBankData}
                      className="text-[#5C3D2E] font-bold hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                      <span>{copiedBankInfo ? '¡Copiado!' : 'Copiar datos'}</span>
                    </button>
                  </div>

                  {/* Receipt upload */}
                  <div className="pt-1">
                    <label className="block text-[11px] font-bold text-[#1F1B18] mb-1">
                      Cargar comprobante de transferencia (opcional en este paso)
                    </label>
                    <label className="flex items-center justify-center p-3 bg-[#FAF7F2] border border-dashed border-[#DDD3C4] rounded-xl cursor-pointer hover:bg-[#F5EFEB] transition-colors">
                      <input type="file" onChange={handleFileDrop} className="hidden" />
                      <div className="text-center">
                        <span className="material-symbols-outlined text-[#5C3D2E] text-[24px]">cloud_upload</span>
                        <p className="text-xs font-bold text-[#1F1B18]">
                          {uploadedReceipt ? `Comprobante: ${uploadedReceipt}` : 'Adjuntar captura o PDF (hasta 10MB)'}
                        </p>
                        <p className="text-[10px] text-[#82746E]">También podrás enviarlo por WhatsApp con tu número de orden</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Cards / MODO */}
            <label 
              onClick={() => setPaymentMethod('card')}
              className={`flex items-start justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                paymentMethod === 'card' ? 'bg-[#FAF7F2] border-[#5C3D2E]' : 'bg-white border-[#DDD3C4]'
              }`}
            >
              <div className="flex items-start gap-3">
                <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="mt-1 accent-[#5C3D2E]" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1F1B18]">Tarjetas de Débito, Crédito &amp; Billeteras</span>
                    <span className="bg-[#EFE8DD] text-[#50443F] text-[9px] px-1.5 py-0.2 rounded font-medium">3 Cuotas sin interés</span>
                  </div>
                  <p className="text-[11px] text-[#50443F] mt-0.5">
                    Visa, Mastercard, Cabal, Mercado Pago, MODO o dinero en cuenta
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#50443F]">
                <span className="bg-[#EFE8DD] px-1.5 py-0.5 rounded">MODO</span>
                <span className="bg-[#EFE8DD] px-1.5 py-0.5 rounded">MP</span>
              </div>
            </label>
          </section>
        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
          <div className="bg-white rounded-2xl p-5 shadow-md border border-[#DDD3C4] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD3C4]/60">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#1F1B18]">Resumen de Compra</span>
                <span className="bg-[#F5EFEB] px-2 py-0.5 rounded-full text-xs text-[#50443F] font-bold">3 piezas</span>
              </div>
              <button 
                onClick={() => onNavigate('bolsa')}
                className="text-xs font-bold text-[#5C3D2E] hover:underline"
              >
                Editar Bolsa
              </button>
            </div>

            {/* Items */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzKY_T4bxAUIjpEoe2dDeSnFCP5jWrkm4iY1n2pQWrtzXSgCq0EoudvWf0d3kx84hr8b8k3R88t-w6A2g5fG332qOsOLpXcfzxWHkGrCW7UviiGJr8uHmeNUZfe-lY7ZmaJ8_CzATz_ZQzBX9pNFlD55DYzRcEEeXM2Cu86PoGXtukU2f1XbLLN-gCzCbv-gdrTOta1Q5FRdh5g-goXbwjSm6rfjH_xe4jIBrHmU6ChceomCd4KY0" 
                  alt="Cinto Verona Bovino" 
                  className="w-14 h-14 rounded-lg object-cover bg-[#FAF7F2] shrink-0 border border-[#DDD3C4]/50"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#1F1B18] truncate">Cinto Verona Bovino</h4>
                  <p className="text-[11px] text-[#50443F]">Suela Curtido Vegetal • Talle 90 cm</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] bg-[#FAF7F2] px-1.5 py-0.2 rounded border border-[#DDD3C4]/50 text-[#50443F]">Cant: 1</span>
                    <span className="text-[10px] text-[#2F5D48] font-bold">15% pack off</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1F1B18]">$22.800</span>
              </div>

              <div className="flex items-center gap-3">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPzzBQw0lMUQhQO-525Svic86ae7jiIxBLlNlIpswtjFObthZv5kGiLJ9k8TEi5qFeffP-xwiVFgVPv-H_7d-cUzpmmgCsLfwyK_wiNTwnESmk6EOaijd8nVtB7eGTdjFDRLcDzjWGAPQ-vOU9o-ryt8HaderuA6z8Mww-lkbpJriIDg5CIg-GpogbLUrZTCqfeSquwiAaIYKwjQ61OleA2WrFkI-Nb7fBHpizjjYXU1LzET8GYLo" 
                  alt="Collar Atenea Cincelado" 
                  className="w-14 h-14 rounded-lg object-cover bg-[#FAF7F2] shrink-0 border border-[#DDD3C4]/50"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#1F1B18] truncate">Collar Atenea Cincelado</h4>
                  <p className="text-[11px] text-[#50443F]">Bronce Bañado &amp; Cuerillo • Único</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] bg-[#FAF7F2] px-1.5 py-0.2 rounded border border-[#DDD3C4]/50 text-[#50443F]">Cant: 1</span>
                    <span className="text-[10px] text-[#2F5D48] font-bold">15% pack off</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1F1B18]">$18.200</span>
              </div>

              <div className="flex items-center gap-3">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHr1HZMgdO4gi2Egq_DG3RB9nfwvEZnB8yebOjQSrPb49vjRPow7DbXHTCGH_BSk0DqE732fsKjS1DTKw61-JtKoEuDHWQm_UCOksk5Hydf0ked-bY2gaZ2Pju51f7p3_BKhtbgLBmAea4USxGHXVqgtPTFGcrjpREJuzvTHc1RrzmdM38ZSKXjirlD-K1u2vM6DV-DidPpe62AB7frYi8u6pJiMWFGHa5uuE9P7g_6ad1nKzfjTA" 
                  alt="Cinto Milano Doble Anilla" 
                  className="w-14 h-14 rounded-lg object-cover bg-[#FAF7F2] shrink-0 border border-[#DDD3C4]/50"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#1F1B18] truncate">Cinto Milano Doble Anilla</h4>
                  <p className="text-[11px] text-[#50443F]">Cuero Graso Moca • Talle 85 cm</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] bg-[#FAF7F2] px-1.5 py-0.2 rounded border border-[#DDD3C4]/50 text-[#50443F]">Cant: 1</span>
                    <span className="text-[10px] text-[#2F5D48] font-bold">15% pack off</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1F1B18]">$24.400</span>
              </div>
            </div>

            {/* Coupon input */}
            <div className="flex items-center gap-2 pt-1">
              <input 
                type="text" 
                placeholder="CÓDIGO O VOUCHER DE TALLER" 
                className="flex-1 bg-[#FAF7F2] border border-[#DDD3C4] px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider outline-none"
              />
              <button 
                onClick={() => alert('Cupón aplicado')}
                className="bg-[#EFE8DD] text-[#43271A] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#DDD3C4]"
              >
                Aplicar
              </button>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-[#DDD3C4]/60 text-xs">
              <div className="flex justify-between text-[#50443F]">
                <span>Subtotal precio de lista</span>
                <span className="font-semibold text-[#1F1B18]">${subtotalLista.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between items-center text-[#2F5D48] font-bold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">loyalty</span>
                  Descuento por volumen (3 arts: 15% OFF)
                </span>
                <span>-${descuentoVolumen.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between items-center text-[#2F5D48] font-bold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">local_shipping</span>
                  Envío nacional Correo Argentino
                </span>
                <span className="bg-[#EDF3F0] px-1.5 py-0.2 rounded text-[10px]">GRATIS / $0</span>
              </div>
              {paymentMethod === 'transfer' && (
                <div className="flex justify-between items-center text-[#5C3D2E] font-bold">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">percent</span>
                    Descuento extra Transferencia (10%)
                  </span>
                  <span>-${descuentoTransferencia.toLocaleString('es-AR')}</span>
                </div>
              )}

              <div className="pt-3 mt-2 border-t border-[#DDD3C4]">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-bold text-[#1F1B18] block">Total a Pagar</span>
                    <span className="text-[10px] text-[#50443F]">Impuestos incluidos • Factura oficial</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#5C3D2E]">${totalAPagar.toLocaleString('es-AR')}</span>
                    <span className="text-[10px] text-[#2F5D48] font-bold block">
                      Ahorrás ${totalAhorro.toLocaleString('es-AR')} en esta orden
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm CTA */}
            <div className="pt-2">
              <button 
                onClick={handleConfirmAndPay}
                disabled={isProcessing}
                className="w-full bg-[#5C3D2E] hover:bg-[#43271A] text-white text-sm font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    <span>Procesando Despacho...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                    <span>Confirmar y Pagar Pedido</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-[#82746E] text-center mt-2 leading-tight">
                Al confirmar aceptás nuestros términos de garantía de marroquinería y despacho postal.
              </p>
            </div>
          </div>

          {/* Trust Guarantee Cards */}
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl p-4 space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#5C3D2E] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
              </div>
              <div>
                <span className="font-bold text-[#1F1B18] block">Compra Protegida &amp; Cifrado SSL 256-bit</span>
                <span className="text-[#50443F] text-[11px]">Tus datos fiscales y de pago viajan de forma 100% encriptada.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#2F5D48] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">published_with_changes</span>
              </div>
              <div>
                <span className="font-bold text-[#1F1B18] block">Garantía de Taller &amp; Cambios 30 Días</span>
                <span className="text-[#50443F] text-[11px]">Si el talle de tu cinto no es el adecuado, el primer cambio postal es ágil.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#5C3D2E] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">inventory_2</span>
              </div>
              <div>
                <span className="font-bold text-[#1F1B18] block">Precinto de Seguridad &amp; Estuche de Lienzo</span>
                <span className="text-[#50443F] text-[11px]">Cada accesorio se despacha en bolsa de algodón sellada con lacre de taller.</span>
              </div>
            </div>
          </div>

          <div className="px-2 py-1 flex items-center justify-between text-[11px] text-[#50443F]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#5C3D2E]">support_agent</span>
              Atención personalizada: Lun a Vie 9 a 18 hs
            </span>
            <span 
              onClick={() => onNavigate('trazabilidad')}
              className="text-[#5C3D2E] font-bold hover:underline cursor-pointer"
            >
              Ver Trazabilidad GPS →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
