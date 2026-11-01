import React, { useState } from 'react';
import { 
  Flame, 
  UtensilsCrossed, 
  Music, 
  Sparkles, 
  Award,
  Lightbulb
} from 'lucide-react';
import { TRADITIONS_DATA } from '../data/traditions';

export const TraditionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'todos' | 'culinaria' | 'musica' | 'rituais' | 'mestres'>('todos');

  const filteredTraditions = TRADITIONS_DATA.filter((item) => {
    if (activeTab === 'todos') return true;
    return item.category === activeTab;
  });

  return (
    <section id="tradicoes" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-900/10 dark:border-stone-800">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#3C744D] dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Flame className="w-4 h-4 text-amber-500" />
          Memória & Saberes Populares
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-stone-900 dark:text-amber-100 uppercase tracking-wide">
          Enciclopédia das Tradições Juninas
        </h2>
        <p className="mt-3 text-stone-600 dark:text-stone-300 text-base sm:text-lg">
          O São João é muito mais do que um festival: é culinária afetuosa, devoção popular, acordeon vibrante e a sabedoria ancestral dos mestres da cultura cearense.
        </p>

        {/* Abas Temáticas */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {[
            { id: 'todos', label: 'Todas as Tradições', icon: Sparkles },
            { id: 'culinaria', label: 'Sabores do Sertão', icon: UtensilsCrossed },
            { id: 'musica', label: 'Sons & Instrumentos', icon: Music },
            { id: 'rituais', label: 'Rituais & Fogueiras', icon: Flame },
            { id: 'mestres', label: 'Mestres da Cultura', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#3C744D] text-[#EFDCAB] shadow-md'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-400" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de Tradições */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTraditions.map((tradition) => (
          <div
            key={tradition.id}
            className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-amber-900/10 dark:border-stone-800 shadow-sm hover:shadow-festive transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                {tradition.category === 'culinaria' && <UtensilsCrossed className="w-6 h-6" />}
                {tradition.category === 'musica' && <Music className="w-6 h-6" />}
                {tradition.category === 'rituais' && <Flame className="w-6 h-6" />}
                {tradition.category === 'mestres' && <Award className="w-6 h-6" />}
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                {tradition.subtitle}
              </span>

              <h3 className="font-display text-2xl text-stone-900 dark:text-amber-100 mb-3">
                {tradition.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                {tradition.description}
              </p>
            </div>

            {/* Curiosidade Cearense */}
            <div className="bg-[#FFF7E5] dark:bg-stone-800/60 p-3 rounded-2xl border border-amber-200/60 dark:border-stone-700 text-xs">
              <span className="font-bold text-[#3C744D] dark:text-amber-400 flex items-center gap-1 mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Curiosidade Cearense:
              </span>
              <p className="text-stone-700 dark:text-stone-300 italic">
                {tradition.curiosity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
