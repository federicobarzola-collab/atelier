import React, { useState } from 'react';
import { PROMO_RULES } from '../data/mockData';
import { PromoRule, ScreenId } from '../types';

interface WholesalePromosProps {
  onNavigate: (screen: ScreenId) => void;
}

export const WholesalePromos: React.FC<WholesalePromosProps> = ({ onNavigate }) => {
  const [promos, setPromos] = useState<PromoRule[]>(PROMO_RULES);
  const [selectedPromoId, setSelectedPromoId] = useState<string>('promo-1');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Editor form state for selected promo
  const selectedPromo = promos.find(p => p.id === selectedPromoId) || promos[0];
  const [formName, setFormName] = useState(selectedPromo.name);
  const [formType, setFormType] = useState(selectedPromo.benefitType);
  const [formValue, setFormValue] = useState(selectedPromo.benefitValue);
  const [formMinUnits, setFormMinUnits] = useState(selectedPromo.minUnits || 15);
  const [formMinAmount, setFormMinAmount] = useState(selectedPromo.minAmount ? `$${selectedPromo.minAmount.toLocaleString('es-AR')}` : '$150.000');
  const [formIsActive, setFormIsActive] = useState(selectedPromo.isActive);
  const [formStackable, setFormStackable] = useState(selectedPromo.accumulativeWithCoupons);

  const handleSelectPromoForEdit = (promo: PromoRule) => {
    setSelectedPromoId(promo.id);
    setFormName(promo.name);
    setFormType(promo.benefitType);
    setFormValue(promo.benefitValue);
    setFormMinUnits(promo.minUnits || 15);
    setFormMinAmount(promo.minAmount ? `$${promo.minAmount.toLocaleString('es-AR')}` : '$150.000');
    setFormIsActive(promo.isActive);
    setFormStackable(promo.accumulativeWithCoupons);
  };

  const handleTogglePromo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPromos(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSaveRule = () => {
    setPromos(prev => prev.map(p => {
      if (p.id === selectedPromoId) {
        return {
          ...p,
          name: formName,
          benefitType: formType,
          benefitValue: formValue,
          minUnits: formMinUnits,
          isActive: formIsActive,
          accumulativeWithCoupons: formStackable
        };
      }
      return p;
    }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const filteredPromos = promos.filter(p => {
    if (activeTab === 'volume' && p.type !== 'descuento_automatico') return false;
    if (activeTab === 'cupones' && p.type !== 'cupon') return false;
    if (activeTab === 'flete' && p.type !== 'flete_bonificado') return false;
    if (activeTab === 'pack' && p.type !== 'pack_especifico') return false;
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Section */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-widest text-[#835425] font-bold">
              Motor de Precios y Condiciones B2B
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EDF3F0] text-[#2F5D48] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D48]"></span>
              {promos.filter(p => p.isActive).length} Activas • {promos.filter(p => !p.isActive).length} Pausadas
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#43271A] tracking-tight">
            Promociones y Descuentos Mayoristas
          </h1>
          <p className="text-xs sm:text-sm text-[#50443F]">
            Configure reglas comerciales por volumen, bonificaciones de flete, cupones para boutiques y descuentos escalonados por curva de talles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <button 
            onClick={() => onNavigate('validacion-pedido')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F5EFEB] hover:bg-[#EFE8DD] text-[#1F1B18] text-xs font-semibold transition-colors shadow-xs border border-[#DDD3C4]/60"
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            Historial de Aplicación
          </button>
          <button 
            onClick={() => alert('Crear nueva regla promocional mayorista B2B...')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5C3D2E] hover:bg-[#43271A] text-white text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Crear Nueva Promoción
          </button>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-2xl bg-white border border-[#DDD3C4]/60 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#50443F] font-bold">Ventas con Promo Activa</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5EFEB] flex items-center justify-center text-[#5C3D2E]">
              <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#43271A]">$4.850.000 <span className="text-xs font-normal text-[#50443F]">ARS</span></div>
            <div className="mt-1 flex items-center gap-1 text-[#2F5D48] text-xs font-semibold">
              <span className="material-symbols-outlined text-[15px]">trending_up</span>
              <span>+22% vs mes anterior</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-2xl bg-white border border-[#DDD3C4]/60 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#50443F] font-bold">Ticket Promedio c/ Escala</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5EFEB] flex items-center justify-center text-[#835425]">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#43271A]">$184.404 <span className="text-xs font-normal text-[#50443F]">ARS</span></div>
            <div className="mt-1 flex items-center gap-1 text-[#50443F] text-xs">
              <span className="material-symbols-outlined text-[15px] text-[#2F5D48]">verified</span>
              <span>Supera umbral mínimo ($50k)</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-2xl bg-white border border-[#DDD3C4]/60 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#50443F] font-bold">Boutiques Beneficiadas</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5EFEB] flex items-center justify-center text-[#43271A]">
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#43271A]">42 <span className="text-xs font-normal text-[#50443F]">locales</span></div>
            <div className="mt-1 flex items-center gap-1 text-[#2F5D48] text-xs font-semibold">
              <span className="material-symbols-outlined text-[15px]">add_circle</span>
              <span>8 cuentas nuevas este ciclo</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-2xl bg-white border border-[#DDD3C4]/60 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#50443F] font-bold">Descuento Promedio</span>
            <div className="w-8 h-8 rounded-xl bg-[#EDF3F0] flex items-center justify-center text-[#2F5D48]">
              <span className="material-symbols-outlined text-[18px]">percent</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#43271A]">14.8%</div>
            <div className="mt-1 flex items-center gap-1 text-[#50443F] text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2F5D48]"></span>
              <span>Margen mayorista protegido (&gt;42%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs & Search */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-[#EFE8DD] rounded-xl overflow-x-auto border border-[#DDD3C4]">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'all' ? 'bg-white text-[#43271A] shadow-xs' : 'text-[#50443F] hover:text-[#43271A]'
            }`}
          >
            Todas ({promos.length})
          </button>
          <button 
            onClick={() => setActiveTab('volume')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'volume' ? 'bg-white text-[#43271A] shadow-xs' : 'text-[#50443F] hover:text-[#43271A]'
            }`}
          >
            Escalas por Volumen
          </button>
          <button 
            onClick={() => setActiveTab('cupones')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'cupones' ? 'bg-white text-[#43271A] shadow-xs' : 'text-[#50443F] hover:text-[#43271A]'
            }`}
          >
            Cupones B2B
          </button>
          <button 
            onClick={() => setActiveTab('flete')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'flete' ? 'bg-white text-[#43271A] shadow-xs' : 'text-[#50443F] hover:text-[#43271A]'
            }`}
          >
            Bonificación Flete
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#82746E] text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Buscar promo o cupón..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-[#DDD3C4] text-[#1F1B18] placeholder:text-[#82746E] outline-none shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* Main Grid: Promo List (7 cols) + Config Side Panel (5 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left List */}
        <div className="xl:col-span-7 space-y-4">
          {filteredPromos.map(promo => {
            const isSelected = promo.id === selectedPromoId;
            return (
              <article 
                key={promo.id}
                onClick={() => handleSelectPromoForEdit(promo)}
                className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-[#5C3D2E] shadow-md ring-2 ring-[#5C3D2E]/20'
                    : 'border-[#DDD3C4] shadow-xs hover:border-[#5C3D2E]/50'
                } ${!promo.isActive ? 'opacity-85' : ''}`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-[#F5EFEB] text-[#5C3D2E] text-[10px] uppercase tracking-wider font-bold">
                        {promo.type === 'descuento_automatico' && 'Descuento Automático'}
                        {promo.type === 'flete_bonificado' && 'Flete Bonificado'}
                        {promo.type === 'cupon' && 'Código de Cupón'}
                        {promo.type === 'pack_especifico' && 'Pack Específico'}
                      </span>
                      {promo.isActive ? (
                        <span className="inline-flex items-center gap-1 text-[#2F5D48] text-[10px] bg-[#EDF3F0] px-2 py-0.5 rounded-full font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D48] animate-pulse"></span> Activa
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[#82746E] text-[10px] bg-[#EFE8DD] px-2 py-0.5 rounded-full font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#82746E]"></span> Pausada manualmente
                        </span>
                      )}
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer" onClick={e => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={promo.isActive}
                        onChange={(e) => handleTogglePromo(promo.id, e as unknown as React.MouseEvent)}
                        className="sr-only peer" 
                      />
                      <div className="w-10 h-5 bg-[#E6DCCF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5C3D2E]"></div>
                    </label>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-[#43271A]">{promo.name}</h2>
                      {isSelected && (
                        <span className="px-2 py-0.2 rounded bg-[#E6DCCF] text-[#43271A] text-[10px] font-bold">
                          Editando ahora
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#50443F] mt-1">{promo.description}</p>
                  </div>

                  {/* Coupon Code Pill if present */}
                  {promo.code && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4]/60">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#50443F]">Código:</span>
                        <span className="font-mono text-xs font-bold text-[#43271A] tracking-wider">{promo.code}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyCoupon(promo.code!);
                        }}
                        className="inline-flex items-center gap-1 text-xs text-[#5C3D2E] font-bold hover:underline"
                      >
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        <span>{copiedCode ? '¡Copiado!' : 'Copiar código'}</span>
                      </button>
                    </div>
                  )}

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#FAF7F2] text-xs">
                    <div>
                      <span className="block text-[10px] text-[#82746E] uppercase font-bold">Alcance</span>
                      <span className="font-semibold text-[#43271A]">{promo.scope}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#82746E] uppercase font-bold">Vigencia</span>
                      <span className="font-semibold text-[#43271A]">{promo.validity}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="block text-[10px] text-[#82746E] uppercase font-bold">Uso este mes</span>
                      <span className="font-semibold text-[#2F5D48]">{promo.usageThisMonth}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#82746E]">Prioridad de motor: #1</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Regla "${promo.name}" duplicada como borrador.`);
                        }}
                        className="px-2.5 py-1 rounded-lg text-[#50443F] hover:text-[#43271A] text-xs hover:bg-[#FAF7F2] transition-colors inline-flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[15px]">content_copy</span> Duplicar
                      </button>
                      <button 
                        onClick={() => handleSelectPromoForEdit(promo)}
                        className="px-3 py-1 rounded-lg bg-[#5C3D2E] text-white text-xs font-bold shadow-xs inline-flex items-center gap-1 hover:bg-[#43271A] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[15px]">tune</span> Modificar
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Right Editor Side Panel (5 cols) */}
        <aside className="xl:col-span-5 sticky top-28 rounded-2xl bg-white border border-[#DDD3C4] p-5 shadow-lg space-y-4">
          <div className="flex items-start justify-between pb-2 border-b border-[#DDD3C4]">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5C3D2E]"></span>
                <span className="text-[10px] uppercase tracking-wider text-[#835425] font-bold">
                  Configuración de Regla Activa
                </span>
              </div>
              <h3 className="text-base font-bold text-[#43271A]">Editar: {selectedPromo.name}</h3>
            </div>
            <span className="text-xs bg-[#EDF3F0] text-[#2F5D48] px-2 py-0.5 rounded-full font-bold">
              ID: {selectedPromo.id}
            </span>
          </div>

          <div className="space-y-3.5 text-xs text-[#1F1B18]">
            {/* Toggle Status */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4]/60">
              <div>
                <span className="font-bold text-[#43271A] block">Estado de la Regla</span>
                <span className="text-[11px] text-[#50443F]">Visible y aplicable en el checkout mayorista</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formIsActive}
                  onChange={e => setFormIsActive(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-10 h-5 bg-[#E6DCCF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2F5D48]"></div>
              </label>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label className="block font-bold text-[#1F1B18]">Nombre de la Promoción</label>
              <input 
                type="text" 
                value={formName}
                onChange={e => setFormName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4] text-[#1F1B18] font-medium outline-none focus:ring-1 focus:ring-[#5C3D2E]"
              />
            </div>

            {/* Benefit Type & Value */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block font-bold text-[#1F1B18]">Tipo de Beneficio</label>
                <select 
                  value={formType}
                  onChange={e => setFormType(e.target.value as unknown as PromoRule['benefitType'])}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4] text-[#1F1B18] outline-none"
                >
                  <option value="percentage">Porcentaje (%)</option>
                  <option value="fixed">Monto Fijo ($)</option>
                  <option value="free_units">Unidades Bonificadas</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-[#1F1B18]">Valor Descuento</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={formValue}
                    onChange={e => setFormValue(Number(e.target.value))}
                    className="w-full pl-3 pr-8 py-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4] font-bold text-base text-[#43271A] outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#82746E] font-bold">%</span>
                </div>
              </div>
            </div>

            {/* Activation Conditions */}
            <div className="p-3 rounded-xl bg-[#F5EFEB] border border-[#DDD3C4]/60 space-y-2">
              <span className="block font-bold text-[#43271A]">Condiciones de Activación</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#50443F] font-semibold">Mínimo Unidades</span>
                  <input 
                    type="number" 
                    value={formMinUnits}
                    onChange={e => setFormMinUnits(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#DDD3C4] font-medium text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#50443F] font-semibold">Monto Mínimo (ARS)</span>
                  <input 
                    type="text" 
                    value={formMinAmount}
                    onChange={e => setFormMinAmount(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#DDD3C4] font-medium text-xs outline-none"
                  />
                </div>
              </div>
              <span className="block text-[10px] text-[#82746E]">Se dispara al cumplirse cualquiera de los dos criterios.</span>
            </div>

            {/* Categorías Incluidas */}
            <div className="space-y-1">
              <label className="block font-bold text-[#1F1B18]">Categorías Incluidas en la Escala</label>
              <div className="space-y-1.5 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#5C3D2E] w-4 h-4 rounded" />
                  <span className="text-xs text-[#1F1B18]">Cintos Cuero Vacuno Curtido Vegetal</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#5C3D2E] w-4 h-4 rounded" />
                  <span className="text-xs text-[#1F1B18]">Collares &amp; Dijes de Autor</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#5C3D2E] w-4 h-4 rounded" />
                  <span className="text-xs text-[#1F1B18]">Herrajes &amp; Hebillas Zamak Premium</span>
                </label>
              </div>
            </div>

            {/* Stackable */}
            <div className="flex items-center justify-between py-1 border-t border-[#DDD3C4]/50">
              <div>
                <span className="font-bold text-[#1F1B18] block">Acumulable con Cupones</span>
                <span className="text-[11px] text-[#50443F]">Permite sumar códigos de bienvenida</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formStackable}
                  onChange={e => setFormStackable(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-10 h-5 bg-[#E6DCCF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5C3D2E]"></div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#DDD3C4]">
            <button 
              onClick={() => handleSelectPromoForEdit(selectedPromo)}
              className="px-4 py-2 rounded-xl bg-[#EFE8DD] hover:bg-[#E6DCCF] text-[#43271A] text-xs font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSaveRule}
              className="px-5 py-2 rounded-xl bg-[#5C3D2E] hover:bg-[#43271A] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              Guardar Cambios
            </button>
          </div>

          {saveSuccess && (
            <div className="p-2.5 bg-[#EDF3F0] text-[#2F5D48] text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 animate-in fade-in">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>¡Regla "{formName}" actualizada y publicada en el checkout!</span>
            </div>
          )}
        </aside>
      </div>

      {/* Salvaguarda Automática Banner */}
      <section className="p-4 rounded-2xl bg-[#F5EFEB] border border-[#DDD3C4] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E6DCCF] flex items-center justify-center text-[#43271A] shrink-0">
            <span className="material-symbols-outlined text-[28px]">shield</span>
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-[#43271A]">Salvaguarda Automática de Margen Atelier</h4>
            <p className="text-xs text-[#50443F]">
              El sistema bloqueará cualquier superposición de promociones que reduzca el margen bruto mayorista por debajo del 38% sobre el costo de producción artesanal.
            </p>
          </div>
        </div>
        <button 
          onClick={() => alert('Límite de salvaguarda de margen fijado en 38% sobre costo de curtiembre.')}
          className="whitespace-nowrap px-4 py-2 rounded-xl bg-white text-[#43271A] text-xs font-bold shadow-xs border border-[#DDD3C4] hover:bg-[#FAF7F2] transition-colors"
        >
          Configurar Umbrales
        </button>
      </section>
    </div>
  );
};
