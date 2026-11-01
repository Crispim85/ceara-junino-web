import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Heart, 
  Users, 
  Sparkles, 
  ChevronRight,
  Share2
} from 'lucide-react';
import { JuninoEvent } from '../../types';

interface EventCardProps {
  event: JuninoEvent;
  isSaved: boolean;
  onToggleSave: (eventId: string) => void;
  onSelectEvent: (event: JuninoEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isSaved,
  onToggleSave,
  onSelectEvent,
}) => {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${event.title} - Ceará Junino`,
        text: `Confira a programação do ${event.title} em ${event.municipality} no dia ${event.dateDisplay}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${event.title} em ${event.municipality} - ${event.dateDisplay}`);
      alert('Informações do evento copiadas para a área de transferência!');
    }
  };

  return (
    <div className="group bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-amber-900/10 dark:border-amber-500/20 shadow-md hover:shadow-festive transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Imagem de Capa com Badges */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

        {/* Badge do Município */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#3C744D] text-[#EFDCAB] shadow-md">
            <MapPin className="w-3.5 h-3.5" />
            {event.municipality}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-900/80 text-amber-200 backdrop-blur-sm">
            {event.region}
          </span>
        </div>

        {/* Botão de Favoritar & Compartilhar */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-stone-200 transition-all hover:scale-110 active:scale-95"
            title="Compartilhar evento"
            aria-label="Compartilhar"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(event.id);
            }}
            className={`p-2 rounded-full transition-all hover:scale-110 active:scale-95 ${
              isSaved
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-900/70 hover:bg-stone-900 text-white'
            }`}
            title={isSaved ? "Remover da minha rota" : "Salvar na minha rota junina"}
            aria-label="Salvar evento"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-stone-950' : ''}`} />
          </button>
        </div>

        {/* Categoria do Evento */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-amber-100">
          <span className="px-2.5 py-0.5 rounded-md bg-amber-600/90 font-medium tracking-wide">
            {event.category}
          </span>
          {event.expectedAudience && (
            <span className="flex items-center gap-1 bg-stone-900/60 backdrop-blur-sm px-2 py-0.5 rounded-md">
              <Users className="w-3 h-3 text-amber-400" />
              {event.expectedAudience}
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo Principal do Card */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Título */}
          <h3 
            onClick={() => onSelectEvent(event)}
            className="font-display text-2xl text-stone-900 dark:text-amber-100 hover:text-[#3C744D] dark:hover:text-amber-300 cursor-pointer transition-colors leading-tight mb-3"
          >
            {event.title}
          </h3>

          {/* Dados de Logística: Data, Horário e Local */}
          <div className="space-y-2 mb-4 text-sm text-stone-600 dark:text-stone-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {event.dateDisplay}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>A partir das <strong>{event.time}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          {/* Prévia da Programação */}
          <div className="bg-[#FFF7E5] dark:bg-stone-800/60 rounded-xl p-3 mb-4 border border-amber-200/60 dark:border-stone-700">
            <span className="text-xs font-bold text-[#3C744D] dark:text-amber-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Atrações confirmadas ({event.lineup.length})
            </span>
            <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1">
              {event.lineup.slice(0, 3).map((item, i) => (
                <li key={i} className="truncate flex items-center gap-1.5">
                  <span className="font-mono text-[11px] text-amber-700 dark:text-amber-400 font-semibold">{item.time}</span>
                  <span>• {item.item}</span>
                </li>
              ))}
              {event.lineup.length > 3 && (
                <li className="text-[11px] text-stone-500 italic pt-0.5">
                  + outras {event.lineup.length - 3} apresentações no cronograma
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Rodapé do Card com Ação */}
        <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <span className="text-xs font-semibold px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            {event.entry}
          </span>

          <button
            onClick={() => onSelectEvent(event)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3C744D] dark:text-amber-400 hover:text-green-800 dark:hover:text-amber-300 transition-colors group-hover:translate-x-1"
          >
            Ver Detalhes
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
