import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EventCatalog } from './components/EventCatalog/EventCatalog';
import { QuadrilhasDirectory } from './components/QuadrilhasDirectory';
import { MunicipalitiesShowcase } from './components/MunicipalitiesShowcase';
import { TraditionsSection } from './components/TraditionsSection';
import { GallerySection } from './components/GallerySection';
import { InscricoesSection } from './components/InscricoesSection';
import { SavedEventsModal } from './components/SavedEventsModal';
import { Footer } from './components/Footer';
import { EVENTS_DATA } from './data/events';
import { Sparkles, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState('todos');
  const [savedEventIds, setSavedEventIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ceara_junino_saved_events');
    return saved ? JSON.parse(saved) : ['caninde-2025', 'juazeiro-2025'];
  });
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sincroniza salvos no localStorage
  useEffect(() => {
    localStorage.setItem('ceara_junino_saved_events', JSON.stringify(savedEventIds));
  }, [savedEventIds]);

  // Alterna classe dark no elemento HTML
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleSave = (eventId: string) => {
    setSavedEventIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const handleClearAllSaved = () => {
    setSavedEventIds([]);
  };

  const savedEventsList = EVENTS_DATA.filter((e) => savedEventIds.includes(e.id));

  return (
    <div className="min-h-screen flex flex-col bg-cordel-pattern transition-colors duration-300">
      
      {/* Cabeçalho */}
      <Header
        savedCount={savedEventIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <main className="flex-1">
        {/* Banner Hero */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectCityFilter={setSelectedCityFilter}
          totalEventsCount={EVENTS_DATA.length}
        />

        {/* Seção Sobre Ceará Junino — Contexto e Missão Cultural */}
        <section id="sobre" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="bg-[#2D5A3C] text-[#EFDCAB] rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-[#EFDCAB]/20 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Patrimônio & Identidade Cearense
            </div>
            
            <h2 className="font-display text-3xl sm:text-5xl text-white uppercase tracking-wide mb-6">
              O que é o Ceará Junino?
            </h2>

            <p className="text-base sm:text-lg text-[#EFDCAB]/90 font-light leading-relaxed text-justify sm:text-center max-w-3xl mx-auto">
              O <strong>Ceará Junino</strong> tem por objetivo identificar e difundir as tradições regionais cearenses voltadas para os festejos juninos. Está dividido na categoria <em>“Festival de Quadrilhas Juninas”</em>, apoiando eventos com programação cultural fiel às tradições (apresentações com casamento matuto, grupos musicais de sanfona, zabumba e triângulo, quermesse, festival de comidas típicas, feira de artesanato, grupos de dança do coco, bumba-meu-boi e maneiro pau), e na categoria <em>“Apoio aos Grupos Juninos”</em>, que fomenta a produção artística das redes de quadrilhas em todo o Estado.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#EFDCAB]/20">
              <div>
                <span className="font-display text-3xl text-amber-300 block">184</span>
                <span className="text-xs text-[#EFDCAB]/70">Municípios Integrados</span>
              </div>
              <div>
                <span className="font-display text-3xl text-amber-300 block">+150</span>
                <span className="text-xs text-[#EFDCAB]/70">Quadrilhas Registradas</span>
              </div>
              <div>
                <span className="font-display text-3xl text-amber-300 block">25</span>
                <span className="text-xs text-[#EFDCAB]/70">Regiões Culturais</span>
              </div>
              <div>
                <span className="font-display text-3xl text-amber-300 block">1 Milhão</span>
                <span className="text-xs text-[#EFDCAB]/70">de Espectadores</span>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Catálogo de Eventos Juninos (Foco Principal do Usuário) */}
        <EventCatalog
          events={EVENTS_DATA}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCityFilter={selectedCityFilter}
          onSelectCityFilter={setSelectedCityFilter}
          savedEventIds={savedEventIds}
          onToggleSave={handleToggleSave}
        />

        {/* 2. Diretório de Quadrilhas Cearenses */}
        <QuadrilhasDirectory />

        {/* 3. Showcase dos Municípios Polos */}
        <MunicipalitiesShowcase
          onSelectCity={(city) => {
            setSelectedCityFilter(city);
          }}
        />

        {/* 4. Enciclopédia de Tradições, Culinária e Mestres */}
        <TraditionsSection />

        {/* 5. Galeria Fotográfica de Momentos */}
        <GallerySection />

        {/* 6. Formulário e Painel de Inscrições 2025 */}
        <InscricoesSection />
      </main>

      {/* Modal de Eventos Salvos (Minha Rota) */}
      <SavedEventsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedEvents={savedEventsList}
        onRemoveSaved={handleToggleSave}
        onClearAll={handleClearAllSaved}
        onSelectEvent={() => {}}
      />

      {/* Rodapé */}
      <Footer />
    </div>
  );
};

export default App;
