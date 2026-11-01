export interface TraditionItem {
  id: string;
  category: 'culinaria' | 'musica' | 'rituais' | 'mestres';
  title: string;
  subtitle: string;
  description: string;
  curiosity: string;
  iconName: string;
}

export const TRADITIONS_DATA: TraditionItem[] = [
  {
    id: 'mungunza-cearense',
    category: 'culinaria',
    title: 'Mungunzá Doce e Salgado',
    subtitle: 'O prato fumegante que aquece as noites de arraiá',
    description: 'No Ceará, o mungunzá tem duas almas: a versão doce, cozida lentamente no leite de coco fresco, leite condensado e canela em pau; e o tradicional mungunzá salgado sertanejo, enriquecido com carnes defumadas, costelinha e cheiro-verde.',
    curiosity: 'É tradição cearense servir uma tigela bem quente de mungunzá no final da madrugada das quadrilhas para revigorar os brincantes!',
    iconName: 'Soup'
  },
  {
    id: 'baiao-de-dois',
    category: 'culinaria',
    title: 'Baião de Dois com Queijo de Coalho',
    subtitle: 'A harmonia perfeita entre o arroz da terra e o feijão de corda',
    description: 'Eternizado no clássico de Luiz Gonzaga e Humberto Teixeira, o baião de dois cearense atinge seu ápice com bastante queijo de coalho derretendo, nata fresca, coentro e generosas gotas de manteiga da terra da serra.',
    curiosity: 'Nas quermesses juninas cearenses, é comumente servido com paçoca de carne de sol socada no pilão.',
    iconName: 'UtensilsCrossed'
  },
  {
    id: 'fole-oito-baixos',
    category: 'musica',
    title: 'Sanfona & Fole de Oito Baixos',
    subtitle: 'A voz de prata que comanda o arrasta-pé',
    description: 'O acordeon e o fole de 8 baixos são o coração sonoro das quadrilhas. Seu fole bombeia o ar que conduz as mudanças de ritmo: do xote dengoso ao baião acelerado e ao galope das evoluções coreográficas.',
    curiosity: 'Mestres sanfoneiros do Ceará costumam afinar seus foles em tons específicos para fazer a poeira subir dos terreiros batidos.',
    iconName: 'Music'
  },
  {
    id: 'trio-nordestino',
    category: 'musica',
    title: 'A Santíssima Trindade do Forró',
    subtitle: 'Sanfona, Zabumba e Triângulo',
    description: 'O trio instrumental canônico estabelecido no Nordeste: a zabumba dita a batida pulsante com a baqueta pesada e a virada rítmica do bacalhau; o triângulo marca o contratempo agudo de aço; e a sanfona tece as melodias inesquecíveis.',
    curiosity: 'Em uma quadrilha competitiva cearense, a banda regional ao vivo toca sem parar por até 35 minutos sincronizada com 100 dançarinos.',
    iconName: 'Disc'
  },
  {
    id: 'casamento-matuto',
    category: 'rituais',
    title: 'Casamento Matuto & O Marcador',
    subtitle: 'O humor e a sátira teatral que dão início ao baile',
    description: 'Uma das cenas mais aguardadas de qualquer festival: o noivo relutante que tenta fugir, o delegado sertanejo com sua espingarda, o pai da noiva zeloso e o padre enrolado com seu latim improvisado.',
    curiosity: 'O Marcador da quadrilha é o mestre de cerimônias: ao grito de "Anarriê!", "Alavantú!" e "Olha o túnel!", ele guia dezenas de pares em coreografias sincronizadas milimetricamente.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'fogueira-sagrada',
    category: 'rituais',
    title: 'A Fogueira e o Batismo de Compadres',
    subtitle: 'Luz que ilumina os santos do mês de junho',
    description: 'Cada santo tem o formato tradicional de sua fogueira: quadrada para Santo Antônio, redonda para São João e triangular para São Pedro. Diante da fogueira acesa, sela-se o sagrado pacto de compadrio e comadrio.',
    curiosity: 'Pular a fogueira de braços dados com alguém é a consagração do compadrio de São João, que se diz durar a vida inteira.',
    iconName: 'Flame'
  },
  {
    id: 'irmaos-aniceto',
    category: 'mestres',
    title: 'Irmãos Aniceto & Bandas Cabaçais',
    subtitle: 'Patrimônio vivo da tradição caririense',
    description: 'Diretamente do Crato, a Banda Cabaçal dos Irmãos Aniceto preserva uma herança rítmica e acrobática centenária de origem indígena Kariri. Tocam pífanos, zabumbas e caixas enquanto realizam saltos e golpes teatrais com espadas de madeira.',
    curiosity: 'O grupo já se apresentou em dezenas de países levando a ancestralidade pré-colonial do sertão do Ceará.',
    iconName: 'Sparkles'
  },
  {
    id: 'espedito-seleiro',
    category: 'mestres',
    title: 'Mestre Espedito Seleiro',
    subtitle: 'O couro que colore o figurino do sertão',
    description: 'De Nova Olinda para as maiores passarelas do mundo, Mestre Espedito Seleiro transformou a arte do couro de gibão dos vaqueiros em desenhos e arabescos multicoloridos que hoje vestem noivos, rainhas e cangaceiros das quadrilhas cearenses.',
    curiosity: 'Seu pai fabricou a lendária sandália de solado quadrado usada por Lampião para enganar as pegadas deixadas na caatinga.',
    iconName: 'Award'
  }
];
