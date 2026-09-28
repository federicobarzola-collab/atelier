import React, { useState } from 'react';
import { ScreenId } from '../types';

interface TrackingLogisticsProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TrackingLogistics: React.FC<TrackingLogisticsProps> = ({ onNavigate }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [customNote, setCustomNote] = useState(
    'Hola Valeria! 👋 Desde *Tierra Atelier* te informamos que tu pedido *#PO-2024-884* se encuentra en viaje hacia Rosario con guía Correo Argentino *CA-892401824AR*. Llegada estimada al local: Mañana antes de las 13hs. Podes seguir el móvil en vivo aquí: https://tierraatelier.com/track/CA-892401824AR'
  );

  const trackingCode = 'CA-892401824AR';

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const rawPhone = '5491158429912';
    const encoded = encodeURIComponent(customNote);
    window.open(`https://wa.me/${rawPhone}?text=${encoded}`, '_blank');
    setWhatsappSent(true);
    setTimeout(() => setWhatsappSent(false), 5000);
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb & Live Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-[#50443F]">
          <span onClick={() => onNavigate('catalogo-mayorista')} className="hover:text-[#5C3D2E] cursor-pointer">
            Operaciones &amp; Logística
          </span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span onClick={() => onNavigate('validacion-pedido')} className="hover:text-[#5C3D2E] cursor-pointer">
            Trazabilidad B2B &amp; Envíos
          </span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#1F1B18] font-bold">Guía Postal {trackingCode}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF3F0] text-[#2F5D48] text-xs font-bold border border-[#2F5D48]/20">
            <span className="w-2 h-2 rounded-full bg-[#2F5D48] animate-pulse"></span>
            Trazabilidad Satelital Activa
          </span>
          <span className="text-xs text-[#82746E]">Actualizado hace 18 min</span>
        </div>
      </div>

      {/* Main Tracking Header */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#DDD3C4] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DDD3C4]/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase tracking-widest text-[#5C3D2E] font-bold bg-[#EFE8DD] px-2.5 py-0.5 rounded">
                Despacho Oficial E-Commerce / B2B
              </span>
              <span className="text-xs text-[#50443F]">Correo Argentino Paquetería Prioritaria</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F1B18] tracking-tight">
              Guía #{trackingCode}
            </h1>
            <p className="text-xs text-[#50443F] flex items-center gap-2 flex-wrap">
              <span>Asociado a Orden Comercial:</span>
              <span className="text-sm font-bold text-[#1F1B18]">#PO-2024-884</span>
              <span>•</span>
              <span className="text-[#2F5D48] font-bold">Boutique Magnolia Concept (Rosario)</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE8DD] text-[#1F1B18] text-xs font-bold border border-[#DDD3C4] transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>{copiedCode ? '¡Código Copiado!' : 'Copiar Código Postal'}</span>
            </button>
            <button 
              onClick={() => onNavigate('etiqueta-despacho')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE8DD] text-[#1F1B18] text-xs font-bold border border-[#DDD3C4] transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Imprimir Rótulo Postal</span>
            </button>
            <button 
              onClick={() => alert('Descargando comprobante oficial de despacho en PDF...')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5C3D2E] hover:bg-[#43271A] text-white text-xs font-bold shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              <span>Descargar Comprobante PDF</span>
            </button>
          </div>
        </div>

        {/* 5-Step Logistics Progress Stepper */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-4">
            <span className="text-xs font-bold text-[#1F1B18]">Progreso Logístico en Tiempo Real</span>
            <span className="text-xs font-bold text-[#2F5D48]">Paso 3 de 5: En Tránsito Interprovincial (Rosario Hub)</span>
          </div>

          <div className="relative py-2">
            <div className="hidden lg:block absolute top-6 left-10 right-10 h-1 bg-[#E6DCCF] rounded-full z-0">
              <div className="h-full bg-[#2F5D48] rounded-full transition-all duration-700" style={{ width: '58%' }}></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10 text-xs">
              {/* Step 1 */}
              <div className="bg-[#FAF7F2] lg:bg-transparent p-3 lg:p-0 rounded-xl flex lg:flex-col items-center text-left lg:text-center gap-3 lg:gap-2">
                <div className="w-10 h-10 rounded-full bg-[#2F5D48] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">done_all</span>
                </div>
                <div>
                  <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-[#EDF3F0] text-[#2F5D48] font-bold mb-0.5">Completado</span>
                  <p className="font-bold text-[#1F1B18]">1. Empaque en Taller</p>
                  <p className="text-[11px] text-[#50443F]">Palermo Soho, CABA</p>
                  <p className="text-[10px] text-[#82746E]">14 Oct • 10:30 hs</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#FAF7F2] lg:bg-transparent p-3 lg:p-0 rounded-xl flex lg:flex-col items-center text-left lg:text-center gap-3 lg:gap-2">
                <div className="w-10 h-10 rounded-full bg-[#2F5D48] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <div>
                  <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-[#EDF3F0] text-[#2F5D48] font-bold mb-0.5">Completado</span>
                  <p className="font-bold text-[#1F1B18]">2. Despacho &amp; Guía</p>
                  <p className="text-[11px] text-[#50443F]">Planta CTP Retiro</p>
                  <p className="text-[10px] text-[#82746E]">14 Oct • 16:45 hs</p>
                </div>
              </div>

              {/* Step 3 (Active) */}
              <div className="bg-[#F5EFEB] p-3 rounded-xl flex lg:flex-col items-center text-left lg:text-center gap-3 lg:gap-2 border border-[#5C3D2E]/30 ring-2 ring-[#5C3D2E]/15">
                <div className="w-10 h-10 rounded-full bg-[#5C3D2E] text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                </div>
                <div>
                  <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-[#5C3D2E] text-white font-bold mb-0.5">En Curso</span>
                  <p className="font-bold text-[#5C3D2E]">3. En Tránsito Interurbano</p>
                  <p className="text-[11px] text-[#1F1B18] font-medium">Hacia Hub Rosario</p>
                  <p className="text-[10px] text-[#2F5D48] font-bold">Llegada est: Hoy 19:30 hs</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#FAF7F2] lg:bg-transparent p-3 lg:p-0 rounded-xl flex lg:flex-col items-center text-left lg:text-center gap-3 lg:gap-2 opacity-60">
                <div className="w-10 h-10 rounded-full bg-[#E6DCCF] text-[#82746E] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">route</span>
                </div>
                <div>
                  <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-[#EFE8DD] text-[#50443F] font-medium mb-0.5">Pendiente</span>
                  <p className="font-bold text-[#1F1B18]">4. Última Milla</p>
                  <p className="text-[11px] text-[#50443F]">Visita a Domicilio B2B</p>
                  <p className="text-[10px] text-[#82746E]">Previsto: Mañana 09:00 hs</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-[#FAF7F2] lg:bg-transparent p-3 lg:p-0 rounded-xl flex lg:flex-col items-center text-left lg:text-center gap-3 lg:gap-2 opacity-60">
                <div className="w-10 h-10 rounded-full bg-[#E6DCCF] text-[#82746E] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                </div>
                <div>
                  <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-[#EFE8DD] text-[#50443F] font-medium mb-0.5">Pendiente</span>
                  <p className="font-bold text-[#1F1B18]">5. Entrega Confirmada</p>
                  <p className="text-[11px] text-[#50443F]">Recepción y Conformidad</p>
                  <p className="text-[10px] text-[#82746E]">Estimado: Mañana 13:00 hs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Map & Physical Specs (8 cols) + Receiver & WhatsApp Direct (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Satellite Highway Route */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#DDD3C4] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#2F5D48] tracking-wider block">
                  Ruta Satelital Interprovincial
                </span>
                <h2 className="text-base font-bold text-[#1F1B18]">Autopista Buenos Aires - Rosario (RN9)</h2>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#DDD3C4] text-[#50443F]">
                <span className="material-symbols-outlined text-[15px]">speed</span> 82 km/h Vel. Media
              </span>
            </div>

            {/* Simulated Satellite Map */}
            <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#DDD3C4] shadow-inner">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnmhZh0UZv2KUFfOvTVbBiumkIUJybBppE1LSC6Dp2cl9G8Ohtge4_JjHgb91qxNJHdNS9WmEUj-_Kp90TBHd_GeFPqEsS4QTcCk4KE4zMf-ibv0mgqAjyXgMSKqdkE3n9f9DXdwv3KKB17h-SIyF3PTkcwF1NkAnRwr9mYEN0BfmRk1yf08dzyx6ZpYMoEG0ZAhTS4_PXxPaOAlkU_PV1zEpSVkWwxF4lmnqBJC12YkzYjm-ETCQ" 
                alt="Mapa satelital RN9 Rosario" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B18]/70 via-transparent to-transparent pointer-events-none"></div>

              {/* Truck status floating badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl shadow-md border border-[#DDD3C4] max-w-xs text-xs">
                <p className="text-[10px] uppercase text-[#2F5D48] font-bold">Vehículo de Carga Oficial</p>
                <p className="font-bold text-[#1F1B18]">Unidad Iveco Daily • Matrícula AF-902-XK</p>
                <p className="text-[10px] text-[#82746E]">Custodia logística satelital Correo Argentino</p>
              </div>

              {/* Checkpoint bottom bar */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-[#DDD3C4] text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#5C3D2E] text-[24px]">pin_drop</span>
                  <div>
                    <p className="text-[10px] text-[#82746E]">Punto de Control Actual</p>
                    <p className="font-bold text-[#1F1B18]">San Nicolás de los Arroyos (Km 232)</p>
                  </div>
                </div>
                <div className="text-right sm:text-right">
                  <p className="text-[10px] text-[#82746E]">Distancia restante a Rosario</p>
                  <p className="text-sm font-bold text-[#2F5D48]">68 km • ~54 minutos</p>
                </div>
              </div>
            </div>

            {/* Trip Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#DDD3C4]/60">
                <span className="text-[10px] text-[#82746E]">Origen</span>
                <p className="font-bold text-[#1F1B18]">Taller Palermo (CABA)</p>
                <p className="text-[10px] text-[#2F5D48] font-semibold">Salida confirmada</p>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#DDD3C4]/60">
                <span className="text-[10px] text-[#82746E]">Hub Regional</span>
                <p className="font-bold text-[#1F1B18]">CD Rosario Circunvalación</p>
                <p className="text-[10px] text-[#5C3D2E] font-semibold">Próximo arribo (19:30)</p>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#DDD3C4]/60">
                <span className="text-[10px] text-[#82746E]">Destino Final</span>
                <p className="font-bold text-[#1F1B18]">Rosario Centro (S2000)</p>
                <p className="text-[10px] text-[#82746E]">Recepción programada</p>
              </div>
            </div>
          </div>

          {/* Physical Specs & Package Content */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#DDD3C4] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#5C3D2E] tracking-wider block">
                  Especificaciones Físicas
                </span>
                <h2 className="text-base font-bold text-[#1F1B18]">Detalle del Bulto &amp; Contenido Artesanal</h2>
              </div>
              <span className="text-xs bg-[#EFE8DD] text-[#50443F] border border-[#DDD3C4] px-2.5 py-0.5 rounded-full font-bold">
                Precinto #P-8831
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#DDD3C4]/60">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZiUrmq0SJFtuCQuXL1Ew6r6aDJFmpp_7fD8amgRBC2B1zhG_CjoWRSwU7ZgUQcE3rqHwlUtxntshuUykLyVscKNA-5oJCy9XswU54qqYfdKI4XIxboLOR-Hfq43cS6EDJhL82SZ2khJrtRdPs9HAKeAH6vFqHmmqQt66x7oZAV1kuUWNjKK3i3y9-sDbnkp5BimvqJrD2-c_nobFoHN4CND-OnfgbwSY3htrNE7kTdoAz7T2WyIQ" 
                  alt="Empaque Seguro B2B" 
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#DDD3C4]/50"
                />
                <div className="space-y-0.5 text-xs">
                  <span className="text-[10px] uppercase text-[#2F5D48] font-bold">Empaque Seguro B2B</span>
                  <h3 className="font-bold text-[#1F1B18]">1 Bulto Corrugado Triple Fondo</h3>
                  <p className="text-[#50443F]">Peso verificado en báscula postal: <strong className="text-[#1F1B18]">4.80 kg netos</strong>.</p>
                  <p className="text-[11px] text-[#82746E]">Dimensiones: 45 x 35 x 28 cm. Sello hidrófugo y amortiguación ecológica.</p>
                </div>
              </div>

              <div className="flex gap-3 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#DDD3C4]/60">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoUztuXgGRRJ7kj8V9ssnfs72B14g3UXaMOu86gTDscuEqV4rw1d8M9pRUqrnlc1_F_znTCOCGu0BYOx1vy4fNGVd28Y1mlpMB8sk5bzKW6CKUj4IBIyRqrkLvP9Rx--uarCWqjTSGC4uIUcWlPPG2dugSm_B6XhQ4op39JWCPOV8lVrR8CSsP0LhLF-5Ol1bFPKYIlr_rXfD1AR8bhhe68AQv_SVgYh1IjC4DQ_qA_t01zghoE4o" 
                  alt="Mercadería Declarada" 
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#DDD3C4]/50"
                />
                <div className="space-y-0.5 text-xs">
                  <span className="text-[10px] uppercase text-[#5C3D2E] font-bold">Mercadería Declarada</span>
                  <h3 className="font-bold text-[#1F1B18]">Accesorios &amp; Joyería Artesanal</h3>
                  <p className="text-[#50443F]">18 cinturones cuero curtido vegetal + 12 gargantillas y dijes cincelados.</p>
                  <p className="text-[11px] text-[#82746E]">Bolsas individuales de lienzo 100% algodón orgánico.</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#EDF3F0] rounded-xl flex items-center justify-between text-xs border border-[#2F5D48]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2F5D48] text-[20px]">verified_user</span>
                <p className="text-[#1F1B18] font-medium">Póliza de transporte postal con cobertura 100% ante siniestro (Sancor Seguros Cargas).</p>
              </div>
              <span className="text-[10px] text-[#2F5D48] font-bold uppercase tracking-wider">Asegurado</span>
            </div>
          </div>

          {/* Timeline Event Log */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#DDD3C4] space-y-3">
            <h2 className="text-sm font-bold text-[#1F1B18]">Historial Detallado de Eventos Postales</h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F5D48] mt-1 shrink-0"></span>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <p className="font-bold text-[#1F1B18]">Ingreso a Peaje Lima - Tránsito RN9 con escolta logística</p>
                    <p className="text-[11px] text-[#50443F]">Unidad en ruta troncal sin demoras reportadas</p>
                  </div>
                  <span className="text-[10px] text-[#82746E] shrink-0 font-medium">Hoy 15:40 hs</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F5D48] mt-1 shrink-0"></span>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <p className="font-bold text-[#1F1B18]">Salida de Planta de Transferencia CTP Retiro (CABA)</p>
                    <p className="text-[11px] text-[#50443F]">Clasificación automatizada y consolidación en jaula interprovincial</p>
                  </div>
                  <span className="text-[10px] text-[#82746E] shrink-0 font-medium">14 Oct • 22:15 hs</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F5D48] mt-1 shrink-0"></span>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <p className="font-bold text-[#1F1B18]">Ingreso y Pesaje Oficial Correo Argentino</p>
                    <p className="text-[11px] text-[#50443F]">Bulto validado con precinto inviolable #P-8831</p>
                  </div>
                  <span className="text-[10px] text-[#82746E] shrink-0 font-medium">14 Oct • 16:45 hs</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F5D48] mt-1 shrink-0"></span>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <p className="font-bold text-[#1F1B18]">Orden Embalada en Taller Central Tierra Atelier</p>
                    <p className="text-[11px] text-[#50443F]">Control de calidad final superado por Mariana Godoy (Encargada de Taller)</p>
                  </div>
                  <span className="text-[10px] text-[#82746E] shrink-0 font-medium">14 Oct • 10:30 hs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Receiver Data & WhatsApp Action (4 cols) */}
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
          {/* Receiver Info */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#DDD3C4] space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#DDD3C4]/60">
              <div className="w-8 h-8 rounded-xl bg-[#EDF3F0] text-[#2F5D48] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">store</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#2F5D48] tracking-wider block">Destino Confirmado</span>
                <h3 className="text-sm font-bold text-[#1F1B18]">Datos del Receptor</h3>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#DDD3C4]/60 space-y-0.5">
                <p className="text-[10px] text-[#82746E] uppercase font-bold">Razón Social / Receptor</p>
                <p className="text-sm font-bold text-[#1F1B18]">Boutique Magnolia Concept</p>
                <p className="text-[#50443F]">CUIT: 27-34891024-4 • IVA Responsable Inscripto</p>
                <p className="text-[#50443F]">Contacto: <strong className="text-[#1F1B18]">Valeria S. Rossi</strong></p>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#DDD3C4]/60 space-y-0.5">
                <p className="text-[10px] text-[#82746E] uppercase font-bold">Dirección de Entrega</p>
                <p className="font-bold text-[#1F1B18]">Bv. Oroño 1428, Piso 1, Local 3</p>
                <p className="text-[#50443F]">Rosario, Santa Fe (CP S2000DAP)</p>
                <div className="flex items-center gap-1 text-[#2F5D48] font-semibold pt-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  <span>Horario comercial: Lun a Vie 09:30 a 19:30 hs</span>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#DDD3C4]/60 space-y-0.5">
                <p className="text-[10px] text-[#82746E] uppercase font-bold">Teléfono de Contacto</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[#1F1B18]">+54 9 11 5842-9912</p>
                  <span className="text-[10px] text-[#2F5D48] bg-[#EDF3F0] px-2 py-0.2 rounded font-bold">Verificado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notificar por WhatsApp */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#DDD3C4] space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DDD3C4]/60">
              <span className="material-symbols-outlined text-[#2F5D48] text-[20px]">chat</span>
              <h3 className="text-sm font-bold text-[#1F1B18]">Notificar por WhatsApp</h3>
            </div>
            <p className="text-xs text-[#50443F]">
              Envía el enlace de seguimiento postal con plantilla prearmada directamente al número celular registrado del cliente.
            </p>

            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#DDD3C4]/60">
              <p className="text-[10px] text-[#82746E] font-bold mb-1">Vista previa del mensaje predeterminado:</p>
              <textarea 
                value={customNote}
                onChange={e => setCustomNote(e.target.value)}
                rows={4}
                className="w-full text-xs text-[#1F1B18] bg-white p-2 rounded-lg border border-[#DDD3C4] outline-none font-sans"
              />
            </div>

            <button 
              onClick={handleSendWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-[#2F5D48] hover:bg-[#254b3a] text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Reenviar Estado por WhatsApp</span>
            </button>

            {whatsappSent && (
              <div className="p-2.5 bg-[#EDF3F0] text-[#2F5D48] text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>¡WhatsApp abierto con la plantilla de despacho lista!</span>
              </div>
            )}
          </div>

          {/* Support Box */}
          <div className="bg-[#F5EFEB] rounded-2xl p-4 border border-[#DDD3C4] space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#5C3D2E] text-[20px]">support_agent</span>
              <h3 className="font-bold text-[#1F1B18]">Soporte de Logística y Envíos</h3>
            </div>
            <p className="text-[#50443F] text-[11px] leading-relaxed">
              ¿Necesitas reprogramar el horario de visita o cambiar a retiro en sucursal Rosario Centro? Nuestro equipo de expedición te asiste sin intermediarios.
            </p>
            <div className="space-y-1.5 pt-1">
              <a 
                href="mailto:logistica@tierraatelier.com"
                className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-[#DDD3C4] text-[#1F1B18] font-bold hover:bg-[#FAF7F2] transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#5C3D2E] text-[16px]">mail</span>
                  <span>Mesa de Ayuda de Envíos</span>
                </span>
                <span className="material-symbols-outlined text-[#82746E] text-[16px]">arrow_forward</span>
              </a>
              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-[#DDD3C4] text-[#1F1B18]">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-[#2F5D48] text-[16px]">call</span>
                  <span>Línea Directa Taller</span>
                </span>
                <span className="text-[#50443F] font-mono text-[11px]">(011) 4772-9800</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
