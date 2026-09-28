import React from 'react';
import { AppMode, ScreenId } from '../types';

interface FooterProps {
  mode: AppMode;
  onNavigate?: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ mode, onNavigate }) => {
  return (
    <footer className="w-full bg-[#EFE8DD] border-t border-[#DDD3C4] mt-12 py-12 text-[#50443F]">
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdwQ6DO952q2Cm-BSz2QhQ0ShRZYCL7_RLTWUhiOC0K8wxwrNe_eUjgNjpUXqlEo7eEvoL3PM5JZsZDPXZ-jCVhykBm34njYBGX0c-Qh2TRN8aHeIZ_TnqNTk4gUlWxIdvFo6tnwXUl7CsongO_ONxINNzP7rLR8PysWORLWG2GYr1qRwTv1HJypjyUr0P1txmseeb_aIhIluzAdEoMkVgMprXed2ieFfw6SF-v_LqjTlydvy0KTo" 
                alt="Tierra Atelier" 
                className="h-6 w-auto object-contain"
              />
              <span className="text-lg font-bold text-[#43271A]">TIERRA ATELIER</span>
            </div>
            <p className="text-xs text-[#50443F] leading-relaxed">
              {mode === 'mayorista'
                ? 'Manufactura mayorista de cinturones en cuero genuino y joyería contemporánea de autor para boutiques y tiendas de diseño.'
                : 'Marroquinería botánica y joyería artesanal concebida en talleres locales. Cueros curtidos al vegetal y metales cincelados a mano.'}
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-[#43271A] mb-3">
              {mode === 'mayorista' ? 'Atención Mayorista' : 'Colecciones'}
            </h4>
            {mode === 'mayorista' ? (
              <ul className="space-y-1.5 text-xs text-[#50443F]">
                <li>Showroom CABA: Thames 1842, Palermo Soho</li>
                <li>Lunes a Viernes 09:00 a 18:00 hs</li>
                <li>pedidos@tierraatelier.com</li>
                <li>+54 11 4820-9900</li>
              </ul>
            ) : (
              <ul className="space-y-1.5 text-xs text-[#50443F]">
                <li onClick={() => onNavigate?.('tienda')} className="hover:text-[#5C3D2E] cursor-pointer transition-colors">Cinturones de Cuero Bovino</li>
                <li onClick={() => onNavigate?.('tienda')} className="hover:text-[#5C3D2E] cursor-pointer transition-colors">Collares & Dijes Texturados</li>
                <li onClick={() => onNavigate?.('tienda')} className="hover:text-[#5C3D2E] cursor-pointer transition-colors">Gargantillas & Chokers</li>
                <li onClick={() => onNavigate?.('estrategia-precios')} className="hover:text-[#5C3D2E] cursor-pointer transition-colors">Packs Curados & Sets de Regalo</li>
              </ul>
            )}
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-[#43271A] mb-3">
              {mode === 'mayorista' ? 'Condiciones Comerciales' : 'Beneficios Escalonados'}
            </h4>
            {mode === 'mayorista' ? (
              <ul className="space-y-1.5 text-xs text-[#50443F]">
                <li>Pedido Mínimo: $50.000 / 12 unidades</li>
                <li>Facturación A y B automatizada AFIP</li>
                <li>Envíos a todo el país vía expreso o Andreani / Correo</li>
                <li>Garantía de confección artesanal directa</li>
              </ul>
            ) : (
              <ul className="space-y-1.5 text-xs text-[#50443F]">
                <li onClick={() => onNavigate?.('bolsa')} className="hover:text-[#5C3D2E] cursor-pointer transition-colors">Descuentos Automáticos por Unidad</li>
                <li onClick={() => onNavigate?.('checkout')} className="hover:text-[#5C3D2E] cursor-pointer transition-colors">3 Cuotas Sin Interés & Transferencia -10%</li>
                <li onClick={() => onNavigate?.('tienda')} className="hover:text-[#5C3D2E] cursor-pointer transition-colors">Packs Emprendedores & Regalería</li>
                <li onClick={() => onNavigate?.('detalle-producto')} className="hover:text-[#5C3D2E] cursor-pointer transition-colors">Guía de Talles y Cuidado del Cuero</li>
              </ul>
            )}
          </div>

          {/* Col 4 */}
          <div>
            {mode === 'mayorista' ? (
              <div>
                <h4 className="text-sm font-bold text-[#43271A] mb-3">Estado de Cuenta</h4>
                <div className="p-3.5 rounded-xl bg-[#E6DCCF] border border-[#DDD3C4] space-y-1">
                  <p className="text-xs font-semibold text-[#43271A]">Línea de Crédito Activa</p>
                  <p className="text-sm font-bold text-[#2F5D48]">Saldo disponible: $320.000</p>
                  <p className="text-[11px] text-[#50443F]">Plazo: 30 días fecha factura</p>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-sm font-bold text-[#43271A] mb-3">Atención & Envíos</h4>
                <ul className="space-y-1.5 text-xs text-[#50443F]">
                  <li onClick={() => onNavigate?.('trazabilidad')} className="hover:text-[#5C3D2E] cursor-pointer transition-colors flex items-center gap-1 font-semibold text-[#2F5D48]">
                    <span className="material-symbols-outlined text-sm">local_shipping</span> Seguimiento Satelital de Despacho
                  </li>
                  <li>Mis Compras & Facturación Legal</li>
                  <li>Políticas de Devolución Simple 30 días</li>
                  <li className="text-[#2F5D48] font-medium pt-1">Despachos express a toda la República Argentina</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-[#DDD3C4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#82746E]">
          <span>© 2025 Tierra Atelier B2B S.R.L. Hecho con oficio y nobleza en Argentina.</span>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="hover:text-[#43271A] cursor-pointer">Términos Mayoristas</span>
            <span className="hover:text-[#43271A] cursor-pointer">Política de Devoluciones</span>
            <span className="hover:text-[#43271A] cursor-pointer">Certificación de Origen</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
