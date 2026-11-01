import React from 'react';
import { Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="rodape" className="bg-[#1C3B27] text-[#EFDCAB] pt-16 pb-12 border-t-4 border-amber-500/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Seção de Patrocinadores e Apoiadores Oficiais */}
        <div className="border-b border-amber-400/20 pb-12">
          <h4 className="text-center font-display text-xl text-amber-200 tracking-wider uppercase mb-8">
            Patrocinadores & Apoio Institucional
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
            {/* Patrocinador Institucional */}
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-wider text-amber-100/60 block mb-2 font-semibold">
                Patrocinador Institucional
              </span>
              <img
                src="/img/logoCeara.png"
                alt="Logo do Governo do Estado do Ceará"
                className="h-12 w-auto mx-auto object-contain brightness-110"
              />
            </div>

            {/* Patrocinador Oficial */}
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-wider text-amber-100/60 block mb-2 font-semibold">
                Patrocinador Oficial
              </span>
              <img
                src="/img/patrocinio1.png"
                alt="Logo Zuvy"
                className="h-12 w-auto mx-auto object-contain brightness-110"
              />
            </div>

            {/* São Geraldo */}
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-wider text-amber-100/60 block mb-2 font-semibold">
                Apoio Cultural
              </span>
              <img
                src="/img/logoSaoGeraldo.png"
                alt="Logo Cajuína São Geraldo"
                className="h-12 w-auto mx-auto object-contain brightness-110"
              />
            </div>

            {/* Banco do Nordeste */}
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-wider text-amber-100/60 block mb-2 font-semibold">
                Incentivo Regional
              </span>
              <img
                src="/img/Logo-bnb.svg.png"
                alt="Logo Banco do Nordeste"
                className="h-12 w-auto mx-auto object-contain brightness-110"
              />
            </div>
          </div>
        </div>

        {/* Links, Redes Sociais e Identidade */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Coluna 1: Sobre */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <img src="/img/logochapeu.png" alt="Logo" className="h-10 w-auto" />
              <span className="font-display text-2xl text-amber-300">CEARÁ JUNINO</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed max-w-md">
              Plataforma digital dedicada à valorização dos festejos juninos, salvaguarda do patrimônio imaterial, divulgação de eventos nos municípios cearenses e incentivo aos grupos e mestres da cultura popular.
            </p>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h5 className="font-display text-lg text-amber-300 mb-3">Navegação</h5>
            <ul className="space-y-1.5 text-xs text-amber-100/80">
              <li><a href="#eventos" className="hover:text-white transition-colors">Programação de Eventos</a></li>
              <li><a href="#quadrilhas" className="hover:text-white transition-colors">Quadrilhas em Destaque</a></li>
              <li><a href="#municipios" className="hover:text-white transition-colors">Municípios Polos</a></li>
              <li><a href="#tradicoes" className="hover:text-white transition-colors">Tradições & Culinária</a></li>
              <li><a href="#galeria" className="hover:text-white transition-colors">Galeria de Fotos</a></li>
              <li><a href="#inscricoes" className="hover:text-white transition-colors">Inscrições 2025</a></li>
            </ul>
          </div>

          {/* Coluna 3: Redes e Contato */}
          <div id="redes">
            <h5 className="font-display text-lg text-amber-300 mb-3">Canais Oficiais</h5>
            <div className="space-y-2 text-xs text-amber-100/90">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <img src="/img/Instagram_Icon.png" alt="Instagram" className="w-4 h-4 object-contain invert" />
                @cearajunino
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <img src="/img/Tiktok_Icon.png" alt="Tiktok" className="w-4 h-4 object-contain invert" />
                @cearajunino
              </a>
              <a 
                href="mailto:cearajunino@contato.br" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                cearajunino@contato.br
              </a>
            </div>
          </div>
        </div>

        {/* Linha de Direitos e Créditos */}
        <div className="pt-8 border-t border-amber-400/10 text-center text-xs text-amber-200/60 space-y-2">
          <p>
            © 2025 Ceará Junino — Todos os direitos reservados. Aplicação demonstrável de valorização cultural.
          </p>
          <p className="flex items-center justify-center gap-1.5 flex-wrap">
            <span>Evolução e desenvolvimento da plataforma por</span>
            <strong className="text-amber-100">Lucas Crispim</strong>
          </p>
          <p className="text-[11px] text-amber-200/50">
            Base conceitual acadêmica original criada em conjunto com a Equipe 3 – Residência em TIC-20 (FSN1): Anna Clara Bessa, Fernanda Maressa, Gabriel Dias, Gustavo, Lucas Crispim e Vitória.
          </p>
        </div>
      </div>
    </footer>
  );
};
