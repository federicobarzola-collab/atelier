import React, { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { CurveModal } from './CurveModal';
import { ScreenId } from '../types';

interface WholesaleCatalogProps {
  onNavigate: (screen: ScreenId) => void;
  currency: 'ARS' | 'USD';
}

export const WholesaleCatalog: React.FC<WholesaleCatalogProps> = ({ onNavigate, currency }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cintos' | 'collares' | 'hebillas'>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('suela');
  const [moqSlider, setMoqSlider] = useState<number>(12);
  const [immediateDispatch, setImmediateDispatch] = useState<boolean>(true);
  const [activeCurveProduct, setActiveCurveProduct] = useState<string | null>(null);

  // Cart items in wholesale order
  const [cartItems, setCartItems] = useState([
    {
      id: 'item-1',
      name: 'Cinto Verona Cuero Vacuno',
      curveText: 'Curva: 4xT85, 4xT90, 4xT95 (12u)',
      units: 12,
      price: 73200
    },
    {
      id: 'item-2',
      name: 'Collar Atenea Eslabón 18k',
      curveText: 'Pack Estándar x 7 unidades',
      units: 7,
      price: 32130
    },
    {
      id: 'item-3',
      name: 'Cinto Milano Doble Anilla',
      curveText: 'Surtido Negro x 8 unidades',
      units: 8,
      price: 44000
    }
  ]);

  const totalUnits = cartItems.reduce((acc, item) => acc + item.units, 0); // 27 units
  const subtotalNeto = cartItems.reduce((acc, item) => acc + item.price, 0); // 149330
  const descuentoEscala = Math.round(subtotalNeto * 0.12); // ~17920
  const subtotalDescontado = subtotalNeto - descuentoEscala;
  const iva = Math.round(subtotalDescontado * 0.21); // ~27596
  const totalPedido = subtotalDescontado + iva; // ~159006

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCurveConfirm = (curve: { T85: number; T90: number; T95: number; T100: number }, totalAdded: number) => {
    if (totalAdded > 0) {
      const unitPrice = totalAdded >= 24 ? 5800 : totalAdded >= 12 ? 6100 : 7200;
      const newItem = {
        id: `curve-${Date.now()}`,
        name: activeCurveProduct || 'Cinto Verona Cuero',
        curveText: `Curva: ${curve.T85}xT85, ${curve.T90}xT90, ${curve.T95}xT95, ${curve.T100}xT100 (${totalAdded}u)`,
        units: totalAdded,
        price: totalAdded * unitPrice
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  return (
    <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Banner Preventa Exclusiva FW25 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#EFE8DD] via-[#F5EFEB] to-[#E6DCCF] border border-[#DDD3C4] p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#5C3D2E] flex items-center justify-center text-white shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[24px]">verified</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#5C3D2E] uppercase tracking-wider">
                Temporada FW25 • Preventa Exclusiva Boutiques
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2F5D48]"></span>
              <span className="text-[11px] text-[#2F5D48] font-bold">Producción Artesanal Certificada</span>
            </div>
            <p className="text-xs text-[#50443F] mt-0.5">
              Acceso a tabla de escala de márgenes sugeridos del 140% al 185% sobre PVP y reserva directa de stock en taller.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button 
            onClick={() => onNavigate('validacion-pedido')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF7F2] text-[#43271A] hover:bg-[#EFE8DD] text-xs font-bold border border-[#DDD3C4] shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[#5C3D2E] text-[18px]">picture_as_pdf</span>
            <span>Catálogo PDF (Lookbook FW25)</span>
          </button>
          <button 
            onClick={() => alert('Descargando planilla Excel Mayorista .XLSX con matriz de talles y costos...')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2F5D48] text-white text-xs font-bold shadow-sm transition-all hover:bg-[#234737]"
          >
            <span className="material-symbols-outlined text-[18px]">table_chart</span>
            <span>Excel Mayorista .XLSX</span>
          </button>
        </div>
      </div>

      {/* 3-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Filters (3 cols) */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-[#F5EFEB] border border-[#DDD3C4] rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DDD3C4]/60">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#5C3D2E] text-[20px]">tune</span>
                <h2 className="text-sm font-bold text-[#43271A]">Filtros Taller</h2>
              </div>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedFinish('suela');
                  setMoqSlider(12);
                }}
                className="text-[11px] text-[#82746E] hover:text-[#5C3D2E] transition-colors"
              >
                Limpiar
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-[#50443F] uppercase tracking-wider font-bold">Línea Mayorista</span>
              <div className="space-y-1">
                <label 
                  onClick={() => setSelectedCategory('cintos')}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors border ${
                    selectedCategory === 'cintos' ? 'bg-[#EFE8DD] border-[#DDD3C4]' : 'bg-[#FAF7F2]/50 border-transparent hover:bg-[#EFE8DD]/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={selectedCategory === 'cintos' || selectedCategory === 'all'} 
                      onChange={() => setSelectedCategory('cintos')}
                      className="accent-[#5C3D2E] w-4 h-4 rounded" 
                    />
                    <span className="text-xs text-[#1F1B18] font-medium">Cintos de Cuero Vacuno</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FAF7F2] text-[#50443F] border border-[#DDD3C4]">28</span>
                </label>

                <label 
                  onClick={() => setSelectedCategory('collares')}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors border ${
                    selectedCategory === 'collares' ? 'bg-[#EFE8DD] border-[#DDD3C4]' : 'bg-[#FAF7F2]/50 border-transparent hover:bg-[#EFE8DD]/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={selectedCategory === 'collares' || selectedCategory === 'all'} 
                      onChange={() => setSelectedCategory('collares')}
                      className="accent-[#5C3D2E] w-4 h-4 rounded" 
                    />
                    <span className="text-xs text-[#1F1B18] font-medium">Collares &amp; Dijes Autor</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FAF7F2] text-[#50443F] border border-[#DDD3C4]">14</span>
                </label>

                <label 
                  onClick={() => setSelectedCategory('hebillas')}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors border ${
                    selectedCategory === 'hebillas' ? 'bg-[#EFE8DD] border-[#DDD3C4]' : 'bg-[#FAF7F2]/50 border-transparent hover:bg-[#EFE8DD]/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={selectedCategory === 'hebillas'} 
                      onChange={() => setSelectedCategory('hebillas')}
                      className="accent-[#5C3D2E] w-4 h-4 rounded" 
                    />
                    <span className="text-xs text-[#1F1B18] font-medium">Hebillas Zamak Macizas</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FAF7F2] text-[#50443F] border border-[#DDD3C4]">6</span>
                </label>
              </div>
            </div>

            {/* Leather Finishes */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-[#50443F] uppercase tracking-wider font-bold">Acabados de Cuero</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedFinish('suela')}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left transition-colors border text-xs ${
                    selectedFinish === 'suela'
                      ? 'bg-[#EFE8DD] border-[#DDD3C4] text-[#43271A] font-bold'
                      : 'bg-[#FAF7F2] border-[#DDD3C4]/60 text-[#1F1B18]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#8E5336] shadow-inner shrink-0"></span>
                  <span className="truncate">Suela Natural</span>
                </button>
                <button
                  onClick={() => setSelectedFinish('negro')}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left transition-colors border text-xs ${
                    selectedFinish === 'negro'
                      ? 'bg-[#EFE8DD] border-[#DDD3C4] text-[#43271A] font-bold'
                      : 'bg-[#FAF7F2] border-[#DDD3C4]/60 text-[#1F1B18]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1A1A1A] shadow-inner shrink-0"></span>
                  <span className="truncate">Negro Mate</span>
                </button>
                <button
                  onClick={() => setSelectedFinish('roble')}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left transition-colors border text-xs ${
                    selectedFinish === 'roble'
                      ? 'bg-[#EFE8DD] border-[#DDD3C4] text-[#43271A] font-bold'
                      : 'bg-[#FAF7F2] border-[#DDD3C4]/60 text-[#1F1B18]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#A26D3F] shadow-inner shrink-0"></span>
                  <span className="truncate">Tostado Roble</span>
                </button>
                <button
                  onClick={() => setSelectedFinish('caramelo')}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left transition-colors border text-xs ${
                    selectedFinish === 'caramelo'
                      ? 'bg-[#EFE8DD] border-[#DDD3C4] text-[#43271A] font-bold'
                      : 'bg-[#FAF7F2] border-[#DDD3C4]/60 text-[#1F1B18]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#C68B59] shadow-inner shrink-0"></span>
                  <span className="truncate">Caramelo Suave</span>
                </button>
              </div>
            </div>

            {/* MOQ Tier Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#50443F] uppercase tracking-wider font-bold">MOQ Mínimo por Modelo</span>
                <span className="text-xs font-bold text-[#5C3D2E]">Hasta {moqSlider} uds</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="24" 
                value={moqSlider}
                onChange={e => setMoqSlider(Number(e.target.value))}
                className="w-full h-1.5 bg-[#DDD3C4] rounded-lg appearance-none cursor-pointer accent-[#5C3D2E]"
              />
              <div className="flex justify-between text-[10px] text-[#82746E]">
                <span>1 u. (Muestra)</span>
                <span>6 u.</span>
                <span>12 u. (Standard)</span>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#50443F] uppercase tracking-wider font-bold">Rango Costo Mayorista</span>
                <span className="text-xs text-[#43271A] font-bold">$4.000 - $9.500</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4]">
                  <span className="text-[10px] text-[#82746E] block">Mínimo ARS</span>
                  <span className="text-xs font-bold text-[#1F1B18]">$4.500</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4]">
                  <span className="text-[10px] text-[#82746E] block">Máximo ARS</span>
                  <span className="text-xs font-bold text-[#1F1B18]">$8.900</span>
                </div>
              </div>
            </div>

            {/* Direct Dispatch Toggle */}
            <div className="p-3 rounded-xl bg-[#EDF3F0] border border-[#DDD3C4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2F5D48] text-[20px]">bolt</span>
                <div>
                  <p className="text-xs font-bold text-[#2F5D48]">Despacho Inmediato</p>
                  <p className="text-[10px] text-[#2F5D48]/80 font-medium">Stock listo para embalar</p>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={immediateDispatch}
                onChange={e => setImmediateDispatch(e.target.checked)}
                className="w-4 h-4 rounded text-[#2F5D48] accent-[#2F5D48] cursor-pointer"
              />
            </div>
          </div>

          {/* Sincronización ERP Callout */}
          <div className="rounded-2xl bg-[#EFE8DD] border border-[#DDD3C4] p-4 space-y-1.5 shadow-sm">
            <div className="flex items-center gap-2 text-[#5C3D2E] font-bold text-xs">
              <span className="material-symbols-outlined text-[18px]">cloud_download</span>
              <span>Sincronización con ERP</span>
            </div>
            <p className="text-[11px] text-[#50443F] leading-relaxed">
              Descarga la base actualizada en CSV o conéctate vía API B2B para importar a tu punto de venta Tiendanube o Shopify.
            </p>
            <button 
              onClick={() => onNavigate('promociones-b2b')}
              className="text-xs text-[#5C3D2E] font-bold inline-flex items-center gap-1 hover:underline pt-1"
            >
              Ver credenciales API Mayorista →
            </button>
          </div>
        </aside>

        {/* CENTER COLUMN: Catalog Grid (6 cols) */}
        <section className="lg:col-span-6 space-y-4">
          {/* Header Controls */}
          <div className="bg-[#F5EFEB] border border-[#DDD3C4] rounded-2xl p-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#43271A]">48 Modelos Activos</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EDF3F0] text-[#2F5D48] border border-[#DDD3C4] text-[10px] font-bold">
                Marzo 2025
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#DDD3C4] px-3 py-1 rounded-xl text-xs">
                <span className="text-[#82746E]">Ordenar:</span>
                <select className="bg-transparent font-semibold text-[#1F1B18] outline-none cursor-pointer">
                  <option>Mayor Margen Comercial (% PVP)</option>
                  <option>Más Vendidos en Boutiques</option>
                  <option>Mayor Stock Disponible</option>
                  <option>Precio: Menor a Mayor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRODUCTS.map(product => (
              <div 
                key={product.id}
                className="bg-[#F5EFEB] border border-[#DDD3C4] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-[#6B4226]/40 transition-all"
              >
                <div>
                  <div className="relative w-full aspect-[4/3] bg-[#EFE8DD] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 rounded-lg bg-[#FAF7F2]/95 backdrop-blur-md text-[#43271A] border border-[#DDD3C4] text-[10px] font-bold shadow-sm">
                        MOQ: {product.moq} uds
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-[#2F5D48] text-white text-[10px] font-bold shadow-sm">
                        +{product.marginPercent}% Margen
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-[#342F2C]/90 backdrop-blur-md text-[#FAF7F2] px-2 py-0.5 rounded-md text-[10px] font-mono">
                      SKU: {product.sku}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <span className="text-[10px] text-[#6B4226] uppercase tracking-wider font-bold block">
                        {product.subtitle}
                      </span>
                      <h3 className="text-sm font-bold text-[#43271A]">{product.name}</h3>
                      <p className="text-xs text-[#50443F] line-clamp-1">{product.description}</p>
                    </div>

                    {/* Margin info pill */}
                    <div className="p-2 rounded-xl bg-[#EFE8DD] border border-[#DDD3C4]/60 flex items-center justify-between text-xs">
                      <span className="text-[#50443F]">PVP Recomendado en Local:</span>
                      <div className="text-right">
                        <span className="font-bold text-[#43271A]">${product.suggestedPVP.toLocaleString('es-AR')}</span>
                        <span className="text-[#2F5D48] font-bold ml-1">(+{product.marginPercent}% markup)</span>
                      </div>
                    </div>

                    {/* Wholesale Tier Matrix */}
                    <div className="rounded-xl bg-[#E6DCCF] border border-[#DDD3C4] p-1.5">
                      <div className="grid grid-cols-3 gap-1 text-center text-xs">
                        <div className="p-1 rounded-lg bg-[#FAF7F2]">
                          <span className="text-[10px] text-[#82746E] block">{product.wholesaleTiers.tier1.min}-{product.wholesaleTiers.tier1.max} u.</span>
                          <span className="font-bold text-[#1F1B18]">${product.wholesaleTiers.tier1.price.toLocaleString('es-AR')}</span>
                        </div>
                        <div className="p-1 rounded-lg bg-[#FAF7F2]">
                          <span className="text-[10px] text-[#82746E] block">≥ {product.wholesaleTiers.tier2.min} u.</span>
                          <span className="font-bold text-[#5C3D2E]">${product.wholesaleTiers.tier2.price.toLocaleString('es-AR')}</span>
                        </div>
                        <div className="p-1 rounded-lg bg-[#EDF3F0] border border-[#2F5D48]/20">
                          <span className="text-[10px] text-[#2F5D48] font-bold block">≥ {product.wholesaleTiers.tier3.min} u. (-{product.wholesaleTiers.tier3.discount}%)</span>
                          <span className="font-bold text-[#2F5D48]">${product.wholesaleTiers.tier3.price.toLocaleString('es-AR')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stock chips */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-[#82746E]">
                        <span>Stock por Talle Taller:</span>
                        <span className="text-[#2F5D48] font-semibold">{product.totalStock} u. disponibles</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-center text-[11px]">
                        <div className="py-1 px-1 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4]/50">
                          <span className="block font-bold text-[#1F1B18]">T85</span>
                          <span className="text-[9px] text-[#50443F]">{product.stockPerSize.T85}u</span>
                        </div>
                        <div className="py-1 px-1 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4]/50">
                          <span className="block font-bold text-[#1F1B18]">T90</span>
                          <span className="text-[9px] text-[#50443F]">{product.stockPerSize.T90}u</span>
                        </div>
                        <div className="py-1 px-1 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4]/50">
                          <span className="block font-bold text-[#1F1B18]">T95</span>
                          <span className="text-[9px] text-[#50443F]">{product.stockPerSize.T95}u</span>
                        </div>
                        <div className="py-1 px-1 rounded-lg bg-[#EFE8DD] border border-[#DDD3C4]/50">
                          <span className="block font-bold text-[#1F1B18]">T100</span>
                          <span className="text-[9px] text-[#82746E]">{product.stockPerSize.T100}u</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0 flex items-center gap-2">
                  <button 
                    onClick={() => setActiveCurveProduct(product.name)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#5C3D2E] text-white hover:bg-[#6B4226] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    <span>Cargar Curva / Talles</span>
                  </button>
                  <button 
                    onClick={() => onNavigate('detalle-producto')}
                    className="p-2.5 rounded-xl bg-[#EFE8DD] hover:bg-[#E6DCCF] border border-[#DDD3C4] text-[#43271A] transition-colors"
                    title="Ver Detalles de Confección"
                  >
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="bg-[#F5EFEB] border border-[#DDD3C4] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-[#50443F]">
              Mostrando <span className="font-bold text-[#43271A]">1 - 4</span> de <span className="font-bold text-[#43271A]">48</span> referencias mayoristas
            </div>
            <div className="flex items-center gap-1.5">
              <button disabled className="px-3 py-1 rounded-lg bg-[#EFE8DD] text-[#82746E] border border-[#DDD3C4]/50 opacity-60">Anterior</button>
              <button className="w-7 h-7 rounded-lg bg-[#5C3D2E] text-white font-bold flex items-center justify-center shadow-sm">1</button>
              <button className="w-7 h-7 rounded-lg bg-[#EFE8DD] text-[#43271A] hover:bg-[#E6DCCF] font-semibold flex items-center justify-center border border-[#DDD3C4]/50">2</button>
              <button className="w-7 h-7 rounded-lg bg-[#EFE8DD] text-[#43271A] hover:bg-[#E6DCCF] font-semibold flex items-center justify-center border border-[#DDD3C4]/50">3</button>
              <span className="text-[#82746E] px-1">...</span>
              <button className="px-3 py-1 rounded-lg bg-[#E6DCCF] text-[#43271A] hover:bg-[#DDD3C4] font-bold border border-[#DDD3C4]">Siguiente</button>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Sticky Wholesale Mini-Cart (3 cols) */}
        <aside className="lg:col-span-3 sticky top-28 space-y-4">
          <div className="bg-[#F5EFEB] border border-[#DDD3C4] rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#DDD3C4] pb-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#5C3D2E] text-[20px]">shopping_cart_checkout</span>
                <h2 className="text-sm font-bold text-[#43271A]">Pedido Actual</h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDF3F0] text-[#2F5D48] border border-[#DDD3C4]">
                Boutique Palermo
              </span>
            </div>

            {/* Minimum Threshold Progress */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[10px] text-[#50443F] font-bold uppercase">Mínimo Compra Mayorista</span>
                <span className="text-[11px] font-bold text-[#2F5D48] flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                  Alcanzado
                </span>
              </div>
              <div className="w-full bg-[#DDD3C4] rounded-full h-2 overflow-hidden">
                <div className="bg-[#2F5D48] h-full rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-[#50443F]">
                <span>${subtotalNeto.toLocaleString('es-AR')} acumulados</span>
                <span className="font-bold text-[#43271A]">Mínimo: $50.000</span>
              </div>
            </div>

            {/* Volume Tier Discount Meter */}
            <div className="p-3 rounded-xl bg-[#EDF3F0] border border-[#DDD3C4] space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2F5D48]">Descuento por Volumen:</span>
                <span className="font-bold text-[#2F5D48]">12% OFF Aplicado</span>
              </div>
              <div className="w-full bg-[#DDD3C4] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#2F5D48] h-full rounded-full transition-all duration-500" style={{ width: '79%' }}></div>
              </div>
              <p className="text-[11px] text-[#50443F] leading-tight">
                Agrega <strong className="text-[#43271A]">5 unidades más</strong> para desbloquear la escala mayorista del <strong className="text-[#2F5D48]">20% OFF Taller</strong>.
              </p>
            </div>

            {/* Mini-Cart Items List */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4]/60 text-xs">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-semibold text-[#43271A] truncate">{item.name}</span>
                    <span className="text-[11px] text-[#50443F]">{item.curveText}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-[#43271A] block">${item.price.toLocaleString('es-AR')}</span>
                    <button 
                      onClick={() => handleRemoveCartItem(item.id)}
                      className="text-[10px] text-[#BA1A1A] hover:underline"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotals & Taxes */}
            <div className="space-y-1.5 pt-2 border-t border-[#DDD3C4] text-xs">
              <div className="flex justify-between text-[#50443F]">
                <span>Total Unidades:</span>
                <span className="font-bold text-[#43271A]">{totalUnits} productos</span>
              </div>
              <div className="flex justify-between text-[#50443F]">
                <span>Subtotal Neto:</span>
                <span>${subtotalNeto.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-[#2F5D48] font-bold">
                <span>Descuento Escala Mayorista:</span>
                <span>-${descuentoEscala.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-[#50443F]">
                <span>IVA (21%) Factura A:</span>
                <span>${iva.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#DDD3C4]">
                <span className="text-sm font-bold text-[#43271A]">Total Pedido:</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-[#5C3D2E]">${totalPedido.toLocaleString('es-AR')}</span>
                  <span className="text-[10px] text-[#82746E] block">Precios en {currency}</span>
                </div>
              </div>
            </div>

            {/* Checkout CTA */}
            <button 
              onClick={() => onNavigate('validacion-pedido')}
              className="w-full py-3 px-4 rounded-xl bg-[#5C3D2E] hover:bg-[#6B4226] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
            >
              <span>Confirmar Pedido y Reservar Stock</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            {/* Delivery Guarantee */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#EFE8DD] border border-[#DDD3C4] text-[11px] text-[#50443F]">
              <span className="material-symbols-outlined text-[#2F5D48] text-[18px]">local_shipping</span>
              <span>Despacho garantizado por Andreani / Expreso en 48hs hábiles.</span>
            </div>
          </div>

          {/* Asesor Box */}
          <div className="rounded-2xl bg-[#EFE8DD] border border-[#DDD3C4] p-4 space-y-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-[#5C3D2E] font-bold text-xs">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              <h4>Asesor Comercial Asignado</h4>
            </div>
            <p className="text-xs text-[#50443F]">
              ¿Necesitas personalizar con tu propio logo grabado en caliente sobre el pasador?
            </p>
            <a 
              href="https://wa.me/5491148209900?text=Hola%20Tierra%20Atelier,%20quisiera%20consultar%20sobre%20personalizacion%20con%20logo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#5C3D2E] font-bold hover:underline pt-1"
            >
              Consultar con Ejecutivo B2B →
            </a>
          </div>
        </aside>
      </div>

      {/* Curve Modal */}
      <CurveModal 
        isOpen={!!activeCurveProduct}
        onClose={() => setActiveCurveProduct(null)}
        productName={activeCurveProduct || 'Cinto Verona'}
        onConfirm={handleCurveConfirm}
      />
    </div>
  );
};
