import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { MUNICIPALITIES_DATA } from '../data/municipalities';

interface MunicipalitiesShowcaseProps {
  onSelectCity: (city: string) => void;
}

export const MunicipalitiesShowcase: React.FC<MunicipalitiesShowcaseProps> = ({ onSelectCity }) => {
  const handleClickCity = (city: string) => {
    onSelectCity(city);
    const catalogEl = document.getElementById('eventos');
    catalogEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="municipios" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-900/10 dark:border-stone-800">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#3C744D] dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <MapPin className="w-4 h-4 text-amber-500" />
          Roteiro dos Polos Culturais
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-stone-900 dark:text-amber-100 uppercase tracking-wide">
          Municípios Juninos do Ceará
        </h2>
        <p className="mt-3 text-stone-600 dark:text-stone-300 text-base sm:text-lg">
          De norte a sul, as cidades cearenses se transformam em grandes arraiais a céu aberto. Conheça as particularidades de cada tradição local.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MUNICIPALITIES_DATA.map((mun) => (
          <div
            key={mun.name}
            onClick={() => handleClickCity(mun.name)}
            className="group cursor-pointer bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-amber-900/10 dark:border-stone-800 shadow-sm hover:shadow-festive transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={mun.featuredImg}
                alt={mun.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#3C744D] text-[#EFDCAB]">
                {mun.region}
              </span>
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-display text-2xl text-amber-100">
                  {mun.name}
                </h3>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <p className="text-xs text-stone-600 dark:text-stone-300 italic line-clamp-2">
                "{mun.tagline}"
              </p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-3">
                {mun.traditionSnippet}
              </p>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-[#3C744D] dark:text-amber-400 group-hover:text-amber-600">
                <span>Ver programação</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
