import React, { useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Heart, 
  Sparkles, 
  Download,
  Users,
  Tag
} from 'lucide-react';
import { JuninoEvent } from '../../types';

interface EventDetailModalProps {
  event: JuninoEvent | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (eventId: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  // Gerador simples de arquivo .ics para exportar para o calendário
  const handleExportICS = () => {
    const startTimeClean = event.time.replace(':', '');
    const icsDate = event.date.replace(/-/g, '');
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ceara Junino//PT-BR',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title} - ${event.municipality}`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
      `LOCATION:${event.location}, ${event.municipality} - CE`,
      `DTSTART:${icsDate}T${startTimeClean}00`,
      `DTEND:${icsDate}T235900`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}-ceara-junino.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-stone-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-amber-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner com Imagem e Fechar */}
        <div className="relative h-60 sm:h-72 w-full shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />

          {/* Botão de Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-stone-200 transition-all hover:scale-110 active:scale-95"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges superiores */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#3C744D] text-[#EFDCAB] uppercase tracking-wider">
              {event.municipality}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-900/80 text-amber-200">
              {event.region}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-600 text-white">
              {event.category}
            </span>
          </div>

          {/* Título sobreposto */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="font-display text-2xl sm:text-3xl text-amber-100 drop-shadow-md leading-tight mb-1">
              {event.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {event.location} • {event.municipality} - CE
            </p>
          </div>
        </div>

        {/* Corpo do Modal rolável */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Ficha Resumo: Data, Horário, Entrada e Estimativa */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FFF7E5] dark:bg-stone-800/60 p-4 rounded-2xl border border-amber-200 dark:border-stone-700">
            <div>
              <span className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> Data
              </span>
              <p className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                {event.dateDisplay.split('(')[0]}
              </p>
            </div>
            <div>
              <span className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> Horário
              </span>
              <p className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                Início às {event.time}
              </p>
            </div>
            <div>
              <span className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mb-1">
                <Tag className="w-3.5 h-3.5 text-amber-600" /> Acesso
              </span>
              <p className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                {event.entry}
              </p>
            </div>
            <div>
              <span className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mb-1">
                <Users className="w-3.5 h-3.5 text-amber-600" /> Público Esperado
              </span>
              <p className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                {event.expectedAudience || 'Aberto'}
              </p>
            </div>
          </div>

          {/* Descrição do Evento */}
          <div>
            <h4 className="font-display text-lg text-stone-900 dark:text-amber-100 mb-2">
              Sobre esta celebração
            </h4>
            <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Cronograma / Programação Detalhada */}
          <div>
            <h4 className="font-display text-xl text-[#3C744D] dark:text-amber-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Cronograma Oficial das Quadrilhas & Atrações
            </h4>

            <div className="border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
              {event.lineup.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 flex items-start sm:items-center justify-between gap-3 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold shrink-0">
                      {item.time}
                    </span>
                    <span className="text-stone-800 dark:text-stone-200 text-sm font-medium">
                      {item.item}
                    </span>
                  </div>
                  {item.category && (
                    <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-stone-100 dark:bg-stone-800 text-stone-500 shrink-0">
                      {item.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barra de Ações Fixa no Rodapé do Modal */}
        <div className="p-4 bg-stone-50 dark:bg-stone-950/80 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(event.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all active:scale-95 ${
                isSaved
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-stone-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-stone-950' : ''}`} />
              {isSaved ? 'Na Minha Rota' : 'Salvar Evento'}
            </button>

            <button
              onClick={handleExportICS}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 text-sm font-semibold flex items-center gap-2 transition-all active:scale-95"
              title="Adicionar à agenda (Google Calendar / Apple Calendar)"
            >
              <Download className="w-4 h-4" />
              Exportar para Calendário (.ics)
            </button>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              event.mapsQuery || `${event.location}, ${event.municipality}, Ceará`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#3C744D] hover:bg-[#2D5A3C] text-amber-100 font-display text-base tracking-wide flex items-center gap-2 transition-all active:scale-95 shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};
