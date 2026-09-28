import React from 'react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#342F2C]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-[#FAF7F2] rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl border border-[#DDD3C4] max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#DDD3C4]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5C3D2E]">straighten</span>
            <h3 className="text-lg font-bold text-[#1F1B18]">Guía de Talles Artesanales</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#EFE8DD] flex items-center justify-center text-[#1F1B18] hover:bg-[#E6DCCF] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-sm text-[#50443F] mt-3 leading-relaxed">
          Medí un cinturón tuyo desde el <strong>vértice interior de la hebilla hasta el orificio central de uso</strong> (no hasta la punta total).
        </p>

        <div className="bg-[#F5EFEB] rounded-xl p-4 my-4 space-y-2.5 border border-[#DDD3C4]/60">
          <div className="flex justify-between items-center py-1.5 text-xs border-b border-[#DDD3C4]">
            <span className="font-bold text-[#1F1B18]">Talle T85</span>
            <span className="text-[#50443F]">85 cm al agujero medio · Pantalón 38 / 40</span>
          </div>
          <div className="flex justify-between items-center py-1.5 text-xs border-b border-[#DDD3C4]">
            <span className="font-bold text-[#1F1B18]">Talle T90</span>
            <span className="text-[#50443F]">90 cm al agujero medio · Pantalón 42 / 44</span>
          </div>
          <div className="flex justify-between items-center py-1.5 text-xs border-b border-[#DDD3C4]">
            <span className="font-bold text-[#1F1B18]">Talle T95</span>
            <span className="text-[#50443F]">95 cm al agujero medio · Pantalón 46 / 48</span>
          </div>
          <div className="flex justify-between items-center py-1.5 text-xs">
            <span className="font-bold text-[#1F1B18]">Talle T100</span>
            <span className="text-[#50443F]">100 cm al agujero medio · Pantalón 50+</span>
          </div>
        </div>

        <div className="p-3 bg-[#EDF3F0] rounded-xl text-[#2F5D48] flex items-center gap-2 text-xs border border-[#2F5D48]/20">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>Perforamos orificios adicionales de calce si dejás una nota en tu pedido.</span>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-3 bg-[#5C3D2E] text-white text-sm font-bold rounded-xl mt-4 hover:bg-[#43271A] transition-colors"
        >
          Entendido, volver a la compra
        </button>
      </div>
    </div>
  );
};
