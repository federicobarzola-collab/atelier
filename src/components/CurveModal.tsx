import React, { useState } from 'react';

interface CurveModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  onConfirm: (curve: { T85: number; T90: number; T95: number; T100: number }, totalUnits: number) => void;
}

export const CurveModal: React.FC<CurveModalProps> = ({
  isOpen,
  onClose,
  productName,
  onConfirm
}) => {
  const [quantities, setQuantities] = useState({
    T85: 4,
    T90: 6,
    T95: 4,
    T100: 2
  });

  if (!isOpen) return null;

  const handleQtyChange = (size: 'T85' | 'T90' | 'T95' | 'T100', delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [size]: Math.max(0, prev[size] + delta)
    }));
  };

  const totalUnits = quantities.T85 + quantities.T90 + quantities.T95 + quantities.T100;
  // Tier logic: <12 => $7.200, >=12 => $6.100, >=24 => $5.800
  let unitPrice = 7200;
  let tierLabel = 'Escala Tier 1 ($7.200/u)';
  if (totalUnits >= 24) {
    unitPrice = 5800;
    tierLabel = 'Desbloquea Escala Tier 3 Máxima ($5.800/u -20%)';
  } else if (totalUnits >= 12) {
    unitPrice = 6100;
    tierLabel = 'Desbloquea Escala Tier 2 ($6.100/u)';
  }

  const subtotal = totalUnits * unitPrice;

  return (
    <div className="fixed inset-0 z-50 bg-[#342F2C]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] border border-[#DDD3C4] max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 bg-[#EFE8DD] border-b border-[#DDD3C4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5C3D2E]">straighten</span>
            <h3 className="text-[17px] font-bold text-[#43271A]">Carga de Curva: {productName}</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#82746E] hover:text-[#43271A] hover:bg-[#E6DCCF] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-[#50443F] leading-relaxed">
            Ingresá la cantidad deseada por talle para completar tu pack mayorista. Se aplicará automáticamente la tarifa según el volumen total sumado.
          </p>

          {/* Stepper Table */}
          <div className="space-y-2">
            <div className="grid grid-cols-4 text-[11px] uppercase tracking-wider font-bold text-[#82746E] px-2">
              <span>Talle</span>
              <span>Cintura</span>
              <span>Stock</span>
              <span className="text-right">Cantidad</span>
            </div>

            {/* T85 */}
            <div className="grid grid-cols-4 items-center p-2.5 rounded-xl bg-[#F5EFEB] border border-[#DDD3C4]/60">
              <span className="text-sm font-bold text-[#43271A]">T85</span>
              <span className="text-xs text-[#50443F]">80-85cm</span>
              <span className="text-[11px] text-[#2F5D48] font-semibold">42 disp.</span>
              <div className="flex items-center justify-end gap-1.5">
                <button 
                  onClick={() => handleQtyChange('T85', -1)}
                  className="w-7 h-7 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4] font-bold text-[#43271A] flex items-center justify-center hover:bg-[#E6DCCF] transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-[#1F1B18]">{quantities.T85}</span>
                <button 
                  onClick={() => handleQtyChange('T85', 1)}
                  className="w-7 h-7 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4] font-bold text-[#43271A] flex items-center justify-center hover:bg-[#E6DCCF] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* T90 */}
            <div className="grid grid-cols-4 items-center p-2.5 rounded-xl bg-[#F5EFEB] border border-[#DDD3C4]/60">
              <span className="text-sm font-bold text-[#43271A]">T90</span>
              <span className="text-xs text-[#50443F]">85-90cm</span>
              <span className="text-[11px] text-[#2F5D48] font-semibold">58 disp.</span>
              <div className="flex items-center justify-end gap-1.5">
                <button 
                  onClick={() => handleQtyChange('T90', -1)}
                  className="w-7 h-7 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4] font-bold text-[#43271A] flex items-center justify-center hover:bg-[#E6DCCF] transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-[#1F1B18]">{quantities.T90}</span>
                <button 
                  onClick={() => handleQtyChange('T90', 1)}
                  className="w-7 h-7 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4] font-bold text-[#43271A] flex items-center justify-center hover:bg-[#E6DCCF] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* T95 */}
            <div className="grid grid-cols-4 items-center p-2.5 rounded-xl bg-[#F5EFEB] border border-[#DDD3C4]/60">
              <span className="text-sm font-bold text-[#43271A]">T95</span>
              <span className="text-xs text-[#50443F]">90-95cm</span>
              <span className="text-[11px] text-[#2F5D48] font-semibold">30 disp.</span>
              <div className="flex items-center justify-end gap-1.5">
                <button 
                  onClick={() => handleQtyChange('T95', -1)}
                  className="w-7 h-7 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4] font-bold text-[#43271A] flex items-center justify-center hover:bg-[#E6DCCF] transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-[#1F1B18]">{quantities.T95}</span>
                <button 
                  onClick={() => handleQtyChange('T95', 1)}
                  className="w-7 h-7 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4] font-bold text-[#43271A] flex items-center justify-center hover:bg-[#E6DCCF] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* T100 */}
            <div className="grid grid-cols-4 items-center p-2.5 rounded-xl bg-[#F5EFEB] border border-[#DDD3C4]/60">
              <span className="text-sm font-bold text-[#43271A]">T100</span>
              <span className="text-xs text-[#50443F]">95-105cm</span>
              <span className="text-[11px] text-[#82746E]">12 disp.</span>
              <div className="flex items-center justify-end gap-1.5">
                <button 
                  onClick={() => handleQtyChange('T100', -1)}
                  className="w-7 h-7 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4] font-bold text-[#43271A] flex items-center justify-center hover:bg-[#E6DCCF] transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-[#1F1B18]">{quantities.T100}</span>
                <button 
                  onClick={() => handleQtyChange('T100', 1)}
                  className="w-7 h-7 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4] font-bold text-[#43271A] flex items-center justify-center hover:bg-[#E6DCCF] transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Subtotal preview */}
          <div className="p-3.5 rounded-xl bg-[#E6DCCF] border border-[#DDD3C4] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#50443F] block font-medium">Subtotal Curva ({totalUnits} uds):</span>
              <span className="text-xs font-bold text-[#2F5D48]">{tierLabel}</span>
            </div>
            <span className="text-lg font-bold text-[#43271A]">${subtotal.toLocaleString('es-AR')}</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                onConfirm(quantities, totalUnits);
                onClose();
              }}
              disabled={totalUnits === 0}
              className="flex-1 py-3 rounded-xl bg-[#5C3D2E] text-white text-sm font-bold shadow-sm hover:bg-[#6B4226] transition-all disabled:opacity-50"
            >
              Añadir {totalUnits} uds al Pedido
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-[#EFE8DD] text-[#43271A] text-sm font-semibold border border-[#DDD3C4] hover:bg-[#E6DCCF] transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
