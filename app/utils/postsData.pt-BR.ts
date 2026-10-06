import type { Post } from "~/utils/postsData";

/**
 * Brazilian Portuguese translations for `postsData`.
 *
 * English in `./postsData` is the original, canonical version of every post:
 * posts are written in English first and translated here later. Each entry
 * is a complete translation (title, summary and body) keyed by post id.
 * Posts without an entry are shown in English with an "English only" notice
 * (see `useLocalizedPosts`).
 *
 * When an English post changes, update its translation by hand.
 */

/** A complete translation of the text fields of an English `Post`. */
export type PostTranslation = Pick<Post, "title" | "content" | "htmlContent">;

export const ptBRPostTranslations: Record<string, PostTranslation> = {
  "1": {
    title: "Bem-vindo ao meu blog!",
    content:
      "Este é o meu primeiro post! Estou animado para compartilhar meus pensamentos e experiências com vocês. Nunca fiz nada parecido antes, mas tenho certeza de que vou pegar o jeito.",
    htmlContent: `<article>
      <p>
        Por muito tempo eu tentei construir o projeto pessoal perfeito. No começo eu estava na onda de criar um side project que gerasse alguma renda passiva, depois tentei construir
        um jogo que me interessasse um pouco mais do que só construir algo para ganhar dinheiro. Depois disso voltei e tentei criar um projeto ligado ao jogo que eu já jogo, tentando ganhar algum dinheiro com isso.
      </p>

      <p>
        Depois de alguns anos lutando com projetos grandes demais para eu tocar sozinho, fui forçado a dar um passo atrás após um layoff, e quis me preparar um pouco mais para o mercado. Parei de trabalhar
        nos projetos e precisava de algo para causar uma boa primeira impressão. Eu nunca tinha tentado fazer algo como um blog porque parecia simples demais e não valia o esforço, todo mundo faz.
      </p>

      <p>
        Depois de pensar um pouco decidi criar um blog e imediatamente entendi por que todo mundo faz isso. É o jeito perfeito de compartilhar meus pensamentos e mostrar meu trabalho de forma pequena e direta. Consigo facilmente
        definir um escopo razoável e adicionar coisas interessantes a ele. Mas provavelmente o mais importante é que eu consigo de fato terminar esse projeto. Nos últimos anos eu tive um monte de boas ideias, mas não terminei nenhuma delas,
        comecei a questionar minha capacidade de terminar projetos e senti que não era bom o suficiente.
      </p>

      <blockquote>
        <p><strong>Dica.</strong> Mesmo em projetos pequenos, é importante sempre dar um passo atrás e pensar no que você quer alcançar. É fácil se perder nos detalhes e perder a visão do todo.</p>
      </blockquote>

      <h2>Projetos pessoais</h2>
      <p>Ainda acredito que trabalhar em projetos pessoais é quase obrigatório se você quer melhorar suas habilidades e se manter relevante. Eu sempre amei trabalhar no ecossistema Vue, mas infelizmente minha vida profissional nem sempre foi
        tão flexível quanto eu gostaria: 99% dos projetos simplesmente vão de React/Next.js por padrão e, mesmo sendo bom, não acredito que seja a melhor escolha sempre.</p>

      <p>Trabalhar em projetos pessoais também é uma ótima forma de experimentar novas tecnologias e frameworks, e de aprender com os seus erros. SSR estava ficando muito popular quando comecei meu primeiro projeto pessoal, então aproveitei a oportunidade para aprender
        tecnologias como Nuxt.js. Isso me manteve perto da comunidade e me ajudou a crescer e a melhorar minhas habilidades como desenvolvedor. Estas são as principais coisas que aprendi trabalhando em projetos pessoais:</p>

        <h3>Tecnologias</h3>
        <ul>
            <li>Tailwind CSS</li>
            <li>Nuxt.js</li>
            <li>Supabase</li>
            <li>Flutter</li>
          </ul>
        <h3>Conceitos</h3>
        <ul>
            <li>SSR</li>
            <li>SEO</li>
            <li>Performance</li>
            <li>Levantamento de requisitos</li>
          </ul>

      <h2>Prós e contras</h2>
      <p>Mesmo sendo uma boa oportunidade de se desafiar, nem sempre é fácil.</p>

        <h3>Prós</h3>
        <ul>
            <li>
              Melhorar suas habilidades
            </li>
            <li>
              Entender melhor os requisitos
            </li>
            <li>
              Escolher no que você quer trabalhar
            </li>
          </ul>
        <h3>Contras</h3>
        <ul>
            <li>
              Pode ficar muito grande e complexo
            </li>
            <li>
              Você pode se sentir travado e perder o interesse com muita facilidade
            </li>
            <li>
              Depois de um tempo, você pode se sentir sobrecarregado por não terminar o projeto
            </li>
          </ul>

      <h2>Conclusão</h2>
      <p>
        Com tudo isso, ainda sinto que é muito importante investir em si mesmo no tempo livre. Mas lembre-se sempre de que sua saúde mental é mais importante do que o seu trabalho. É importante se cuidar e priorizar o seu bem-estar. Passos pequenos são a chave do sucesso e você não
        precisa ser produtivo todo dia, às vezes nem toda semana. É importante fazer pausas e se dar tempo para recarregar.
      </p>
    </article>`,
  },
  "2": {
    title: "A batalha dos editores de código com IA",
    content:
      "Testei todos os editores de código populares: Cursor, Windsurf, Trae e até o Zed AI. Aqui vão alguns pensamentos sobre toda essa história de IA.",
    htmlContent: `<article>
        <p>
            O <a href="https://cursor.sh/">Cursor</a> foi o primeiro editor de código a realmente trazer recursos de IA embutidos. É uma ótima ferramenta para devs que querem experimentar interagir com IA.
            Fui um early adopter porque acompanho muitos canais no YouTube, principalmente sobre desenvolvimento frontend. Antes de toda essa história de IA, eu estava sempre procurando uma ferramenta nova que otimizasse
            meu fluxo de trabalho, e foi assim que descobri o <a href="https://zed.dev/">Zed</a>.
        </p>

        <h2>Zed</h2>
        <p>
            Para mim o Zed é o editor de código mais interessante, mesmo com os recursos de IA ainda no começo. É o único que não é um fork do VSCode. Tudo é novo e fica muito bonito. Comparado ao
            VSCode ainda faltam muitos recursos, mas dá para sentir o progresso usando ao longo do tempo. O Zed continua sendo uma ótima ferramenta e construí este site com ele. Normalmente, em
            ambiente de trabalho, tendo a usar a ferramenta mais poderosa para a tarefa, mas em projetos pessoais tenho mais liberdade para testar ferramentas novas, e para uma ferramenta open source o Zed é incrível!
        </p>

        <h2>Cursor</h2>
        <p>
            O Cursor foi meu primeiro editor de código com IA e me apaixonei na hora. Comecei a usar antes de ele dominar tudo e acho que foi a primeira ferramenta que eu fiz questão de contar para todo mundo que eu conhecia.
            Meus amigos tiveram a mesma reação, impressionou todo mundo! Todos começaram a adotar ferramentas de IA nos seus fluxos de trabalho e parecia que o Cursor tinha virado o padrão dos editores com IA. Tive a sorte de ter a assinatura paga e, quando fui demitido, comecei a duvidar do preço cobrado pelo produto.
        </p>

        <p>
            Depois de mais de 6 meses da era Cursor, várias alternativas chegaram ao mercado. Eram opções mais baratas que ofereciam os mesmos recursos do Cursor, mas com um layout bonito, então usei meus projetos pessoais para testá-las, porque não podia abandonar o Cursor no meu fluxo de trabalho, ele era importante a esse ponto.
        </p>

        <h2>Windsurf</h2>
        <p>
            O segundo editor de código que testei foi o <a href="https://windsurfapp.com/">Windsurf</a>. Minhas duas primeiras experiências com a ferramenta foram horríveis, sempre tinha algo quebrado e parecia que não valia o preço. Na segunda tentativa, o botão de pedir algo para a IA não funcionava, foi um pouco frustrante.
        </p>

        <p>
            Na terceira leva do Windsurf dei mais uma chance e a experiência foi completamente diferente. Era um pouco mais lento que o Cursor, mas era mais estável e parecia valer o preço. Com certeza é mais bonito e se encaixou muito bem no meu fluxo de trabalho.
        </p>

        <h2>Trae</h2>
        <p>
            O último que testei foi o <a href="https://trae.ai/">Trae</a>, o primeiro totalmente gratuito. Ele me fez mudar de ideia sobre pagar por produtos assim: tem todos os recursos mais importantes e é muito bonito. Com certeza é mais lento que o Cursor, mas considerando que é uma ferramenta gratuita, vale muito a pena.
        </p>

        <h2>Conclusão</h2>
        <p>
            Hoje em dia existem muitas ferramentas de IA que podemos trazer para os nossos fluxos de trabalho. Há muitos editores de código e até extensões bem poderosas do VSCode que podemos usar, e quando penso em pagar a assinatura de um produto que oferece recursos disponíveis em todo lugar, parece que não vale a pena.
        </p>

        <p>
            O Cursor é com certeza a melhor ferramenta, mas o Trae é gratuito, então fica um pouco difícil recomendar pagar por ele. Também tem o Zed, que é gratuito e uma alternativa bem diferente de simplesmente adicionar recursos de IA e cobrar uma assinatura, em um projeto open source.
        </p>

        <p>
            Mas recentemente fiquei um pouco cético sobre trazer tantos recursos de IA para os nossos fluxos de trabalho. Dá muito trabalho manter e atualizar esses recursos, e nem sempre fica claro quais são os benefícios. Com certeza ajuda em trabalhos repetitivos, mas usar essas ferramentas pode ser um pouco sufocante. Elas tomam conta muito rápido e você pode facilmente começar a depender delas. Por isso decidi usar o Zed neste site, senti que precisava de uma pausa e deixar minha cabeça pensar um pouco. Mas no fim, o mais importante é usar aquilo com que você se sente confortável e que funciona para você.
        </p>
    </article>
    `,
  },
  "3": {
    title: "O D2Brain está no ar!",
    content: `O D2Brain é um lugar onde jogadores podem compartilhar ideias e pensamentos sobre o jogo. Com a ajuda
    de IA, podemos usar recursos como sumarização e, com um pouco de pesquisa, até criar ideias do zero.`,
    htmlContent: `
      <article>
        <p>
            O D2Brain está no ar e você pode acessá-lo
            <a href="https://d2b.vercel.app">neste link</a>,
            seu apoio vai ser muito bem-vindo. A plataforma ainda está no começo, mas já tenho muitas ideias para implementar.
          </p>
        <p><a href="https://d2b.vercel.app">Visitar o D2Brain &rarr;</a></p>

        <h2>Side projects &amp; motivação</h2>
        <p>
          Minha ideia de side project é algo que possa ajudar na minha carreira (pelo menos no momento em que estou agora) e que talvez gere
          alguma renda passiva. O cenário dos sonhos é um projeto que melhore minhas habilidades e ganhe dinheiro no processo, mas isso é muito difícil, já que
          não tenho as habilidades para fazer tudo isso, então vamos manter o foco em estudo e evolução, assim fica mais difícil perder a motivação.
        </p>
        <p>
          No primeiro post do blog comentei como é fácil se perder e acabar deixando seu side project morrer, e tenho um bom exemplo disso na
          página de <a href="/projects">projetos</a> deste site. Com a popularidade das
          ferramentas de IA comecei a refazer algumas ideias antigas que eu tinha em mente, porque é fácil começar e, com a experiência que tenho agora,
          consigo andar bem mais rápido. Sinceramente, deixei outro side project morrer de novo, mas este site é o resultado de juntar algo que pode me ajudar
          com a evolução das minhas habilidades.
        </p>
        <blockquote>
        <p><strong>Uma lição aprendida.</strong> Consumo muito conteúdo sobre programação e já ouvi esta frase muitas vezes: &ldquo;Construa algo que facilite a sua vida&rdquo;. E por algum motivo eu sempre tento fazer algo que dê dinheiro.</p>
      </blockquote>

        <h2>A jornada</h2>
        <p>
          O D2Brain é mais um side project "bem-sucedido", no sentido de que comecei para me ajudar no meu trabalho e tem sido uma ótima experiência de aprendizado.
          Já tinha tentado criar uma plataforma assim alguns anos atrás, mas nunca peguei o jeito e desisti. Desta vez decidi tentar de novo
          e estou feliz que tentei. E o mais importante: tive uma ideia que eu queria implementar do início ao fim e consegui executá-la com sucesso. Agora estou no caminho
          de melhorar a plataforma e deixá-la ainda melhor.
        </p>
        <p>
          Consumo muito conteúdo sobre programação e já ouvi esta frase muitas vezes: "Construa algo que facilite a sua vida". E por algum motivo eu sempre
          tento fazer algo que dê dinheiro. Em algum momento percebi que estava construindo algo sem sentido e que não era útil para mim, e depois dessa percepção
          fica basicamente impossível ter motivação para continuar. Este blog é o primeiro exemplo de uma plataforma que pode me ajudar, com recursos que
          são realmente úteis e que mostram meu trabalho para os outros.
        </p>
        <p>
          O que me fez reviver a plataforma D2Brain foi meu amor pelo jogo e a vontade de criar algo significativo para mim e para os outros. Trabalhar com o jogo
          que amo é muito gratificante, e adicionar recursos relevantes é ainda mais. Terminar isso foi um grande passo e estou animado para ver quais serão os próximos.
          Eu sofri muito para terminar um produto e agora estou até criando roadmaps, melhorando recursos existentes e deixando a plataforma sempre melhor.
        </p>

        <h2>Integração com IA</h2>
        <p>
          Não vou mentir, as ferramentas de IA estão deixando minha vida muito mais fácil e prática. Há cerca de um ano usei alguns modelos capazes para me ajudar a construir este blog, e hoje temos modelos ainda
          mais poderosos, em que posso confiar um pouco mais e, com o contexto e a estrutura certos, usá-los para me ajudar a construir produtos ainda melhores. Outra coisa que estou explorando
          é adicionar IA ao próprio produto, não só às ferramentas que me ajudam a construí-lo.
        </p>
        <ul>
          <li><strong>Sumarização</strong>: resumos com IA para digerir rapidamente o conteúdo da plataforma.</li>
          <li><strong>Gerador de ideias</strong>: um assistente de IA que cria ideias do zero usando APIs externas.</li>
          <li><strong>Agente de chat (em breve)</strong>: uma interface de chat para interagir com a plataforma e ajudar os usuários com sua gameplay.</li>
        </ul>

        <p>
          Na plataforma D2Brain estou explorando a ideia de adicionar IA ao próprio produto e estou me divertindo muito com isso. Já temos sumarização e um
          assistente de IA que cria ideias para a plataforma, fazendo requisições a APIs externas e gerando conteúdo na hora. Estou testando modelos diferentes
          para comparar as respostas e ver o quanto eles conseguem ser capazes nesse contexto também. Depois de tudo isso, o objetivo principal é criar uma interface de chat e um agente para
          interagir com a plataforma e ajudar os usuários com sua gameplay.
        </p>

        <h2>O que vem por aí</h2>
        <p>
          Espero voltar logo a este blog e compartilhar mais sobre o que estou fazendo. Trabalhar em algo que é útil para mim está mudando a forma como penso sobre
          construir e criar produtos. É mais difícil perder a motivação quando você está construindo algo de que gosta.
        </p>
      </article>
    `,
  },
  "4": {
    title: "Como a IA está me ajudando a construir o D2Brain",
    content:
      "Quero me aprofundar um pouco em como uso IA para construir meu projeto, e também nas decisões que tomei sobre como integrar IA à plataforma.",
    htmlContent: `<article>
      <p>
        Faz um tempo, e estou muito orgulhoso do trabalho que fiz neste projeto nos últimos meses. Nem sempre consigo trabalhar muito nele, mas sempre há progresso. Depois do "lançamento" da plataforma alguns meses atrás,
        que não foi exatamente um lançamento, continuei melhorando e fazendo experimentos neste projeto, e muitos deles foram feitos com a ajuda de IA. Acho que dá para separar essa discussão em duas categorias:
      </p>

      <ol>
        <li>Como uso IA na funcionalidade principal da plataforma D2Brain;</li>
        <li>Como a IA me ajudou a construir o D2Brain.</li>
      </ol>

      <p>
        Parecem parecidas, mas na verdade são bem diferentes: hoje em dia podemos usar IA de muitas formas. Vou começar contando como uso IA na funcionalidade principal da plataforma D2Brain.
      </p>

      <h2>Como uso IA na funcionalidade principal do D2Brain</h2>
      <p>
        Mudei meu foco para construir um produto que depende de IA para entregar a funcionalidade principal, e que se integra aos recursos que já existem, que no caso do D2Brain é a criação de ideias. Primeiro criei uma
        página em que o usuário pode se concentrar em criar a sua própria ideia, o próximo passo lógico foi usar IA para gerar uma ideia totalmente nova, e agora mudei para um chat em que o usuário conversa com o meu próprio assistente de IA para entender o jogo e talvez criar
        uma nova ideia a partir das sugestões da IA. O legal é que as várias formas de criar conteúdo se complementam, e isso dá mais liberdade para o usuário criar ideias do jeito que quiser.
      </p>

      <p>
        Agora o objetivo principal é dar mais poder ao chat e ter uma plataforma parecida com o ChatGPT, mas para jogadores de Dota. Dá para conversar, entender conceitos do jogo, criar builds e compartilhá-las com a comunidade se quiser. Conversar com um chat
        costuma parecer muito natural quando ele responde do jeito que o usuário espera.
      </p>

      <p>
        Falando um pouco mais sobre o que move o chat, decidi usar modelos baratos principalmente porque é um projeto pessoal pequeno, então dá para usar uma opção barata e rápida que lê os dados da nossa API e responde ao usuário. Decidi usar
        o <a href="https://artificialanalysis.ai/models/deepseek-v4-pro-0424" target="_blank" rel="noreferrer">DeepSeek v4 Pro</a> no início, ele me deu um bom equilíbrio entre velocidade e precisão no chat, então eu tinha bons resultados com um tempo de resposta relativamente rápido. O que mais me fez trocar foi o lançamento
        dos novos modelos v4 (usaram o mesmo nome para as novas versões): tanto o modelo <a href="https://artificialanalysis.ai/models/deepseek-v4-flash" target="_blank" rel="noreferrer">v4 flash</a> quanto o <a href="https://artificialanalysis.ai/models/deepseek-v4-pro" target="_blank" rel="noreferrer">modelo pro</a> tiveram melhorias significativas e ficaram um pouco
        mais caros no processo. Tive que testar as mudanças, e isso me fez procurar ainda mais o modelo perfeito para este produto. Acabei ficando com o <a href="https://artificialanalysis.ai/models/gpt-5-6-luna" target="_blank" rel="noreferrer">Luna 5.6</a> da OpenAI, um modelo pequeno extremamente rápido e capaz,
        e muito barato também, então se encaixa perfeitamente neste produto.
      </p>

      <p>
        Criei uma estrutura bem simples de plug and play para novos modelos, o que me dá o poder de testar modelos novos e ver como se saem no contexto do produto.
        Já testei muitos modelos e, com todos os modelos incríveis que vêm sendo lançados ultimamente, essa ideia está ficando ainda mais interessante. Para esse contexto, ainda acredito
        que modelos pequenos e rápidos são o caminho.
      </p>

      <h2>Como a IA me ajudou a construir o D2Brain</h2>
      <p>
        Esta é a parte mais interessante na minha opinião. Adotei ferramentas de IA desde o começo e tenho outro <a href="https://r4l-blog-v2.vercel.app/posts/2">post no blog</a> sobre isso. É engraçado
        ver o quanto as coisas mudaram nesse período: agora o setup é completamente diferente e os modelos estão mais poderosos do que nunca. Tento mudar meu setup todo mês para acompanhar
        as mudanças, testar coisas diferentes e ver o que funciona no meu fluxo de trabalho.
      </p>

      <p>
        No mês passado assinei o <a href="https://opencode.ai/go" target="_blank" rel="noreferrer">Opencode Go</a>, a opção mais acessível, que dá acesso a modelos menores, a maioria da China. Me diverti muito usando essas ferramentas,
        elas são bem capazes no que se propõem a fazer e o preço é muito acessível. Como o limite de uso dessa assinatura mais barata pode estourar bem rápido, decidi
        sair em uma missão e testar praticamente todas as opções gratuitas disponíveis: testei os planos gratuitos do Codex, Cursor, Kimi, ZCode, Qoder e até do Antigravity. Menção honrosa
        para o ZCode e o Qoder, com os melhores planos gratuitos, que me ajudaram muito a construir este projeto.
      </p>

      <p>
        Nesse período, um dos melhores exemplos do que fiz com a ajuda de IA foi migrar nosso banco de dados de PostgreSQL para SQLite, que tem melhor suporte na Cloudflare. Usei o
        <a href="https://www.better-t-stack.dev/" target="_blank" rel="noreferrer">better t stack</a> para fazer o scaffold do meu projeto fullstack e inicialmente escolhi PostgreSQL como banco, porque funcionava muito bem com o Neon e eu queria
        experimentar, então foi uma escolha fácil. Quando fiz essa migração eu estava na assinatura do Opencode Go testando os modelos baratos, e o <a href="https://artificialanalysis.ai/models/kimi-k2-7-code" target="_blank" rel="noreferrer">Kimi 2.7 code</a>
        fez tudo muito rápido e com um bom resultado.
      </p>

      <p>
        Olhando para trás é meio engraçado, porque no scaffold do projeto escolhi muita coisa achando que era a melhor opção, e agora tudo parece diferente. Fazendo
        esses testes e experimentando frameworks e bancos de dados diferentes, percebi que esse é um dos melhores casos de uso para IA, e muitas vezes não precisamos dos modelos mais poderosos
        para dar conta do trabalho. Comecei com um app fullstack em Nuxt que agora é um app Nuxt + Hono, de PostgreSQL para SQLite, da Vercel para a Cloudflare. Essas ferramentas de IA foram a única coisa
        que deixou essa transição tranquila e sem dor de cabeça. Eu tenho a experiência para fazer isso sozinho, mas o tempo e o esforço de fazer tudo manualmente não compensam.
      </p>

      <p>
        Este mês estou testando a assinatura OpenAI Plus, o que me fez perceber o quanto o modelo Luna 5.6 é bom para o meu caso de uso neste projeto. Agora estou usando constantemente o
        Sol 5.6, que é o estado da arte, testando novas perspectivas e vendo como vou aplicar esses conceitos no dia a dia. Passei a usar um pouco mais o app desktop em vez de depender tanto
        da CLI para fazer as coisas. A migração para a Cloudflare foi fundamental, porque agora nem preciso rodar o projeto localmente: tenho um ambiente só para desenvolvimento,
        e com isso consigo trabalhar de onde quiser, testar no dispositivo em que estou e ter um fluxo de trabalho mais consistente.
      </p>

      <p>
        O estranho é que isso provavelmente vai mudar no mês que vem, então estou bem curioso para ver como vai ser.
      </p>
    </article>`,
  },
  "5": {
    title: "Criando um sistema para testar como meu agente se sai com diferentes modelos",
    content:
      "Criar um sistema para iterar rapidamente sobre o desempenho do meu agente me ajudou muito a melhorar a funcionalidade de chat do meu app.",
    htmlContent: `<article>
      <p>
        No <a href="/posts/4">último post</a> eu comentei que meu principal side project mudou de rumo para algo como um chat, onde os usuários interagem e criam suas ideias
        sobre o jogo. Um tema muito importante na época era o modelo que eu estava usando. Quando comecei a desenvolver a funcionalidade, decidi usar um modelo do Gemini e
        depois migrei para o DeepSeek v4 Flash (a primeira versão). Começaram a surgir muitos modelos "flash" nos últimos meses, o que se encaixa perfeitamente com a
        ideia do agente BrainBot: eu não precisava que ele fosse super inteligente, só precisava que fosse rápido e confiável. Na época eu tinha que trocar o modelo manualmente
        e testar tudo na mão, e um chat simples e rápido pode levar até 2 minutos para ficar claro e pronto para uso. Sempre enxerguei o potencial da funcionalidade,
        mas ela nunca chegou de fato no nível que eu queria.
      </p>

      <h2>Por que a funcionalidade precisa estar muito boa</h2>
      <p>
        O <a href="https://d2b.vercel.app" target="_blank" rel="noreferrer">D2Brain</a> é uma plataforma para jogadores de Dota 2, e Dota é um jogo meio antigo. Já existem várias fontes de dados para consultar na hora de se preparar para uma partida,
        e o que estou construindo não pretende ser igual, mas dar uma base sólida para uma ideia sobre o jogo é crucial. Dota é um jogo de estratégia e pequenas decisões
        importam muito: pequenas adaptações, timings específicos, estar no lugar certo na hora certa podem basicamente ganhar o jogo para você. O chat em si não resolve esse problema,
        mas pelo menos dá um caminho do que o usuário deve fazer e comprar, e se isso não estiver uns 95% alinhado com o estado atual do jogo, não é útil e
        às vezes pode até atrapalhar a partida.
      </p>

      <p>
        Resumindo, se recomendarmos algo objetivamente errado, isso pode ser mais prejudicial para o usuário do que não recomendar nada. Essa é uma parte muito
        importante do conceito de criar um chat, então precisamos garantir que o que estamos retornando para o usuário faça sentido e esteja correto na
        maioria dos casos de uso.
      </p>

      <h2>Testar manualmente não era suficiente</h2>
      <p>
        Visto de fora isso pode parecer bem simples, mas quando eu estava desenvolvendo essa funcionalidade sozinho, iterar usando a própria funcionalidade
        parecia uma forma viável de garantir que o chat estava funcionando como esperado, e por muito tempo foi. Mas, como mencionei na seção anterior, preciso
        mirar em um padrão muito alto nos resultados do chat, então em algum momento tive que dar um passo atrás e pensar em como automatizar isso. E não estou
        falando de testes unitários ou e2e, e sim de testar a funcionalidade do agente de forma isolada.
      </p>

      <h2>Criando um benchmark para a funcionalidade do BrainBot</h2>
      <p>
        Quando sai um modelo novo, a primeira coisa que faço é olhar o <a href="https://artificialanalysis.ai/" target="_blank" rel="noreferrer">Artificial Analysis</a>. Quero ter uma primeira noção de como o modelo se sai, principalmente
        na relação custo x inteligência. Sinceramente, sempre quis criar um benchmark meu só por diversão, e quando vi a oportunidade de fazer isso agarrei
        assim que pude. Fiquei empolgado demais no começo e provavelmente gastei mais dinheiro do que queria, testando muitos modelos diferentes e também caros,
        mas depois que a empolgação passou consegui focar no que importava, e só de rodar esse benchmark percebi uma coisa extremamente importante: a
        funcionalidade nunca ia funcionar do jeito que eu queria.
      </p>

      <p>
        O principal objetivo das primeiras versões era testar como a funcionalidade do BrainBot funcionava: preencher um estado com herói, função, itens e
        timings para ver como o modelo se sai em um cenário real. Rodar o benchmark com essa abordagem, com vários modelos
        e cenários diferentes, trouxe um resultado muito revelador: a funcionalidade do BrainBot não era nada confiável. Às vezes os modelos mais inteligentes se saíam
        melhor que os mais burros, às vezes não, o tempo para rodar as tarefas variava muito e eu tive muitos testes falhando. O curioso é que isso não foi nada frustrante,
        pelo contrário, me deu o poder de garantir que eu teria uma forma adequada de usar a funcionalidade do BrainBot.
      </p>

      <p>
        Não vou mentir, a ideia de gastar dinheiro para testar o app que eu mesmo estava desenvolvendo não era muito atraente no começo, mas criar
        alguns cenários reais e uma forma estruturada de rodá-los com diferentes modelos pareceu uma abordagem exponencialmente melhor. Eu tinha todas as falhas
        de cada execução em um arquivo JSON: como foi o desempenho, quanto custou, tudo em um só lugar. Comecei a alimentar o fluxo agêntico com isso para melhorar
        a funcionalidade, e a coisa começou a andar muito rápido.
      </p>

      <p>
        Perceber que a abordagem atual do BrainBot estava longe de ser perfeita me fez pensar em uma forma melhor de criar uma solução sólida e confiável
        para os usuários do nosso chat. Mudei completamente da estrutura de "misturar e combinar" que o agente fazia para uma eleição, onde temos partidas PRO como candidatas
        e partidas de alto rank como votos para encontrar o medoide, assim conseguimos garantir que, com base nas partidas mais recentes, a ideia que retornamos ao usuário é a que
        teve o melhor desempenho. Depois dessa mudança tudo começou a fazer mais sentido, o chat ficou instantaneamente mais confiável, e não sei quanto tempo
        eu levaria para chegar nesse ponto testando do jeito que eu fazia antes.
      </p>

      <figure>
        <img
          src="/images/Screenshot_20261006_180303.jpg"
          alt="Ranking do benchmark comparando GPT-6 Luna, GLM 5.3 Flash e DeepSeek V4.1 Flash em inteligência, tempo e custo total"
          loading="lazy"
        />
        <figcaption>Última execução do benchmark: inteligência, tempo e custo total de cada modelo.</figcaption>
      </figure>

      <p>
        Agora estou focado nos modelos que realmente fazem sentido para esta plataforma, e adicionei mais casos de uso ao benchmark para também testar como o agente se comporta, e não
        só a resposta que ele devolve. No geral, esse experimento foi extremamente útil e com certeza me ajudou a melhorar a funcionalidade principal do app.
        Também posso me divertir testando modelos novos e vendo quando faz sentido usá-los. Se você está trabalhando em um projeto parecido que usa IA,
        não hesite em começar a testá-lo de forma automatizada: você pode usar seu harness favorito para criar facilmente uma estrutura pequena e direta, e vai
        sentir os benefícios na hora.
      </p>
    </article>`,
  },
};
