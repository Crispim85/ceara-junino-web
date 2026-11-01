import React, { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface PhotoItem {
  src: string;
  caption: string;
  tag: string;
}

const PHOTOS: PhotoItem[] = [
  {
    src: '/img/imgcarrossel1.jpg',
    caption: 'Evolução coreográfica sincronizada e a beleza das vestimentas típicas',
    tag: 'Dança & Coreografia'
  },
  {
    src: '/img/imgcarrossel2.jpg',
    caption: 'Trio de sanfoneiros e músicos regionais animando o arraial cearense',
    tag: 'Forró & Música Ao Vivo'
  },
  {
    src: '/img/imgcarrossel3.jpg',
    caption: 'Homenagem ao cangaço e às lendas sertanejas no tablado',
    tag: 'Teatro & Tradição'
  },
  {
    src: '/img/imgcarrossel4.jpg',
    caption: 'O brilho das rainhas do São João e seus vestidos suntuosos de chita e pedrarias',
    tag: 'Rainhas Juninas'
  },
  {
    src: '/img/imgcarrossel5.jpg',
    caption: 'A vibração coletiva dos pares no clássico passo do túnel sob aplausos',
    tag: 'Festa da Comunidade'
  },
];

export const GallerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? PHOTOS.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === PHOTOS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="galeria" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-900/10 dark:border-stone-800">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#3C744D] dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Camera className="w-4 h-4 text-amber-500" />
          Registros Visuais
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-stone-900 dark:text-amber-100 uppercase tracking-wide">
          Galeria de Momentos Inesquecíveis
        </h2>
        <p className="mt-3 text-stone-600 dark:text-stone-300 text-base sm:text-lg">
          Imagens que capturam o calor humano, a devoção, o suor e a explosão de cores dos maiores arraiais do Ceará.
        </p>
      </div>

      {/* Carrossel Principal Interativo */}
      <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-stone-950 aspect-[16/10] sm:aspect-[16/9]">
        <img
          src={PHOTOS[currentIndex].src}
          alt={PHOTOS[currentIndex].caption}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Gradiente de Legenda */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 inline-block mb-2">
                {PHOTOS[currentIndex].tag}
              </span>
              <p className="font-display text-xl sm:text-2xl text-amber-100 drop-shadow">
                {PHOTOS[currentIndex].caption}
              </p>
            </div>

            <button
              onClick={() => setLightboxOpen(true)}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
              title="Expandir foto"
              aria-label="Expandir imagem"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Botões de Navegação */}
        <button
          onClick={prevPhoto}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-all hover:scale-110 active:scale-95"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-all hover:scale-110 active:scale-95"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicadores de slide */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-8 bg-amber-400' : 'w-2 bg-white/40'
              }`}
              aria-label={`Ir para foto ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Miniaturas navegáveis abaixo */}
      <div className="flex justify-center gap-3 mt-4 max-w-4xl mx-auto overflow-x-auto py-2">
        {PHOTOS.map((photo, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative rounded-xl overflow-hidden shrink-0 w-20 h-14 sm:w-24 sm:h-16 transition-all ${
              currentIndex === idx
                ? 'ring-4 ring-amber-500 scale-105'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img src={photo.src} alt="Miniatura" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox em Tela Cheia */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Fechar lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="max-w-5xl max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={PHOTOS[currentIndex].src}
              alt={PHOTOS[currentIndex].caption}
              className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl object-contain mx-auto"
            />
            <p className="text-center text-amber-200 mt-4 text-sm font-semibold">
              {PHOTOS[currentIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
