import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Filter, 
  Search, 
  LayoutGrid, 
  Clock, 
  RotateCcw,
  Sparkles,
  Building2,
  CalendarDays
} from 'lucide-react';
import { JuninoEvent, JuninoRegion } from '../../types';
import { EventCard } from './EventCard';
import { EventDetailModal } from './EventDetailModal';

interface EventCatalogProps {
  events: JuninoEvent[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCityFilter: string;
  onSelectCityFilter: (city: string) => void;
  savedEventIds: string[];
  onToggleSave: (eventId: string) => void;
}

export const EventCatalog: React.FC<EventCatalogProps> = ({
  events,
  searchQuery,
  onSearchChange,
  selectedCityFilter,
  onSelectCityFilter,
  savedEventIds,
  onToggleSave,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('todas');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline' | 'by-city'>('grid');
  const [activeEventModal, setActiveEventModal] = useState<JuninoEvent | null>(null);

  // Lista única de municípios para o dropdown
  const municipalitiesList = useMemo(() => {
    const set = new Set(events.map(e => e.municipality));
    return Array.from(set).sort();
  }, [events]);

  // Lista de regiões únicas
  const regionsList = useMemo(() => {
    const set = new Set(events.map(e => e.region));
    return Array.from(set).sort();
  }, [events]);

  // Filtragem composta em tempo real
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // Filtro de Texto (Nome do evento, município, atração da programação)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = ev.title.toLowerCase().includes(q);
        const matchCity = ev.municipality.toLowerCase().includes(q);
        const matchLocation = ev.location.toLowerCase().includes(q);
        const matchLineup = ev.lineup.some(item => item.item.toLowerCase().includes(q));
        if (!matchTitle && !matchCity && !matchLocation && !matchLineup) {
          return false;
        }
      }

      // Filtro de Cidade
      if (selectedCityFilter && selectedCityFilter !== 'todos') {
        if (ev.municipality !== selectedCityFilter) return false;
      }

      // Filtro de Região
      if (selectedRegion && selectedRegion !== 'todas') {
        if (ev.region !== selectedRegion) return false;
      }

      // Filtro de Período
      if (selectedPeriod !== 'todos') {
        const day = parseInt(ev.date.split('-')[2], 10);
        if (selectedPeriod === 'primeira-quinzena' && day > 15) return false;
        if (selectedPeriod === 'segunda-quinzena' && day <= 15) return false;
        if (selectedPeriod === 'semana-sao-joao' && (day < 20 || day > 25)) return false;
        if (selectedPeriod === 'reta-final' && day < 26) return false;
      }

      return true;
    }).sort((a, b) => a.date.localeCompare(b.date));
  }, [events, searchQuery, selectedCityFilter, selectedRegion, selectedPeriod]);

  // Limpar todos os filtros
  const handleResetFilters = () => {
    onSearchChange('');
    onSelectCityFilter('todos');
    setSelectedRegion('todas');
    setSelectedPeriod('todos');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCityFilter !== 'todos' || selectedRegion !== 'todas' || selectedPeriod !== 'todos';

  return (
    <section id="eventos" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Cabeçalho da Seção */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#3C744D] dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <CalendarDays className="w-4 h-4 text-amber-500" />
          Programação Oficial dos Arraiais
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-stone-900 dark:text-amber-100 uppercase tracking-wide">
          Catálogo de Eventos Juninos
        </h2>
        <p className="mt-3 text-stone-600 dark:text-stone-300 text-base sm:text-lg">
          Consulte as datas, horários e locais dos festivais em todos os municípios do Ceará. Filtre por cidade, período ou busque pela sua quadrilha favorita.
        </p>
      </div>

      {/* Painel de Filtros e Busca Avançada */}
      <div className="bg-white dark:bg-stone-900 p-5 sm:p-6 rounded-3xl shadow-lg border border-amber-900/10 dark:border-stone-800 mb-8 space-y-4">
        
        {/* Linha Superior: Barra de Pesquisa + Modo de Exibição */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Pesquisar por evento, quadrilha ou praça..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>

          {/* Alternadores de Modo de Visualização */}
          <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl self-end md:self-auto text-xs font-semibold">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-stone-700 text-[#3C744D] dark:text-amber-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Cards
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-stone-700 text-[#3C744D] dark:text-amber-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Cronograma
            </button>
            <button
              onClick={() => setViewMode('by-city')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'by-city'
                  ? 'bg-white dark:bg-stone-700 text-[#3C744D] dark:text-amber-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Por Município
            </button>
          </div>
        </div>

        {/* Linha de Filtros Específicos: Município, Região, Período */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
          
          {/* Filtro de Município */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" /> Município:
            </label>
            <select
              value={selectedCityFilter}
              onChange={(e) => onSelectCityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="todos">Todos os Municípios ({events.length})</option>
              {municipalitiesList.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Filtro de Região do Ceará */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-500" /> Macro-Região:
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="todas">Todas as Regiões</option>
              {regionsList.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Filtro de Período no Mês de Junho */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5 text-amber-500" /> Período:
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="todos">Todo o Mês de Junho</option>
              <option value="primeira-quinzena">1ª Quinzena (01 a 15 de Junho)</option>
              <option value="segunda-quinzena">2ª Quinzena (16 a 30 de Junho)</option>
              <option value="semana-sao-joao">Semana do São João (20 a 25)</option>
              <option value="reta-final">Grandes Finais e São Pedro (26 a 30)</option>
            </select>
          </div>
        </div>

        {/* Barra de Status dos Filtros */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-2">
          <span>
            Mostrando <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
          </span>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar todos os filtros
            </button>
          )}
        </div>
      </div>

      {/* Exibição dos Eventos de acordo com o Modo selecionado */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl p-8 border border-dashed border-amber-300 dark:border-stone-700">
          <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-3 opacity-60" />
          <h3 className="font-display text-2xl text-stone-800 dark:text-stone-200 mb-2">
            Nenhum evento encontrado para os filtros selecionados
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto mb-4">
            Experimente buscar por outros termos, selecione "Todos os Municípios" ou limpe os filtros para explorar a agenda completa.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#3C744D] text-amber-100 font-semibold text-sm hover:bg-[#2D5A3C] transition-all"
          >
            Restaurar Todos os Eventos
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        // Modo Grid de Cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              isSaved={savedEventIds.includes(ev.id)}
              onToggleSave={onToggleSave}
              onSelectEvent={setActiveEventModal}
            />
          ))}
        </div>
      ) : viewMode === 'timeline' ? (
        // Modo Linha do Tempo Cronológica
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-amber-400/30">
          {filteredEvents.map((ev) => (
            <div 
              key={ev.id} 
              className="relative flex items-start gap-4 sm:gap-6 pl-2 sm:pl-4 group"
            >
              {/* Ponto na timeline */}
              <div className="w-12 h-12 rounded-2xl bg-[#3C744D] text-[#EFDCAB] flex flex-col items-center justify-center font-display shadow-md shrink-0 z-10 group-hover:scale-110 transition-transform">
                <span className="text-lg leading-none">{ev.date.split('-')[2]}</span>
                <span className="text-[10px] uppercase font-sans font-bold">JUN</span>
              </div>

              {/* Box de Informações */}
              <div className="flex-1 bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#3C744D] dark:text-amber-400 text-sm">
                      {ev.municipality}
                    </span>
                    <span className="text-xs text-stone-400">•</span>
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      Início às {ev.time}
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-stone-800 text-amber-800 dark:text-amber-300 font-medium">
                    {ev.category}
                  </span>
                </div>

                <h3 
                  onClick={() => setActiveEventModal(ev)}
                  className="font-display text-xl sm:text-2xl text-stone-900 dark:text-stone-100 hover:text-amber-600 cursor-pointer transition-colors mb-2"
                >
                  {ev.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 mb-3 line-clamp-2">
                  {ev.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                  <span className="flex items-center gap-1 text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    {ev.location}
                  </span>
                  <button
                    onClick={() => setActiveEventModal(ev)}
                    className="font-bold text-[#3C744D] dark:text-amber-400 hover:underline"
                  >
                    Ver Programação Completa ({ev.lineup.length} atrações) →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Modo Agrupado por Município
        <div className="space-y-10">
          {municipalitiesList
            .filter(city => filteredEvents.some(ev => ev.municipality === city))
            .map((city) => {
              const cityEvents = filteredEvents.filter(ev => ev.municipality === city);
              return (
                <div key={city} className="bg-stone-100/70 dark:bg-stone-900/50 p-6 rounded-3xl border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-stone-200 dark:border-stone-800">
                    <div className="p-2.5 rounded-xl bg-[#3C744D] text-[#EFDCAB]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl text-stone-900 dark:text-amber-100">
                        {city}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-500">
                        {cityEvents.length} {cityEvents.length === 1 ? 'evento programado' : 'eventos programados'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cityEvents.map(ev => (
                      <EventCard
                        key={ev.id}
                        event={ev}
                        isSaved={savedEventIds.includes(ev.id)}
                        onToggleSave={onToggleSave}
                        onSelectEvent={setActiveEventModal}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Modal de Detalhes do Evento Selecionado */}
      <EventDetailModal
        event={activeEventModal}
        onClose={() => setActiveEventModal(null)}
        isSaved={activeEventModal ? savedEventIds.includes(activeEventModal.id) : false}
        onToggleSave={onToggleSave}
      />
    </section>
  );
};
