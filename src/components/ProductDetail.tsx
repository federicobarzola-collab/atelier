import React, { useState } from 'react';
import { SizeGuideModal } from './SizeGuideModal';
import { ScreenId } from '../types';

interface ProductDetailProps {
  onNavigate: (screen: ScreenId) => void;
  onAddToCart: (product: any, size?: string, color?: string, qty?: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onNavigate, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState('Caramelo Natural');
  const [selectedSize, setSelectedSize] = useState('T90');
  const [selectedSizeLabel, setSelectedSizeLabel] = useState('T90 (Cintura 90cm - Pantalón 42/44)');
  const [quantity, setQuantity] = useState(1);
  const [isBundleActive, setIsBundleActive] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const BASE_PRICE = 24500;
  const BUNDLE_PRICE = 17100;

  // Progressive tier pricing logic
  let unitPrice = BASE_PRICE;
  let discountPct = 0;
  let savingsMessage = 'Agregá 1 más para -10%';

  if (quantity === 2) {
    unitPrice = 22050;
    discountPct = 10;
    savingsMessage = '¡Sumá 1 más para -15% y envío!';
  } else if (quantity >= 3 && quantity <= 4) {
    unitPrice = 20825;
    discountPct = 15;
    savingsMessage = quantity === 3 ? 'Sumá 2 más para -25% mayorista' : 'Sumá 1 más para -25% mayorista';
  } else if (quantity >= 5) {
    unitPrice = 18375;
    discountPct = 25;
    savingsMessage = '¡Máximo descuento alcanzado (-25%)!';
  }

  const beltSubtotal = unitPrice * quantity;
  const totalWithBundle = beltSubtotal + (isBundleActive ? BUNDLE_PRICE : 0);

  const handleUpdateQty = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(20, prev + delta)));
  };

  const handleAddToCart = () => {
    setAddSuccess(true);
    onAddToCart({
      id: 'cinto-verona',
      name: 'Cinto Verona Cuero Genuino 35mm',
      sku: 'CTV-204',
      retailPrice: unitPrice,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAko2dwBBHKDveLkxtQ3P5VkzMHbFOPpKnz-WdohtagFxqheSEiPfTfGpB2_hdDqDLuFc7WueOeen5LJEaq2VUzrQKWbhj8Fuq60D8Rqkv5S4ReFt8UY6d61Lydcp5QY1qFHV2RHFxUkybpSBHCt265gLSKljRdE0_Hv6Vtng9Cgn5PX6FotkRVdfjWu7PjTLyST0WwoJJ0G-awGUUfnwH0BZ-tG3t9iS66zpXVO8_hKxh06U2Vj-0'
    }, selectedSize, selectedColor, quantity);

    if (isBundleActive) {
      onAddToCart({
        id: 'collar-atenea-bundle',
        name: 'Collar Atenea Baño 18k',
        sku: 'JOY-ATE-04',
        retailPrice: BUNDLE_PRICE,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKO0dZpwV9mQpJmWCkdEyxrcynb-9lLOqmhcUW2IFvWm4TdTI0uKcjZS_xEP6iQrptBWXiKbayGS7VB7g0HKfhQ2Oe6TH60Y_xDP7x-CVII9uF2G2tZ-lBFqlV5lyDtPm9E85SLstdVeCoscZZSWMQFCxSK4tpEjk7iXx9u7qxFF8POAmPpV9biPysvE1_LFxF916ypxtpeJRF9p2vM30ID3WPoKWY1q_x9c3Etm2mrxTef1TlE-w'
      }, 'Único', 'Dorado 18k', 1);
    }

    setTimeout(() => setAddSuccess(false), 2200);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 pb-28 space-y-4">
      {/* Breadcrumb & Stock Badge */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5 text-xs text-[#50443F]">
          <span onClick={() => onNavigate('tienda')} className="hover:underline cursor-pointer">Cinturones</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#5C3D2E] font-bold">Línea Verona</span>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-[#EDF3F0] text-[#2F5D48] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D48]"></span>
          <span>Stock en Taller (14 disp.)</span>
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#DDD3C4]/60 shadow-sm">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAko2dwBBHKDveLkxtQ3P5VkzMHbFOPpKnz-WdohtagFxqheSEiPfTfGpB2_hdDqDLuFc7WueOeen5LJEaq2VUzrQKWbhj8Fuq60D8Rqkv5S4ReFt8UY6d61Lydcp5QY1qFHV2RHFxUkybpSBHCt265gLSKljRdE0_Hv6Vtng9Cgn5PX6FotkRVdfjWu7PjTLyST0WwoJJ0G-awGUUfnwH0BZ-tG3t9iS66zpXVO8_hKxh06U2Vj-0" 
          alt="Cinto Verona Cuero Genuino 35mm" 
          className="w-full h-full object-cover"
        />
        {/* Badges on image */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="bg-white/90 backdrop-blur-xs text-[#1F1B18] px-2.5 py-0.5 rounded-lg text-[10px] font-bold shadow-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-[#7A4700]">eco</span>
            Curtido Vegetal
          </span>
          <span className="bg-[#5C3D2E] text-white px-2.5 py-0.5 rounded-lg text-[10px] font-bold shadow-xs">
            Hecho a Mano
          </span>
        </div>

        {/* Zoom button */}
        <button 
          onClick={() => alert('Ampliando detalles de confección: cantos encerados con cera de abejas virgen.')}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-xl bg-white/85 backdrop-blur-xs text-[#1F1B18] flex items-center justify-center shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">loupe</span>
        </button>
      </div>

      {/* Title & Ratings */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1F1B18] tracking-tight">
          Cinto Verona Cuero Genuino 35mm
        </h1>
        <p className="text-xs text-[#50443F] leading-relaxed">
          Cuero vacuno pesado flor entera con hebilla de zamak macizo cepillado. Biselado y encerado artesanal.
        </p>
        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="flex text-[#7A4700]">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
          </div>
          <span className="text-xs font-semibold text-[#50443F]">4.9 (68 reseñas de clientes)</span>
        </div>

        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-2xl font-bold text-[#1F1B18]">${unitPrice.toLocaleString('es-AR')}</span>
          <span className="text-xs text-[#50443F]">precio unitario estándar</span>
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#1F1B18] uppercase tracking-wider">Color de Cuero:</span>
          <span className="text-xs font-bold text-[#5C3D2E]">{selectedColor}</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { name: 'Caramelo Natural', hex: '#985E17', label: 'Caramelo' },
            { name: 'Suela Natural', hex: '#D99F66', label: 'Suela' },
            { name: 'Tostado Roble', hex: '#64371F', label: 'Roble' },
            { name: 'Negro Mate', hex: '#211C1A', label: 'Negro' }
          ].map(c => {
            const isSelected = selectedColor === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                  isSelected 
                    ? 'bg-[#EFE8DD] border-[#5C3D2E] shadow-xs' 
                    : 'bg-[#FAF7F2] border-[#DDD3C4]/60 hover:bg-[#EFE8DD]/50'
                }`}
              >
                <span className="w-7 h-7 rounded-full shadow-inner relative flex items-center justify-center" style={{ backgroundColor: c.hex }}>
                  {isSelected && (
                    <span className="material-symbols-outlined text-white text-[14px]">check</span>
                  )}
                </span>
                <span className="text-[11px] font-bold text-[#1F1B18]">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#1F1B18] uppercase tracking-wider">Talle de Cintura:</span>
          <button 
            onClick={() => setIsSizeGuideOpen(true)}
            className="inline-flex items-center gap-1 text-[#5C3D2E] text-xs font-semibold hover:underline"
          >
            <span className="material-symbols-outlined text-[15px]">straighten</span>
            <span>Guía de Talles</span>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'T85', pants: '38-40', label: 'T85 (Cintura 85cm - Pantalón 38/40)' },
            { id: 'T90', pants: '42-44', label: 'T90 (Cintura 90cm - Pantalón 42/44)' },
            { id: 'T95', pants: '46-48', label: 'T95 (Cintura 95cm - Pantalón 46/48)' },
            { id: 'T100', pants: '50+', label: 'T100 (Cintura 100cm - Pantalón 50+)' }
          ].map(sz => {
            const isSelected = selectedSize === sz.id;
            return (
              <button
                key={sz.id}
                onClick={() => {
                  setSelectedSize(sz.id);
                  setSelectedSizeLabel(sz.label);
                }}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                  isSelected 
                    ? 'bg-[#5C3D2E] text-white border-[#5C3D2E] shadow-sm' 
                    : 'bg-[#FAF7F2] text-[#1F1B18] border-[#DDD3C4] hover:bg-[#EFE8DD]'
                }`}
              >
                {sz.id}
                <span className={`block text-[10px] font-normal ${isSelected ? 'text-white/80' : 'text-[#50443F]'}`}>
                  {sz.pants}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-[#50443F] flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-[#2F5D48]">check_circle</span>
          <span>Seleccionado: <strong className="text-[#1F1B18]">{selectedSizeLabel}</strong></span>
        </p>
      </div>

      {/* Cuadro Interactivo de Descuento Progresivo */}
      <div className="bg-[#F5EFEB] border border-[#DDD3C4] p-4 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#5C3D2E] text-[18px]">loyalty</span>
            <span className="text-sm font-bold text-[#1F1B18]">Descuentos Progresivos</span>
          </div>
          <span className="text-[10px] font-bold bg-[#EDF3F0] text-[#2F5D48] px-2 py-0.5 rounded-full border border-[#2F5D48]/20">
            Acumulable por compra
          </span>
        </div>

        {/* Tier rows */}
        <div className="space-y-1.5">
          {/* Row 1 */}
          <div className={`p-2.5 rounded-xl transition-all flex items-center justify-between border ${
            quantity === 1 
              ? 'bg-white border-[#5C3D2E] shadow-xs' 
              : 'bg-[#FAF7F2] border-transparent opacity-75'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#EFE8DD] text-xs font-bold text-[#1F1B18] flex items-center justify-center">1</span>
              <div>
                <p className="text-xs font-bold text-[#1F1B18]">1 unidad</p>
                <p className="text-[10px] text-[#50443F]">Precio regular de catálogo</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#1F1B18]">$24.500</span>
              <span className="text-[10px] text-[#50443F] block">c/u</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className={`p-2.5 rounded-xl transition-all flex items-center justify-between border ${
            quantity === 2 
              ? 'bg-white border-[#5C3D2E] shadow-xs' 
              : 'bg-[#FAF7F2] border-transparent opacity-75'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#EFE8DD] text-xs font-bold text-[#1F1B18] flex items-center justify-center">2</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-[#1F1B18]">2 unidades</p>
                  <span className="bg-[#EDF3F0] text-[#2F5D48] text-[9px] px-1.5 py-0.2 rounded font-bold">-10% OFF</span>
                </div>
                <p className="text-[10px] text-[#2F5D48] font-semibold">Ahorrás $4.900 total</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#2F5D48]">$22.050</span>
              <span className="text-[10px] text-[#50443F] block">c/u</span>
            </div>
          </div>

          {/* Row 3 */}
          <div className={`p-2.5 rounded-xl transition-all flex items-center justify-between border ${
            quantity >= 3 && quantity <= 4 
              ? 'bg-white border-[#5C3D2E] shadow-xs' 
              : 'bg-[#FAF7F2] border-transparent opacity-75'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#EFE8DD] text-xs font-bold text-[#1F1B18] flex items-center justify-center">3-4</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-[#1F1B18]">3 a 4 unidades</p>
                  <span className="bg-[#EDF3F0] text-[#2F5D48] text-[9px] px-1.5 py-0.2 rounded font-bold">-15% OFF</span>
                </div>
                <p className="text-[10px] text-[#2F5D48] font-semibold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px]">local_shipping</span> Envío a sucursal bonificado
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#2F5D48]">$20.825</span>
              <span className="text-[10px] text-[#50443F] block">c/u</span>
            </div>
          </div>

          {/* Row 4 */}
          <div className={`p-2.5 rounded-xl transition-all flex items-center justify-between border ${
            quantity >= 5 
              ? 'bg-white border-[#5C3D2E] shadow-xs' 
              : 'bg-[#FAF7F2] border-transparent opacity-75'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#EFE8DD] text-xs font-bold text-[#1F1B18] flex items-center justify-center">5+</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-[#1F1B18]">5 o más unidades</p>
                  <span className="bg-[#5C3D2E] text-white text-[9px] px-1.5 py-0.2 rounded font-bold">-25% OFF</span>
                </div>
                <p className="text-[10px] text-[#2F5D48] font-semibold">Envío gratis puerta a puerta</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#5C3D2E]">$18.375</span>
              <span className="text-[10px] text-[#50443F] block">c/u</span>
            </div>
          </div>
        </div>

        {/* Stepper Controller */}
        <div className="bg-white p-3 rounded-xl border border-[#DDD3C4]/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#50443F] block">Cantidad</span>
            <span className="text-xs font-bold text-[#5C3D2E]">{savingsMessage}</span>
          </div>
          <div className="flex items-center bg-[#F5EFEB] rounded-xl p-1 border border-[#DDD3C4]/60">
            <button 
              onClick={() => handleUpdateQty(-1)}
              className="w-7 h-7 rounded-lg bg-white shadow-xs text-[#1F1B18] flex items-center justify-center font-bold hover:bg-[#EFE8DD]"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-bold text-[#1F1B18]">{quantity}</span>
            <button 
              onClick={() => handleUpdateQty(1)}
              className="w-7 h-7 rounded-lg bg-white shadow-xs text-[#1F1B18] flex items-center justify-center font-bold hover:bg-[#EFE8DD]"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Bloque Armá tu Set */}
      <div className="bg-[#EFE8DD] border border-[#DDD3C4] rounded-2xl p-4 space-y-2.5">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#7A4700] text-[18px]">auto_awesome</span>
          <h3 className="text-xs font-bold text-[#1F1B18]">Armá tu Set y Ahorrá</h3>
        </div>
        <p className="text-xs text-[#50443F]">
          Llevate el conjunto completo artesanal de cuero y metales dorados con un <strong className="text-[#1F1B18]">10% OFF extra</strong> en el collar complementario.
        </p>

        <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-[#DDD3C4]/60">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKO0dZpwV9mQpJmWCkdEyxrcynb-9lLOqmhcUW2IFvWm4TdTI0uKcjZS_xEP6iQrptBWXiKbayGS7VB7g0HKfhQ2Oe6TH60Y_xDP7x-CVII9uF2G2tZ-lBFqlV5lyDtPm9E85SLstdVeCoscZZSWMQFCxSK4tpEjk7iXx9u7qxFF8POAmPpV9biPysvE1_LFxF916ypxtpeJRF9p2vM30ID3WPoKWY1q_x9c3Etm2mrxTef1TlE-w" 
            alt="Collar Atenea" 
            className="w-14 h-14 rounded-lg object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#1F1B18] truncate">Collar Atenea Baño Dorado 18k</h4>
            <p className="text-[11px] text-[#50443F] truncate">Cadena veneciana de 45cm con eslabón forjado</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-[#5C3D2E]">$17.100</span>
              <span className="text-[10px] text-[#82746E] line-through">$19.000</span>
            </div>
          </div>
          <button
            onClick={() => setIsBundleActive(!isBundleActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isBundleActive 
                ? 'bg-[#2F5D48] text-white shadow-xs' 
                : 'bg-[#EFE8DD] text-[#43271A] hover:bg-[#E6DCCF]'
            }`}
          >
            {isBundleActive ? '✓ Sumado' : '+ Sumar'}
          </button>
        </div>

        {isBundleActive && (
          <div className="p-2 bg-[#EDF3F0] rounded-xl text-[#2F5D48] text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
            <span className="material-symbols-outlined text-[16px]">task_alt</span>
            <span>¡Set activado! Descuento del 10% bonificado en el collar.</span>
          </div>
        )}
      </div>

      {/* Detalles de Confección Noble */}
      <div className="space-y-2.5">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#5C3D2E] tracking-wider">Nobleza y Oficio</span>
          <h3 className="text-sm font-bold text-[#1F1B18]">Detalles de Confección</h3>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-white border border-[#DDD3C4]/60 flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] flex items-center justify-center text-[#5C3D2E] shrink-0">
              <span className="material-symbols-outlined text-[18px]">history_edu</span>
            </div>
            <div>
              <h4 className="font-bold text-[#1F1B18]">Cuero Flor Entera Argentino (3.5 mm)</h4>
              <p className="text-[#50443F] text-[11px] mt-0.5">
                Selección premium de lomo vacuno. Espesor robusto indeformable con curtido tanino vegetal libre de cromo pesado. Envejece adquiriendo una pátina única.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#DDD3C4]/60 flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] flex items-center justify-center text-[#7A4700] shrink-0">
              <span className="material-symbols-outlined text-[18px]">shield</span>
            </div>
            <div>
              <h4 className="font-bold text-[#1F1B18]">Hebilla Maciza de Fundición</h4>
              <p className="text-[#50443F] text-[11px] mt-0.5">
                Aleación pesada libre de níquel, con baño electrolítico latón satinado envejecido. No se despinta ni oxida al contacto con la piel.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#DDD3C4]/60 flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] flex items-center justify-center text-[#2F5D48] shrink-0">
              <span className="material-symbols-outlined text-[18px]">spa</span>
            </div>
            <div>
              <h4 className="font-bold text-[#1F1B18]">Borde Bruñido con Cera de Abejas</h4>
              <p className="text-[#50443F] text-[11px] mt-0.5">
                Cantos redondeados a mano con gubia y sellados mediante fricción de madera y cera orgánica de apicultores locales. No deshilacha.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Help Button */}
      <div className="pt-1 flex justify-end">
        <a 
          href="https://wa.me/5491148209900?text=Hola%20Tierra%20Atelier,%20tengo%20dudas%20sobre%20el%20talle%20del%20Cinto%20Verona"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[#2F5D48] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md hover:bg-[#234737] transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">chat</span>
          <span>Dudas de confección</span>
        </a>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-xl border-t border-[#DDD3C4] p-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold text-[#1F1B18]">${totalWithBundle.toLocaleString('es-AR')}</span>
              {discountPct > 0 && (
                <span className="bg-[#EDF3F0] text-[#2F5D48] text-[9px] px-1.5 py-0.2 rounded font-bold">
                  -{discountPct}%
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#50443F] block">
              {quantity >= 3 ? '¡Envío bonificado a sucursal!' : 'Envío a convenir en checkout'}
            </span>
          </div>

          <button 
            onClick={handleAddToCart}
            className="flex-1 max-w-[210px] h-11 rounded-xl bg-[#5C3D2E] hover:bg-[#43271A] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              {addSuccess ? 'check' : 'shopping_bag'}
            </span>
            <span>{addSuccess ? '¡Agregado!' : 'Agregar a la Bolsa'}</span>
          </button>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal 
        isOpen={isSizeGuideOpen} 
        onClose={() => setIsSizeGuideOpen(false)} 
      />
    </div>
  );
};
