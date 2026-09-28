import React, { useState } from 'react';
import { ScreenId } from '../types';

interface PriceStrategyAdminProps {
  onNavigate: (screen: ScreenId) => void;
}

export const PriceStrategyAdmin: React.FC<PriceStrategyAdminProps> = ({ onNavigate }) => {
  const [minMargin, setMinMargin] = useState<number>(48);
  const [bonusPerExtraUnit, setBonusPerExtraUnit] = useState<number>(2.5);
  const [couponBehavior, setCouponBehavior] = useState<string>('stack');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const [tiers, setTiers] = useState([
    {
      id: 'tier-duo',
      num: 1,
      name: 'Nivel Dúo',
      unitsBadge: '2 unidades exactas',
      status: 'Activo en Tienda',
      description: 'Ideal para comprar cinto + gargantilla haciendo juego o regalo doble.',
      discount: '10% OFF Automático',
      perk: 'Envío Estándar calculado por CP',
      isActive: true
    },
    {
      id: 'tier-trio',
      num: 2,
      name: 'Nivel Trío / Set Regalería',
      unitsBadge: '3 a 4 unidades',
      status: 'Activo en Tienda',
      description: 'Estimula la adición de pulseras o llaveros de cuero para llegar al umbral de 3 piezas.',
      discount: '15% OFF en toda la bolsa',
      perk: '50% Bonificado en Envío a Sucursal',
      isHero: true,
      isActive: true
    },
    {
      id: 'tier-pack',
      num: 3,
      name: 'Nivel Pack Amigos / Familia',
      unitsBadge: '5 o más unidades',
      status: 'Activo en Tienda',
      description: 'Máximo beneficio minorista para compras grupales, eventos familiares o regalos de fin de año.',
      discount: '25% OFF Directo',
      perk: 'Envío Gratis Correo Argentino / OCA',
      isActive: true
    }
  ]);

  const handleToggleTier = (id: string) => {
    setTiers(prev => prev.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t));
  };

  const handlePublish = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Strategy Section */}
      <div className="relative overflow-hidden bg-[#F5EFEB] border border-[#DDD3C4] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="max-w-3xl space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#EDF3F0] text-[#2F5D48] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2F5D48] animate-pulse"></span>
                Modo Tienda Online Abierta
              </span>
              <span className="text-xs text-[#82746E]">Actualizado hace 12 min</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F1B18] tracking-tight">
              Estrategia de Precios &amp; Descuentos por Cantidad
            </h1>
            <p className="text-xs sm:text-sm text-[#50443F] max-w-2xl leading-relaxed">
              Configurá los descuentos escalonados para que cualquier cliente compre desde 1 unidad y aumente su ticket adquiriendo múltiples piezas o armando sets para regalo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button 
              onClick={() => onNavigate('promociones-b2b')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EFE8DD] text-[#43271A] hover:bg-[#E6DCCF] text-xs font-bold transition-colors border border-[#DDD3C4]"
            >
              <span className="material-symbols-outlined text-[18px]">history</span>
              Historial de Versiones
            </button>
            <button 
              onClick={() => onNavigate('tienda')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5C3D2E] text-white hover:bg-[#43271A] text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              Vista Previa en Tienda
            </button>
          </div>
        </div>
      </div>

      {/* Live Performance Metrics Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-2xl border border-[#DDD3C4]/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#50443F] uppercase tracking-wider">Ticket Promedio Actual</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5EFEB] flex items-center justify-center text-[#5C3D2E]">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1F1B18] tracking-tight">$48.200</span>
              <span className="text-xs text-[#82746E]">ARS</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#2F5D48] text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+34%</span>
              <span className="text-[#50443F] font-normal">gracias a combos</span>
            </div>
          </div>
          <div className="h-8 w-full pt-1 opacity-80">
            <svg className="w-full h-full text-[#2F5D48]" fill="none" preserveAspectRatio="none" viewBox="0 0 100 24">
              <path d="M0 20 Q 25 18, 40 12 T 75 6 T 100 2" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M0 20 Q 25 18, 40 12 T 75 6 T 100 2 L 100 24 L 0 24 Z" fill="currentColor" fillOpacity="0.12"></path>
            </svg>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-2xl border border-[#DDD3C4]/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#50443F] uppercase tracking-wider">Prendas por Pedido</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5EFEB] flex items-center justify-center text-[#5C3D2E]">
              <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1F1B18] tracking-tight">2.8</span>
              <span className="text-xs text-[#50443F]">uds.</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#2F5D48] text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              <span>+0.9</span>
              <span className="text-[#50443F] font-normal">vs. venta unitaria</span>
            </div>
          </div>
          <div className="w-full bg-[#E6DCCF] h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-[#5C3D2E] h-full rounded-full transition-all duration-500" style={{ width: '70%' }}></div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-2xl border border-[#DDD3C4]/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#50443F] uppercase tracking-wider">Ventas con Descuento</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5EFEB] flex items-center justify-center text-[#5C3D2E]">
              <span className="material-symbols-outlined text-[18px]">percent</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1F1B18] tracking-tight">74%</span>
              <span className="text-xs text-[#50443F]">de órdenes</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#50443F] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#7A4700]"></span>
              <span>Principalmente Trío Regalo (46%)</span>
            </div>
          </div>
          <div className="flex gap-1 h-2 rounded-full overflow-hidden mt-2 bg-[#E6DCCF]">
            <div className="bg-[#5C3D2E] h-full" style={{ width: '46%' }} title="Trío"></div>
            <div className="bg-[#2F5D48] h-full" style={{ width: '28%' }} title="Dúo"></div>
            <div className="bg-[#82746E] h-full" style={{ width: '26%' }} title="Amigos"></div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-2xl border border-[#DDD3C4]/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#50443F] uppercase tracking-wider">Conversión Checkout</span>
            <div className="w-8 h-8 rounded-xl bg-[#EDF3F0] flex items-center justify-center text-[#2F5D48]">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1F1B18] tracking-tight">4.2%</span>
              <span className="text-xs text-[#2F5D48] font-bold">Tasa récord</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#50443F] text-xs">
              <span className="material-symbols-outlined text-[14px] text-[#2F5D48]">flash_on</span>
              <span>Sin fricción B2B forzada</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#50443F] pt-1">
            <span>Benchmark: 2.1%</span>
            <span className="text-[#2F5D48] font-bold">2.0x</span>
          </div>
        </div>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Volume Tiers & Pre-assembled Bundles (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tiers Module */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#DDD3C4] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DDD3C4]/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#5C3D2E] text-[20px]">tune</span>
                  <h2 className="text-lg font-bold text-[#1F1B18]">Escalas de Volumen Activas</h2>
                </div>
                <p className="text-xs text-[#50443F]">
                  Reglas automáticas aplicadas en el carrito según el número de accesorios elegidos.
                </p>
              </div>
              <button 
                onClick={() => alert('Abrir modal para agregar nuevo escalón de volumen...')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#F5EFEB] hover:bg-[#EFE8DD] text-[#1F1B18] text-xs font-bold border border-[#DDD3C4] transition-colors self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                Agregar Nuevo Nivel
              </button>
            </div>

            <div className="space-y-3">
              {tiers.map(tier => (
                <div 
                  key={tier.id}
                  className={`rounded-2xl p-4 transition-all relative overflow-hidden border ${
                    tier.isHero 
                      ? 'bg-[#F5EFEB] border-[#5C3D2E]/40 ring-1 ring-[#5C3D2E]/20' 
                      : 'bg-[#FAF7F2] border-[#DDD3C4]/60'
                  }`}
                >
                  {tier.isHero && (
                    <div className="absolute top-0 right-0 bg-[#5C3D2E] text-white px-3 py-0.5 rounded-bl-xl text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">stars</span> Más Rendidor (+46% de carritos)
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 md:pt-0">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                        tier.isHero ? 'bg-[#5C3D2E] text-white' : 'bg-[#EFE8DD] text-[#5C3D2E]'
                      }`}>
                        {tier.num}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-[#1F1B18]">{tier.name}</h3>
                          <span className="px-2 py-0.2 rounded bg-[#EFE8DD] text-[#50443F] text-[10px] uppercase font-bold">
                            {tier.unitsBadge}
                          </span>
                          <span className="px-2 py-0.2 rounded bg-[#EDF3F0] text-[#2F5D48] text-[10px] font-bold">
                            {tier.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#50443F]">{tier.description}</p>
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                          <span className="font-bold text-[#5C3D2E]">{tier.discount}</span>
                          <span className="text-[#82746E]">•</span>
                          <span className="text-xs text-[#2F5D48] font-semibold">{tier.perk}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={tier.isActive} 
                          onChange={() => handleToggleTier(tier.id)}
                          className="sr-only peer" 
                        />
                        <div className="w-10 h-5 bg-[#E6DCCF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5C3D2E]"></div>
                      </label>
                      <button 
                        onClick={() => alert(`Configuración de ${tier.name}`)}
                        className="w-8 h-8 rounded-lg bg-white border border-[#DDD3C4] text-[#1F1B18] flex items-center justify-center hover:bg-[#F5EFEB] transition-colors"
                        title="Editar nivel"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combos & Packs Pre-armados */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#DDD3C4] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#5C3D2E] text-[20px]">inventory_2</span>
                  <h2 className="text-lg font-bold text-[#1F1B18]">Combos &amp; Packs Pre-armados</h2>
                </div>
                <p className="text-xs text-[#50443F]">
                  Productos agrupados en un solo SKU que aplican una ventaja de precio sin exigir selección manual.
                </p>
              </div>
              <button 
                onClick={() => alert('Crear nuevo combo prearmado')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#5C3D2E] text-white hover:bg-[#43271A] text-xs font-bold transition-colors shadow-xs self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                Crear Nuevo Combo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Combo 1 */}
              <div className="bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#DDD3C4]/60 shadow-xs flex flex-col group hover:shadow-sm transition-all">
                <div className="relative h-44 w-full overflow-hidden bg-[#EFE8DD]">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSMc2liUIHsjVUR9w4LGZj5DoeD1uITxwAhfFsxd0M6SQneWlpOTFS7wCsKp2y7_j47trakJWWcPYELylXpDjXl5zx2TZ3X21bHmjulo_9VIxipcguTup3sDeiSzoO7mNyuK1SqNkB1WozVCKo4POKXsyHJshgyJ-J72J3VH4y_XRsKIRz53QVgUy8tsRc08AzD6WUx8rMKkg8wyMim223VoL3-E4phmw_R7QUyK3OpwSLG8EWq6s" 
                    alt="Set Atemporal Cinto Verona + Collar Atenea" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-[#1F1B18]">
                    1 Cinto + 1 Collar
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-[#5C3D2E] text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
                    Ahorro $6.500 ARS
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="uppercase tracking-wider text-[#82746E] font-bold">Set de Temporada</span>
                      <span className="text-[#2F5D48] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D48]"></span> En Stock (28 sets)
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1F1B18]">Set Atemporal: Cinto Verona + Collar Atenea</h4>
                    <p className="text-xs text-[#50443F]">
                      Cuero curtido al vegetal color habano y gargantilla en fundición de bronce pulido a mano.
                    </p>
                  </div>

                  <div className="pt-2 space-y-3">
                    <div className="flex items-baseline justify-between bg-white p-2.5 rounded-xl border border-[#DDD3C4]/60">
                      <div>
                        <span className="text-[10px] text-[#82746E] block">Precio Combo</span>
                        <span className="text-lg font-bold text-[#1F1B18]">$36.900</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#82746E] line-through block">$43.400</span>
                        <span className="text-[11px] text-[#2F5D48] font-bold">15% Descuento</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onNavigate('detalle-producto')}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#EFE8DD] hover:bg-[#E6DCCF] text-[#43271A] text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit_note</span>
                        Editar Contenido
                      </button>
                      <button 
                        onClick={() => alert('Combo pausado')}
                        className="w-8 h-8 rounded-xl bg-[#EFE8DD] hover:bg-[#E6DCCF] text-[#43271A] flex items-center justify-center"
                        title="Pausar Combo"
                      >
                        <span className="material-symbols-outlined text-[16px]">pause</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Combo 2 */}
              <div className="bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#DDD3C4]/60 shadow-xs flex flex-col group hover:shadow-sm transition-all">
                <div className="relative h-44 w-full overflow-hidden bg-[#EFE8DD]">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIvI5pDTBe40LFmXWDycjDM0jrzkrZCwjsVftTd6nG1q7s1WU3XqJx11edxdhxgCPARxN39MsXGDT2D97L0dcJWFuIaP01UAmK_Ix_YAP2TWm3xD-MSfKQ-aObUV9lbhkXWFlNnjotf29HGVEAv6lyqmentMkmbo8UuN-5Zczy4YS2iDJZ6VNb6kXGDGcnUDWfeK4_OHhY1jVrpTe1n92lOa4iGKnk83b-8RsG1PE2WldQNFTwbXo" 
                    alt="Pack 3 Cinturones Esenciales" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-[#1F1B18]">
                    3 Cinturones de Colección
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-[#2F5D48] text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
                    20% OFF Pack
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="uppercase tracking-wider text-[#82746E] font-bold">Pack Esencial</span>
                      <span className="text-[#2F5D48] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D48]"></span> En Stock (44 packs)
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1F1B18]">Pack 3 Cinturones Esenciales (Suela, Negro, Caramelo)</h4>
                    <p className="text-xs text-[#50443F]">
                      Trío de cueros bovinos seleccionados con hebilla maciza de níquel cepillado. Talle configurable.
                    </p>
                  </div>

                  <div className="pt-2 space-y-3">
                    <div className="flex items-baseline justify-between bg-white p-2.5 rounded-xl border border-[#DDD3C4]/60">
                      <div>
                        <span className="text-[10px] text-[#82746E] block">Precio Combo</span>
                        <span className="text-lg font-bold text-[#1F1B18]">$52.800</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#82746E] line-through block">$66.000</span>
                        <span className="text-[11px] text-[#2F5D48] font-bold">20% Descuento Fijo</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onNavigate('detalle-producto')}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#EFE8DD] hover:bg-[#E6DCCF] text-[#43271A] text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit_note</span>
                        Editar Contenido
                      </button>
                      <button 
                        onClick={() => alert('Combo pausado')}
                        className="w-8 h-8 rounded-xl bg-[#EFE8DD] hover:bg-[#E6DCCF] text-[#43271A] flex items-center justify-center"
                        title="Pausar Combo"
                      >
                        <span className="material-symbols-outlined text-[16px]">pause</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lateral Control & Calibration Panel (4 cols) */}
        <aside className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#DDD3C4] space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DDD3C4]">
              <span className="material-symbols-outlined text-[#5C3D2E] text-[22px]">settings_suggest</span>
              <h3 className="text-base font-bold text-[#1F1B18]">Ajustes &amp; Calibración</h3>
            </div>
            <p className="text-xs text-[#50443F]">
              Ajustá los límites de margen sobre el costo de taller antes de publicar la escala en el checkout minorista.
            </p>

            <form onSubmit={e => { e.preventDefault(); handlePublish(); }} className="space-y-3.5 text-xs">
              {/* Margin Protection */}
              <div className="space-y-1">
                <label className="font-bold text-[#1F1B18] block">Margen Mínimo Garantizado</label>
                <div className="flex items-center bg-[#FAF7F2] border border-[#DDD3C4] rounded-xl px-3 py-2">
                  <span className="material-symbols-outlined text-[#82746E] text-[18px] mr-2">lock</span>
                  <input 
                    type="number" 
                    value={minMargin}
                    onChange={e => setMinMargin(Number(e.target.value))}
                    className="w-full bg-transparent outline-none font-bold text-sm text-[#1F1B18]" 
                  />
                  <span className="text-[#82746E] font-medium">% markup</span>
                </div>
                <p className="text-[10px] text-[#82746E]">Impide que la suma de cupones supere este umbral.</p>
              </div>

              {/* Bonus per extra unit */}
              <div className="space-y-1">
                <label className="font-bold text-[#1F1B18] block">Bonificación Unidad Adicional (+6 uds)</label>
                <div className="flex items-center bg-[#FAF7F2] border border-[#DDD3C4] rounded-xl px-3 py-2">
                  <span className="material-symbols-outlined text-[#82746E] text-[18px] mr-2">exposure_plus_1</span>
                  <input 
                    type="number" 
                    step="0.5" 
                    value={bonusPerExtraUnit}
                    onChange={e => setBonusPerExtraUnit(Number(e.target.value))}
                    className="w-full bg-transparent outline-none font-bold text-sm text-[#1F1B18]" 
                  />
                  <span className="text-[#82746E] font-medium">% extra/u</span>
                </div>
              </div>

              {/* Exclusions */}
              <div className="space-y-1.5 pt-1">
                <label className="font-bold text-[#1F1B18] block">Exclusiones del Descuento Automático</label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-1.5 rounded-lg bg-[#FAF7F2] cursor-pointer hover:bg-[#F5EFEB] border border-[#DDD3C4]/40">
                    <input type="checkbox" defaultChecked className="accent-[#5C3D2E] w-4 h-4 rounded" />
                    <span className="text-xs text-[#1F1B18]">Edición Limitada "Cobre &amp; Piedra"</span>
                  </label>
                  <label className="flex items-center gap-2 p-1.5 rounded-lg bg-[#FAF7F2] cursor-pointer hover:bg-[#F5EFEB] border border-[#DDD3C4]/40">
                    <input type="checkbox" defaultChecked className="accent-[#5C3D2E] w-4 h-4 rounded" />
                    <span className="text-xs text-[#1F1B18]">Artículos en Outlet / Liquidación final</span>
                  </label>
                  <label className="flex items-center gap-2 p-1.5 rounded-lg bg-[#FAF7F2] cursor-pointer hover:bg-[#F5EFEB] border border-[#DDD3C4]/40">
                    <input type="checkbox" className="accent-[#5C3D2E] w-4 h-4 rounded" />
                    <span className="text-xs text-[#1F1B18]">Hebillas de Plata 925 cinceladas</span>
                  </label>
                </div>
              </div>

              {/* Coupons stacking */}
              <div className="space-y-1">
                <label className="font-bold text-[#1F1B18] block">Comportamiento con Cupones</label>
                <select 
                  value={couponBehavior}
                  onChange={e => setCouponBehavior(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] text-[#1F1B18] rounded-xl p-2.5 outline-none cursor-pointer text-xs"
                >
                  <option value="stack">Acumular cupón bancario (ej: 15% Galicia) sobre subtotal</option>
                  <option value="replace">Aplicar solo el descuento mayor (sin acumulación)</option>
                  <option value="forbid">Desactivar cupones si la orden tiene 3+ piezas</option>
                </select>
              </div>

              {/* Simulator Card */}
              <div className="bg-[#F5EFEB] border border-[#DDD3C4] p-3.5 rounded-xl space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#50443F] uppercase tracking-wider font-bold">Simulador de Impacto</span>
                  <span className="text-[#2F5D48] text-[10px] font-bold">Óptimo</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#1F1B18]">
                  <span>Orden promedio estimada:</span>
                  <span className="font-bold text-[#5C3D2E]">$51.400 ARS</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#50443F]">
                  <span>Margen neto resultante:</span>
                  <span className="text-[#2F5D48] font-bold">52.3%</span>
                </div>
                <div className="w-full bg-[#DDD3C4] h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-[#2F5D48] h-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#5C3D2E] text-white font-bold text-xs hover:bg-[#43271A] transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Guardar y Publicar en Tienda
                </button>
              </div>

              {saveSuccess && (
                <div className="p-2.5 bg-[#EDF3F0] text-[#2F5D48] text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>¡Estrategia sincronizada con el carrito en vivo!</span>
                </div>
              )}
            </form>
          </div>

          {/* Sync Helper */}
          <div className="bg-[#EFE8DD] border border-[#DDD3C4] rounded-2xl p-4 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#5C3D2E] text-[20px] shrink-0 mt-0.5">campaign</span>
            <div className="space-y-0.5 text-xs text-[#50443F]">
              <span className="font-bold text-[#1F1B18] block">Barra de Anuncios Sincronizada</span>
              <p className="leading-tight">
                La cabecera de la tienda muestra automáticamente: <em>"Llevando 3 o más prendas: 15% OFF automático"</em>.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
