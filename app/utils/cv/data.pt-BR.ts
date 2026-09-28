import type { CvEducation } from "./types";

/**
 * Brazilian Portuguese content overrides for the CV data.
 *
 * English in `./data` is the source of truth: only fields that differ are
 * listed here, keyed by the same stable ids. Anything missing falls back
 * to English automatically (see `useLocalizedCv`).
 */

export interface ExperienceContentOverride {
  title?: string;
  location?: string;
  description?: string;
}

export interface PersonalProjectContentOverride {
  tagline?: string;
  description?: string;
}

export const ptBRExperienceOverrides: Record<
  string,
  ExperienceContentOverride
> = {
  "trio-stamptv-2025": {
    title: "Engenheiro de Software Sênior",
    location: "Boston, EUA | Remoto",
    description:
      "Desenvolvi uma plataforma programática de publicidade nativa em nuvem para CTV e mídia digital, permitindo gestão de campanhas de ponta a ponta, fluxos de criação, segmentação de audiência e análises em tempo real.",
  },
  "trio-studylog-2025": {
    title: "Engenheiro de Software Sênior",
    location: "Boston, EUA | Remoto",
    description: `Desenvolvi uma plataforma full-stack para fluxos de estudo animal (desktop, web, backend) usando React, Next.js, Electron, NestJS, TypeScript, GraphQL, Prisma, SQL/PostgreSQL, Docker e AWS Cognito;

    Construí APIs GraphQL, fluxos de autenticação, lógica compartilhada e integrações frontend em múltiplos serviços.
    Melhorei a manutenibilidade e a velocidade de desenvolvimento com componentes reutilizáveis, schemas compartilhados e geração de código;

    Aumentei a confiabilidade e a eficiência dos deploys com testes automatizados, pipelines de CI/CD e logging estruturado.
    Contribuí para uma arquitetura modular multi-repo separando UI, orquestração de API e responsabilidades de autenticação;

    Colaborei com times de frontend e backend, conduzi code reviews e mantive padrões de código e de testes.`,
  },
  "trio-path-mobile-2024": {
    title: "Engenheiro de Software Sênior",
    location: "Boston, EUA | Remoto",
    description: `Construí e mantive um app mobile fintech em React Native (TypeScript) para gestão e trading de portfólios de criptomoedas, com portfólios autodirigidos e gerenciados por IA, swaps multi-token, saldos em tempo real e integrações bancárias e de corretoras (Plaid, Gemini, MoonPay).

    Liderei a migração para a Nova Arquitetura do React Native (Fabric + TurboModules) no RN 0.76, permitindo renderização nativa síncrona, recursos concorrentes e melhor interoperabilidade JavaScript-nativo em iOS e Android. Isso foi crítico para um app fintech dependente de gráficos de alta performance, atualizações de saldo em tempo real e interações fluidas por gestos (Reanimated 3).;

    Entreguei recursos voltados ao usuário como login biométrico, autenticação de dois fatores, avaliação de risco (Nitrogen), fluxos de KYC/conformidade, pagamentos recorrentes e programa de indicação, além de integrar analytics (Amplitude, Firebase, AppsFlyer) e ferramentas de engajamento (Braze, Intercom) para impulsionar retenção e decisões orientadas a dados.`,
  },
  "trio-tally-2023": {
    title: "Engenheiro de Software Sênior",
    location: "Boston, EUA | Remoto",
    description: `Mantive e melhorei uma plataforma para usuários gerenciarem seus cartões de crédito e pagamentos, criando linhas de crédito e implementando outras estratégias para ajudar clientes a sair das dívidas;

      Construí uma plataforma SDK para encapsular o recurso de pagamento e integrá-lo a sites parceiros;

      Trabalhei em uma ferramenta interna para funcionários melhorarem o suporte ao cliente, integrarem facilmente nossa funcionalidade principal e criarem uma melhor experiência de uso.`,
  },
  "trio-path-web-2022": {
    title: "Engenheiro de Software",
    location: "Boston, EUA | Remoto",
    description: `Construí e mantive um web app fintech em Vue.js para gestão e trading de portfólios de criptomoedas, com portfólios autodirigidos e gerenciados por IA, swaps multi-token, saldos em tempo real e integrações bancárias e de corretoras (Plaid, Gemini, MoonPay).

    Entreguei recursos voltados ao usuário como autenticação de dois fatores, avaliação de risco (Nitrogen), fluxos de KYC/conformidade, pagamentos recorrentes e programa de indicação, além de integrar analytics (Amplitude, Firebase, AppsFlyer) e ferramentas de engajamento (Braze, Intercom) para impulsionar retenção e decisões orientadas a dados.`,
  },
  "trio-optel-2021": {
    title: "Engenheiro de Software",
    location: "Boston, EUA | Remoto",
    description: `Construí um sistema de rastreabilidade que acompanha cervejas até suas matérias-primas, gerando planilhas que substituíram o trabalho manual dos funcionários do cliente;

    Automatizei todos os sistemas internos de rastreio em uma única plataforma, ajudando a identificar problemas no processo e aumentando o controle do cliente sobre seus próprios produtos.`,
  },
  "xtra-social-2020": {
    title: "Engenheiro de Software",
    location: "Sarasota, EUA | Remoto",
    description: `Melhorei uma rede social privada usando Vue, Node, Express e MongoDB;

    Desenvolvi do zero a plataforma social com novos frameworks e bibliotecas em Vue 3;

    Ajudei a definir e refinar requisitos para essa nova rede social aprimorada`,
  },
  "lella-booking-2020": {
    title: "Engenheiro de Software",
    location: "Polônia | Remoto",
    description: `Desenvolvi um aplicativo mobile para agendar, gerenciar e oferecer consultas aos clientes;

      Construí uma aplicação web de visualização de dados para o aplicativo mobile.`,
  },
  "splab-analyst-2020": {
    title: "Analista de Sistemas Júnior",
    location: "Brasil",
    description:
      "Trabalhei em uma aplicação web de gestão e visualização de dados para os outros projetos da empresa.",
  },
  "splab-web-2019": {
    title: "Desenvolvedor Web",
    location: "Brasil",
    description:
      "Trabalhei em vários projetos: TCoM Desktop, aplicação desktop para testar, carregar, limpar e verificar as máquinas de cartão de crédito da empresa; TCoM Loader, nova plataforma que extraiu o recurso de carga do TCoM Desktop; LiTT, aplicação web de gestão e visualização de dados para o TCoM Desktop e o TCoM Loader.",
  },
  "splab-efinance-2017": {
    title: "Desenvolvedor Web",
    location: "Brasil",
    description:
      "E-Finance: aplicação web de gestão financeira para empresas.",
  },
  "embedded-themes-2016": {
    title: "Estudante de Desenvolvimento de Software",
    location: "Brasil",
    description: "Criei temas de Android para o sistema operacional do cliente.",
  },
};

export const ptBRPersonalProjectOverrides: Record<
  string,
  PersonalProjectContentOverride
> = {
  d2brain: {
    tagline: "Plataforma full-stack de ideias de Dota 2 com assistente de IA",
    description:
      "Plataforma full-stack para criar, compartilhar e discutir ideias de Dota 2 com chat IA BrainBot, pagamentos e smoke tests automatizados.",
  },
  "r4l-blog-v2": {
    tagline: "Plataforma de blog pessoal com IA",
    description:
      "Blog em Nuxt com um gêmeo digital de IA que responde perguntas sobre meu trabalho, além de geração de CV personalizado a partir de descrições de vagas.",
  },
  hooperz: {
    tagline: "Jogo de basquete multiplayer em tempo real no navegador",
    description:
      "Jogo de pontuação em equipe com estado ao vivo, comunidades e histórico de partidas via Supabase realtime.",
  },
  dota2brain: {
    tagline: "Base de conhecimento textual do jogo",
    description:
      "Transforma o conhecimento de Dota 2, hoje concentrado em vídeos, em guias de texto rápidos para consulta durante o jogo.",
  },
  tjgoal: {
    tagline: "Jogo de futebol no navegador movido pela comunidade",
    description:
      "Jogo comunitário de fazer gols inspirado no BRGol, com temporadas, times e classificação ao vivo.",
  },
};

export const ptBREducation: CvEducation = {
  institution: "Universidade Federal de Campina Grande - UFCG",
  degree: "Bacharelado em Ciência da Computação",
  period: "2015 - 2019",
  details: ["Participação em Projetos de Monitoria: Laboratório de Programação II"],
};

export const ptBRContactLocation = "João Pessoa/PB, Brasil (GMT -3)";

/** English skill category -> Portuguese display name. */
export const ptBRSkillCategories: Record<string, string> = {
  "Frameworks & Libraries": "Frameworks & Bibliotecas",
  Testing: "Testes",
  "Data & Cloud": "Dados & Nuvem",
};

export const ptBRPositions = {
  all: "Engenheiro de Software Sênior",
  front: "Engenheiro Frontend Sênior",
  full: "Engenheiro de Software Sênior",
} as const;

export const ptBRSummaries = {
  all: "Engenheiro de Software Sênior com mais de 8 anos de experiência em desenvolvimento web. Proficiência avançada em frameworks TypeScript modernos, incluindo React, Vue.js, Next.js e Node.js. Colaboração comprovada com times globais na construção de soluções escaláveis, com comunicação intercultural eficaz.",
  front:
    "Engenheiro de Software Sênior com mais de 8 anos de experiência em desenvolvimento frontend. Proficiência avançada em frameworks TypeScript modernos, incluindo React, Vue.js, Next.js e React Native. Colaboração comprovada com times globais na construção de soluções escaláveis, com comunicação intercultural eficaz.",
  full: "Engenheiro de Software Sênior com mais de 8 anos de experiência em desenvolvimento web. Proficiência avançada em frameworks TypeScript modernos, incluindo React, Vue.js, Next.js e Node.js. Colaboração comprovada com times globais na construção de soluções escaláveis, com comunicação intercultural eficaz.",
} as const;
