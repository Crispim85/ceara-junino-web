import React from 'react';
import { X, Calendar, MapPin, Trash2, Heart, Download } from 'lucide-react';
import { JuninoEvent } from '../types';

interface SavedEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedEvents: JuninoEvent[];
  onRemoveSaved: (eventId: string) => void;
  onClearAll: () => void;
  onSelectEvent: (event: JuninoEvent) => void;
}

export const SavedEventsModal: React.FC<SavedEventsModalProps> = ({
  isOpen,
  onClose,
  savedEvents,
  onRemoveSaved,
  onClearAll,
  onSelectEvent,
}) => {
  if (!isOpen) return null;

  const handleExportAll = () => {
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ceara Junino - Minha Rota//PT-BR',
    ];

    savedEvents.forEach(ev => {
      const startTimeClean = ev.time.replace(':', '');
      const icsDate = ev.date.replace(/-/g, '');
      icsContent.push(
        'BEGIN:VEVENT',
        `SUMMARY:${ev.title} (${ev.municipality})`,
        `DESCRIPTION:Evento salvo da Minha Rota Junina. Local: ${ev.location}`,
        `LOCATION:${ev.location}, ${ev.municipality} - CE`,
        `DTSTART:${icsDate}T${startTimeClean}00`,
        `DTEND:${icsDate}T235900`,
        'END:VEVENT'
      );
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'minha-rota-ceara-junino.ics');
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
        className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl overflow-hidden border border-amber-500/30 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Topo do Modal */}
        <div className="p-6 bg-[#2D5A3C] text-[#EFDCAB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-amber-400 fill-amber-400" />
            <h3 className="font-display text-2xl">
              Minha Rota Junina ({savedEvents.length})
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-stone-200"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Eventos Salvos */}
        <div className="p-6 overflow-y-auto flex-1 divide-y divide-stone-100 dark:divide-stone-800 space-y-3">
          {savedEvents.length === 0 ? (
            <div className="text-center py-12 text-stone-500 dark:text-stone-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40 text-amber-500" />
              <p className="font-semibold text-base mb-1">Sua rota está vazia no momento</p>
              <p className="text-xs max-w-xs mx-auto">
                Clique no ícone de coração nos cards de eventos para montar seu roteiro personalizado pelos arraiais do Ceará!
              </p>
            </div>
          ) : (
            savedEvents.map((ev) => (
              <div 
                key={ev.id} 
                className="pt-3 first:pt-0 flex items-center justify-between gap-3 group"
              >
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectEvent(ev);
                    onClose();
                  }}
                >
                  <span className="text-xs font-bold text-[#3C744D] dark:text-amber-400 uppercase tracking-wider block">
                    {ev.municipality} • {ev.dateDisplay.split('(')[0]}
                  </span>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors text-sm">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {ev.location} ({ev.time})
                  </p>
                </div>

                <button
                  onClick={() => onRemoveSaved(ev.id)}
                  className="p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Remover da rota"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Rodapé com Ações */}
        {savedEvents.length > 0 && (
          <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
            <button
              onClick={onClearAll}
              className="text-xs text-stone-500 hover:text-red-500 font-semibold"
            >
              Limpar Rota
            </button>

            <button
              onClick={handleExportAll}
              className="px-4 py-2 rounded-xl bg-[#3C744D] hover:bg-[#2D5A3C] text-[#EFDCAB] text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Exportar Rota Completa (.ics)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
