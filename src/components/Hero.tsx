import React from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Search, Sparkles, MapPin, Music } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCityFilter: (city: string) => void;
  totalEventsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCityFilter,
  totalEventsCount,
}) => {
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EA580C', '#F59E0B', '#10B981', '#3B82F6', '#EFDCAB']
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2D5A3C] via-[#1C3B27] to-[#122619] text-[#EFDCAB] pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500/40">
      {/* Luz/brilho no fundo */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500 via-orange-600 to-transparent" />

      {/* Bandeirinhas suspensas ilustradas decorativas */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-2 sm:px-8 opacity-75 pointer-events-none select-none">
        {['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F97316', '#EAB308'].map((color, idx) => (
          <div
            key={idx}
            className="w-8 h-10 sm:w-12 sm:h-14 transition-transform hover:scale-110"
            style={{
              backgroundColor: color,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)',
              transform: `rotate(${(idx % 2 === 0 ? 1 : -1) * (idx * 2)}deg)`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto text-center pt-8">
        {/* Selo Festivo */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm shadow-glow animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Circuito Oficial Cearense • Temporada Junina 2025
        </div>

        {/* Título Principal */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-wide text-white uppercase drop-shadow-md leading-none mb-6">
          A Chama Viva do <br />
          <span className="text-amber-400 underline decoration-amber-500/60 decoration-wavy underline-offset-8">
            São João do Ceará
          </span>
        </h1>

        {/* Subtítulo Descritivo */}
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-amber-100/90 font-light leading-relaxed mb-8">
          A plataforma digital completa para vivenciar os maiores festivais, a magia dos passos coreografados das quadrilhas, os polos municipais e os saberes ancestrais do sertão ao litoral.
        </p>

        {/* Barra de Pesquisa Rápida Integrada */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center bg-white dark:bg-stone-900 rounded-2xl shadow-festive p-2 border-2 border-amber-400/50 focus-within:border-amber-500 transition-all">
            <Search className="w-6 h-6 text-amber-600 ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Pesquise por evento, cidade, quadrilha ou atração..."
              className="w-full bg-transparent px-4 py-3 text-stone-800 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none text-base"
              aria-label="Pesquisar evento"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-stone-400 hover:text-stone-600 px-3 text-sm font-semibold"
              >
                Limpar
              </button>
            )}
            <a
              href="#eventos"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-[#3C744D] hover:bg-[#2D5A3C] text-amber-100 font-display text-lg rounded-xl shadow-md transition-all active:scale-95"
            >
              Buscar
            </a>
          </div>

          {/* Atalhos rápidos por municípios mais buscados */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs sm:text-sm">
            <span className="text-amber-200/70 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Cidades em destaque:
            </span>
            {['Canindé', 'Juazeiro do Norte', 'Fortaleza', 'Maracanaú', 'Sobral', 'Barbalha'].map((city) => (
              <button
                key={city}
                onClick={() => {
                  onSelectCityFilter(city);
                  const el = document.getElementById('eventos');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/25 text-amber-200 border border-amber-400/20 transition-all active:scale-95"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#eventos"
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-display text-xl tracking-wide shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <Calendar className="w-5 h-5 text-stone-950" />
            Ver Catálogo de Eventos ({totalEventsCount})
          </a>
        </div>
      </div>
    </section>
  );
};
