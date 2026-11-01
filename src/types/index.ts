export interface EventLineupItem {
  time: string;
  item: string;
  category?: 'infantil' | 'adulta' | 'show' | 'oficina' | 'cortejo';
}

export type JuninoRegion = 
  | 'Grande Fortaleza' 
  | 'Cariri' 
  | 'Sertão Central' 
  | 'Litoral Norte / Sobral' 
  | 'Maciço de Baturité' 
  | 'Centro-Sul';

export interface JuninoEvent {
  id: string;
  title: string;
  municipality: string;
  region: JuninoRegion;
  date: string; // YYYY-MM-DD
  dateDisplay: string;
  time: string;
  location: string;
  addressDetails?: string;
  category: 'Festival Competitivo' | 'Mostra Regional' | 'Festa Tradicional' | 'Cortejo Cultural' | 'Quermesse & Shows';
  description: string;
  lineup: EventLineupItem[];
  entry: 'Entrada Gratuita' | 'Entrada Solidária (1kg de Alimento)' | 'Livre Acesso';
  highlight?: boolean;
  image: string;
  expectedAudience?: string;
  mapsQuery?: string;
}

export interface QuadrilhaGroup {
  id: string;
  name: string;
  municipality: string;
  foundedYear: number;
  category: 'Tradicional' | 'Estilizada' | 'Mirim / Infantil';
  currentTheme: string;
  description: string;
  awards: string[];
  image: string;
  instagram?: string;
}

export interface MunicipalityInfo {
  name: string;
  region: JuninoRegion;
  highlightFestival: string;
  tagline: string;
  traditionSnippet: string;
  eventCount: number;
  featuredImg: string;
}

export interface InscriptionData {
  id: string;
  nomeResponsavel: string;
  email: string;
  telefone: string;
  cidade: string;
  nomeGrupo: string;
  categoriaGrupo: string;
  tipoParticipacao: string;
  dataEnvio: string;
  status: 'Aprovada' | 'Em Análise' | 'Pendente';
}
