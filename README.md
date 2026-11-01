# Ceará Junino — Plataforma Digital da Cultura Junina Cearense

Uma aplicação web moderna, rica e interativa dedicada à valorização, salvaguarda e difusão dos festejos juninos do Ceará. A plataforma reúne a programação detalhada dos festivais, catálogo de quadrilhas históricas e contemporâneas, guia dos municípios polos, enciclopédia de saberes tradicionais e formulário funcional de inscrições culturais.

> **Sobre este projeto:** Esta aplicação é uma evolução autônoma e completa desenvolvida por mim (Lucas Crispim) a partir da base acadêmica inicial criada em equipe durante a **Residência em TIC-20 (Capacita Brasil / C-Jovem - Trilha FullStack)**. O projeto estático original entregue pela equipe pode ser conferido em [GabrielDias23/Ceara-Junino](https://github.com/GabrielDias23/Ceara-Junino).

---

## Principais Funcionalidades

### 1. Catálogo Dinâmico de Eventos Juninos
- **Filtro por Município**: Navegue pela programação oficial de cidades como Canindé, Juazeiro do Norte, Fortaleza, Maracanaú, Sobral, Barbalha, Iguatu e Quixadá.
- **Filtro por Período**: 1ª Quinzena, 2ª Quinzena, Semana de São João e Finais Estaduais (São Pedro).
- **Pesquisa em Tempo Real**: Busque por nome do festival, atração, quadrilha ou praça.
- **Modos de Visualização Alternáveis**:
  - **Cards**: Apresentação visual completa com status de público, horário e acesso.
  - **Linha do Tempo (Cronograma)**: Disposição cronológica com badges dos dias.
  - **Por Município**: Visão agrupada por polos culturais.
- **Modal de Detalhes**:
  - Cronograma completo de apresentações horário a horário (quadrilhas mirins, escolares, adultas e shows).
  - Link direto para rotas no **Google Maps**.
  - **Exportação para Calendário (.ics)** compatível com Google Agenda e Apple Calendar.

### 2. "Minha Rota Junina" (Sistema de Favoritos)
- Salve eventos de interesse com persistência automática no `localStorage`.
- Modal dedicado para gerenciar os festivais selecionados.
- Exportação em lote de toda a rota personalizada em formato `.ics`.

### 3. Diretório de Quadrilhas Cearenses
- Perfis detalhados de agremiações consagradas: *Junina Babaçu, Quadrilha Zé Testinha, Grupo Ceará Junino, Revolução Junina (Canindé), Raízes do Sertão (Juazeiro)*, entre outras.
- Filtros por categoria: Tradicionais vs. Estilizadas.
- Histórico de fundação, temas da temporada, premiações e links de redes sociais.

### 4. Vitrine dos Municípios Polos
- Destaques geográficos das macro-regiões (Cariri, Sertão Central, Grande Fortaleza, Litoral Norte, Centro-Sul).
- Ao clicar no município, o catálogo de eventos é filtrado instantaneamente.

### 5. Enciclopédia de Tradições & Saberes Populares
- Abas interativas divididas em:
  - **Sabores do Sertão**: Mungunzá doce e salgado, baião de dois com queijo de coalho, paçoca e bolo de milho.
  - **Sons & Instrumentos**: Sanfona de 8 baixos, zabumba, triângulo e pandeiro.
  - **Rituais & Fogueiras**: Casamento matuto, pular a fogueira e simpatias de Santo Antônio.
  - **Mestres da Cultura**: Mestres de tradição como Espedito Seleiro e os Irmãos Aniceto.

### 6. Galeria de Momentos com Lightbox
- Registro das apresentações com fotos originais do projeto, legendas temáticas e modo tela cheia.

### 7. Sistema de Inscrições & Painel Demonstrativo
- Formulário de submissão para grupos juninos, bandas de forró e iniciativas culturais.
- Validação de dados, confirmação visual e **Painel de Submissões** em tempo real com status.

### 8. Modo Noturno (Tema Escuro)
- Alternador de tema no cabeçalho adaptando todas as cores para conforto visual noturno.

---

## Tecnologias Utilizadas

- **Frontend**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Efeitos Festivos**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Fontes**: Google Fonts (*Londrina Solid, Arimo, Outfit*)

---

## Como Executar o Projeto Localmente

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   cd Ceara-Junino
   ```

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:5173/`.

4. **Gerar a build de produção**:
   ```bash
   npm run build
   ```

5. **Visualizar a build de produção**:
   ```bash
   npm run preview
   ```

---

## Histórico do Projeto e Equipe Original

O projeto **Ceará Junino** nasceu da união de estudantes no programa de **Residência em TIC-20 - Capacita Brasil/C-Jovem (Trilha de Desenvolvimento FullStack)** como uma página estática de entrega final.

- **Repositório da entrega acadêmica original:** [github.com/GabrielDias23/Ceara-Junino](https://github.com/GabrielDias23/Ceara-Junino)
- **Integrantes da Equipe Original:**
  - Anna Clara Bessa
  - Fernanda Maressa
  - Gabriel Dias
  - Gustavo
  - Lucas Crispim
  - Vitória

*Para fins de histórico e portfólio, os arquivos da entrega inicial foram preservados no repositório como `index.legacy.html` e `style.legacy.css`.*