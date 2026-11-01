import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Music, 
  Sparkles, 
  Heart, 
  Menu, 
  X, 
  Moon, 
  Sun,
  Flame
} from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  savedCount, 
  onOpenSaved, 
  isDarkMode, 
  onToggleDarkMode 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#2D5A3C] text-[#EFDCAB] shadow-lg border-b border-[#EFDCAB]/20 backdrop-blur-md bg-opacity-95 transition-colors duration-300">
      {/* Faixa decorativa de bandeirinhas no topo */}
      <div className="bandeirinhas-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo e Nome */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/img/logochapeu.png" 
                alt="Logo do Ceará Junino" 
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-2xl tracking-wider text-amber-200 block leading-tight">
                CEARÁ JUNINO
              </span>
              <span className="text-xs text-amber-100/70 tracking-widest uppercase block font-medium">
                Portal da Cultura & Tradição
              </span>
            </div>
          </a>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-6 font-display text-lg tracking-wide">
            <a 
              href="#eventos" 
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-white/10"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              Eventos & Calendário
            </a>
            <a 
              href="#quadrilhas" 
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-white/10"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Quadrilhas
            </a>
            <a 
              href="#municipios" 
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-white/10"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              Municípios
            </a>
            <a 
              href="#tradicoes" 
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-white/10"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              Tradições
            </a>
            <a 
              href="#inscricoes" 
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-white/10"
            >
              Inscrições
            </a>
          </nav>

          {/* Botões de Ação à Direita */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Botão de Favoritos */}
            <button
              onClick={onOpenSaved}
              className="relative p-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border border-amber-400/30 transition-all duration-200 active:scale-95 flex items-center gap-1.5 text-sm font-semibold"
              title="Eventos salvos na minha rota"
              aria-label="Ver eventos salvos"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span className="hidden md:inline">Minha Rota</span>
              {savedCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold bg-amber-500 text-stone-900 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Alternar Modo Noturno */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/10 transition-all active:scale-95"
              title={isDarkMode ? "Mudar para Modo Dia" : "Mudar para Noite de São João"}
              aria-label="Alternar tema"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Botão Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/10 transition-all"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1C3B27] border-b border-amber-400/20 px-4 pt-3 pb-6 space-y-2 animate-fadeIn font-display text-lg">
          <a
            href="#eventos"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-amber-100 hover:bg-white/10"
          >
            <Calendar className="w-5 h-5 text-amber-400" />
            Eventos & Calendário
          </a>
          <a
            href="#quadrilhas"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-amber-100 hover:bg-white/10"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            Quadrilhas Cearenses
          </a>
          <a
            href="#municipios"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-amber-100 hover:bg-white/10"
          >
            <MapPin className="w-5 h-5 text-amber-400" />
            Municípios Polos
          </a>
          <a
            href="#tradicoes"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-amber-100 hover:bg-white/10"
          >
            <Flame className="w-5 h-5 text-amber-400" />
            Tradições & Culinária
          </a>
          <a
            href="#galeria"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-amber-100 hover:bg-white/10"
          >
            Galeria de Momentos
          </a>
          <a
            href="#inscricoes"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-amber-100 hover:bg-white/10"
          >
            Inscrições 2025
          </a>
        </div>
      )}
    </header>
  );
};
