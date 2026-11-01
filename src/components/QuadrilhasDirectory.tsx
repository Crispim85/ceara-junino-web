import React, { useState } from 'react';
import { Sparkles, Award, MapPin, Calendar } from 'lucide-react';
import { QUADRILHAS_DATA } from '../data/quadrilhas';

export const QuadrilhasDirectory: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<'Todas' | 'Estilizada' | 'Tradicional'>('Todas');

  const filteredQuadrilhas = QUADRILHAS_DATA.filter((q) => {
    if (filterCategory === 'Todas') return true;
    return q.category === filterCategory;
  });

  return (
    <section id="quadrilhas" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-900/10 dark:border-stone-800">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#3C744D] dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          A Arte dos Brincantes Cearenses
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-stone-900 dark:text-amber-100 uppercase tracking-wide">
          Quadrilhas Juninas em Destaque
        </h2>
        <p className="mt-3 text-stone-600 dark:text-stone-300 text-base sm:text-lg">
          Conheça as grandes agremiações que transformam os tablados em palcos de pura emoção, coreografia e preservação da nossa identidade.
        </p>

        {/* Filtro de Categoria */}
        <div className="flex justify-center gap-2 mt-6">
          {(['Todas', 'Estilizada', 'Tradicional'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-[#3C744D] text-[#EFDCAB] shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {cat === 'Todas' ? 'Todas as Modalidades' : `Quadrilhas ${cat}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Quadrilhas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredQuadrilhas.map((quadrilha) => (
          <div
            key={quadrilha.id}
            className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-amber-900/10 dark:border-stone-800 shadow-md hover:shadow-festive transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
          >
            {/* Foto e Badges */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={quadrilha.image}
                alt={quadrilha.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#3C744D] text-[#EFDCAB]">
                  {quadrilha.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-900/80 text-amber-200 backdrop-blur-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Desde {quadrilha.foundedYear}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs text-amber-300 font-semibold flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3 h-3" /> {quadrilha.municipality} - CE
                </span>
                <h3 className="font-display text-2xl text-amber-100 drop-shadow">
                  {quadrilha.name}
                </h3>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Tema Atual */}
                <div className="bg-amber-50 dark:bg-stone-800/60 p-3 rounded-xl border border-amber-200/50 dark:border-stone-700 mb-3">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
                    Tema da Temporada:
                  </span>
                  <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 italic">
                    "{quadrilha.currentTheme}"
                  </p>
                </div>

                {/* Descrição */}
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                  {quadrilha.description}
                </p>

                {/* Premiações e Títulos */}
                <div className="mt-4">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1 mb-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" /> Conquistas em Destaque:
                  </span>
                  <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                    {quadrilha.awards.map((award, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Link de Contato / Redes */}
              {quadrilha.instagram && (
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Instagram Oficial:</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#3C744D] dark:text-amber-400 hover:underline">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                    {quadrilha.instagram}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
