import React, { useState } from 'react';
import { ScreenId } from '../types';

interface ShippingLabelProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ShippingLabel: React.FC<ShippingLabelProps> = ({ onNavigate }) => {
  const [carrier, setCarrier] = useState<'correo' | 'oca'>('correo');
  const [includeRemito, setIncludeRemito] = useState(true);
  const [printFormat, setPrintFormat] = useState('Rollo Térmico 10x15 cm (Zebra)');
  const [notificationSent, setNotificationSent] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const trackingCode = carrier === 'correo' ? 'CA-892401824AR' : 'OCA-772910411-BA';
  const transportName = carrier === 'correo' ? 'CORREO ARGENTINO' : 'OCA PAQUETERÍA';

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const handleNotifyWhatsApp = () => {
    setNotificationSent(true);
    const msg = `¡Hola Camila! Desde Tierra Atelier te notificamos que tu pedido #PO-2024-884 fue despachado vía ${transportName}. Tu código de guía es ${trackingCode}. Podés seguirlo en vivo aquí: https://tierraatelier.com/track/${trackingCode}`;
    window.open(`https://wa.me/5491158429912?text=${encodeURIComponent(msg)}`, '_blank');
    setTimeout(() => setNotificationSent(false), 4000);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-4">
      {/* Top Banner Card */}
      <div className="bg-[#F5EFEB] border border-[#DDD3C4]/80 p-4 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 bg-[#EDF3F0] text-[#2F5D48] border border-[#2F5D48]/20 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D48]"></span>
              Listo para despacho
            </span>
            <span className="text-xs text-[#50443F] font-medium">B2B Wholesale</span>
          </div>
          <span className="text-xs text-[#50443F]">Hoy, 14:30 hs</span>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-[#5C3D2E] tracking-tight">
            Etiqueta y Despacho Mayorista - Pedido #PO-2024-884
          </h2>
          <div className="flex items-center gap-1.5 mt-0.5 text-[#50443F]">
            <span className="material-symbols-outlined text-[16px] text-[#6B4226]">storefront</span>
            <span className="text-xs text-[#1F1B18] font-semibold">Boutique Palermo Chic</span>
            <span className="text-xs text-[#50443F]">· Rosario, Santa Fe</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <button 
            onClick={handlePrint}
            className="w-full h-11 bg-[#5C3D2E] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#43271A] transition-all active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Imprimir Etiqueta Oficial (A4 / Térmica 10x15)</span>
          </button>
          <button 
            onClick={handleDownloadPDF}
            className="w-full h-10 bg-[#EFE8DD] border border-[#DDD3C4] text-[#43271A] rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#E6DCCF] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#5C3D2E]">download</span>
            <span>Descargar Rótulo en PDF</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-2.5 bg-[#EDF3F0] text-[#2F5D48] text-xs font-bold rounded-lg text-center flex items-center justify-center gap-1.5 animate-in fade-in">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Rótulo Oficial #PO-2024-884 generado en PDF formato vector.</span>
          </div>
        )}
      </div>

      {/* Transportista Asignado */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#5C3D2E] text-[18px]">local_shipping</span>
            <span className="text-sm font-bold text-[#1F1B18]">Transportista Asignado</span>
          </div>
          <span className="text-[10px] text-[#2F5D48] bg-[#EDF3F0] border border-[#2F5D48]/20 px-2 py-0.5 rounded-full font-bold">
            Guía Oficial Activa
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-[#EFE8DD]/80 border border-[#DDD3C4] p-1 rounded-xl">
          <button
            onClick={() => setCarrier('correo')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              carrier === 'correo'
                ? 'bg-[#FAF7F2] text-[#5C3D2E] shadow-sm border border-[#DDD3C4]/60'
                : 'text-[#50443F] hover:text-[#1F1B18]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">local_post_office</span>
            <span>Correo Argentino B2B</span>
          </button>
          <button
            onClick={() => setCarrier('oca')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              carrier === 'oca'
                ? 'bg-[#FAF7F2] text-[#5C3D2E] shadow-sm border border-[#DDD3C4]/60'
                : 'text-[#50443F] hover:text-[#1F1B18]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">electric_bolt</span>
            <span>OCA Encomiendas</span>
          </button>
        </div>
      </div>

      {/* Rótulo Oficial de Despacho (10x15cm) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#5C3D2E] text-[18px]">label</span>
            <span className="text-sm font-bold text-[#1F1B18]">Rótulo Oficial de Despacho</span>
          </div>
          <span className="text-[10px] text-[#50443F] bg-[#EFE8DD] border border-[#DDD3C4] px-2 py-0.5 rounded-full font-mono">
            10 x 15 cm
          </span>
        </div>

        {/* The Printable Label Box */}
        <div className="bg-white text-black p-4 rounded-2xl border-2 border-[#5C3D2E] shadow-sm flex flex-col gap-3 font-sans print:border-black">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#5C3D2E] pb-2">
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-wider leading-none text-[#2D1509]">
                {transportName}
              </span>
              <span className="text-[9px] font-bold tracking-widest text-[#5C3D2E] uppercase mt-0.5">
                E-COMMERCE / B2B PRIORITARIO
              </span>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-[10px] font-bold bg-[#43271A] text-white px-2 py-0.5 rounded">
                DESPACHO EXPRESS
              </span>
              <span className="text-[9px] font-mono mt-0.5 text-black">#PO-2024-884</span>
            </div>
          </div>

          {/* Barcode & Tracking */}
          <div className="flex flex-col items-center justify-center py-1 border-b-2 border-[#5C3D2E]/40 gap-1.5">
            <div className="w-full flex items-center justify-center">
              <svg className="w-full h-12 max-w-[280px]" viewBox="0 0 280 50">
                <rect fill="black" height="46" width="4" x="0" y="0"></rect>
                <rect fill="black" height="46" width="2" x="7" y="0"></rect>
                <rect fill="black" height="46" width="6" x="12" y="0"></rect>
                <rect fill="black" height="46" width="3" x="22" y="0"></rect>
                <rect fill="black" height="46" width="7" x="28" y="0"></rect>
                <rect fill="black" height="46" width="2" x="38" y="0"></rect>
                <rect fill="black" height="46" width="5" x="44" y="0"></rect>
                <rect fill="black" height="46" width="3" x="52" y="0"></rect>
                <rect fill="black" height="46" width="8" x="58" y="0"></rect>
                <rect fill="black" height="46" width="2" x="69" y="0"></rect>
                <rect fill="black" height="46" width="4" x="75" y="0"></rect>
                <rect fill="black" height="46" width="6" x="82" y="0"></rect>
                <rect fill="black" height="46" width="3" x="92" y="0"></rect>
                <rect fill="black" height="46" width="5" x="98" y="0"></rect>
                <rect fill="black" height="46" width="2" x="106" y="0"></rect>
                <rect fill="black" height="46" width="7" x="112" y="0"></rect>
                <rect fill="black" height="46" width="3" x="122" y="0"></rect>
                <rect fill="black" height="46" width="6" x="128" y="0"></rect>
                <rect fill="black" height="46" width="2" x="138" y="0"></rect>
                <rect fill="black" height="46" width="4" x="144" y="0"></rect>
                <rect fill="black" height="46" width="6" x="151" y="0"></rect>
                <rect fill="black" height="46" width="3" x="160" y="0"></rect>
                <rect fill="black" height="46" width="5" x="166" y="0"></rect>
                <rect fill="black" height="46" width="7" x="174" y="0"></rect>
                <rect fill="black" height="46" width="2" x="184" y="0"></rect>
                <rect fill="black" height="46" width="4" x="190" y="0"></rect>
                <rect fill="black" height="46" width="6" x="197" y="0"></rect>
                <rect fill="black" height="46" width="2" x="206" y="0"></rect>
                <rect fill="black" height="46" width="7" x="212" y="0"></rect>
                <rect fill="black" height="46" width="4" x="222" y="0"></rect>
                <rect fill="black" height="46" width="5" x="230" y="0"></rect>
                <rect fill="black" height="46" width="3" x="238" y="0"></rect>
                <rect fill="black" height="46" width="8" x="244" y="0"></rect>
                <rect fill="black" height="46" width="2" x="255" y="0"></rect>
                <rect fill="black" height="46" width="6" x="260" y="0"></rect>
                <rect fill="black" height="46" width="4" x="270" y="0"></rect>
                <rect fill="black" height="46" width="4" x="276" y="0"></rect>
              </svg>
            </div>
            <div className="flex items-center justify-between w-full px-2">
              <span className="text-[9px] uppercase font-bold tracking-wider text-black">CÓDIGO DE SEGUIMIENTO:</span>
              <span className="text-sm font-mono font-bold tracking-widest text-[#2D1509]">{trackingCode}</span>
            </div>
          </div>

          {/* Remitente */}
          <div className="p-2 bg-[#FAF7F2] border border-[#DDD3C4] rounded-lg text-[10px] leading-tight flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-[9px] text-[#5C3D2E]">Remitente (Origen)</span>
              <span className="font-mono text-[9px] text-gray-700">CUIT: 30-71829401-8</span>
            </div>
            <span className="font-bold text-xs text-black">Tierra Atelier B2B <span className="text-[10px] font-normal text-gray-700">(Marroquinería &amp; Joyería)</span></span>
            <span className="text-gray-900">Thames 1842, Palermo Soho, CABA (C1414DCF)</span>
            <span className="text-gray-900">Contacto Despachos: +54 9 11 4820-9900</span>
          </div>

          {/* Destinatario */}
          <div className="p-3 bg-white border-2 border-[#5C3D2E] rounded-xl flex flex-col gap-1">
            <div className="flex items-center justify-between border-b border-dashed border-[#DDD3C4] pb-1">
              <span className="font-bold uppercase tracking-widest text-[10px] bg-[#5C3D2E] text-white px-2 py-0.5 rounded">
                Destinatario (Entrega)
              </span>
              <span className="font-bold text-xs font-mono text-black">Rosario, Santa Fe</span>
            </div>
            <div className="flex flex-col mt-0.5">
              <span className="text-sm font-bold tracking-tight text-black">Boutique Palermo Chic</span>
              <span className="text-[11px] font-medium text-gray-800">Att: Camila Rossi · CUIT/DNI: 27-38491024-4</span>
            </div>
            <div className="flex flex-col text-[11px] mt-0.5 leading-snug text-black">
              <span className="font-semibold">Av. Santa Fe 3245, Local 4</span>
              <span>Rosario (CP S2000), Santa Fe</span>
              <span className="font-medium mt-0.5">Tel / WhatsApp: <strong>+54 9 11 5842-9912</strong></span>
            </div>
            <div className="mt-1 pt-1 border-t border-[#DDD3C4] bg-[#FAF7F2] p-1.5 rounded text-[10px] text-[#2D1509]">
              <strong className="font-semibold text-[#5C3D2E]">Observaciones:</strong> Horario comercial boutique 10 a 19 hs. Timbre blanco.
            </div>
          </div>

          {/* Footer Specs */}
          <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-[#DDD3C4] pt-2">
            <div className="flex flex-col">
              <span className="text-[#5C3D2E] text-[9px] uppercase font-semibold">Bulto &amp; Peso</span>
              <span className="font-bold text-black text-xs">1 de 1 · 4.80 kg netos</span>
              <span className="text-gray-700 text-[9px]">Accesorios (Cintos &amp; Collares)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#5C3D2E] text-[9px] uppercase font-semibold">Seguridad &amp; Valor Decl.</span>
              <span className="font-mono font-bold text-black text-xs">Precinto #P-8831</span>
              <span className="text-gray-800 font-semibold">Valor: $184.404 ARS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Configuración de Impresión Rápida */}
      <div className="bg-[#F5EFEB] border border-[#DDD3C4]/60 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2 pb-1 border-b border-[#DDD3C4]/50">
          <span className="material-symbols-outlined text-[#5C3D2E] text-[20px]">tune</span>
          <h3 className="text-sm font-bold text-[#1F1B18]">Configuración de Impresión Rápida</h3>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#1F1B18]">Formato de Salida</span>
              <span className="text-[11px] text-[#50443F]">Seleccioná el soporte físico</span>
            </div>
            <select 
              value={printFormat}
              onChange={e => setPrintFormat(e.target.value)}
              className="bg-[#EFE8DD] border border-[#DDD3C4] text-[#1F1B18] text-xs px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-[#5C3D2E] outline-none"
            >
              <option value="Rollo Térmico 10x15 cm (Zebra)">Rollo Térmico 10x15 cm (Zebra)</option>
              <option value="Hoja A4 estándar (con troquelado)">Hoja A4 estándar (con troquelado)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#DDD3C4]/40">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#1F1B18]">Incluir Remito Interno</span>
              <span className="text-[11px] text-[#50443F]">Imprimir duplicado de control en la misma tirada</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input 
                type="checkbox" 
                checked={includeRemito}
                onChange={e => setIncludeRemito(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-10 h-5 bg-[#EFE8DD] border border-[#DDD3C4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#DDD3C4] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5C3D2E]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        <button 
          onClick={handleNotifyWhatsApp}
          className="w-full h-12 bg-[#2F5D48] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#254b3a] active:scale-[0.99] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>Notificar Despacho a Cliente por WhatsApp</span>
        </button>

        {notificationSent && (
          <div className="p-2.5 bg-[#EDF3F0] text-[#2F5D48] text-xs font-bold rounded-lg text-center flex items-center justify-center gap-1.5 animate-in fade-in">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>¡Notificación enviada por WhatsApp con la guía asignada ({trackingCode})!</span>
          </div>
        )}

        <button 
          onClick={() => onNavigate('validacion-pedido')}
          className="w-full h-10 bg-[#EFE8DD] border border-[#DDD3C4] text-[#43271A] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#E6DCCF] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Volver al Resumen del Pedido</span>
        </button>
      </div>
    </div>
  );
};
