export type PostImageAspectRatio = "16:9" | "9:16";

export interface Post {
  id: string;
  image: string;
  title: string;
  content: string;
  date: string;
  htmlContent: string;
  aspectRatio?: PostImageAspectRatio;
}

export const posts: Post[] = [
  {
    id: "1",
    image: "cfc31a16-48e0-4f31-8cab-87e9ba009b3d",
    aspectRatio: "9:16",
    title: "Welcome to my blog!",
    content:
      "This is my very first post! I'm excited to share my thoughts and experiences with you. I never really done anything like this before, but I'm sure I'll get the hang of it.",
    date: "2025-02-18",
    htmlContent: `<article>
      <p>
        For a long time I tried to build the perfect personal project, initially I was in the trend of creating a side project that can generate some passive income, after that I tried to build
        a game that could interest me a little bit more than just build something that makes money. After that I came back and tried to create a project that connects to the game that I already play and try to make some money out of that.
      </p>

      <p>
        After a couple of years struggling with projects that are too big for me to handle alone I was forced to take a step back after a layoff and I want to prepare a little bit more to the market. I stopped working
        in the projects and I needed something to make a good first impression, I never tried to make something like a blog because it seems like it is too simple and not worth the effort, everyone else does it.
      </p>

      <p>
        After some thinking I decided to create a blog and immediately noticed why everyone else does it. It is the perfect way to share my thoughts and display my work in a small and direct approach, I can easily
        create a reasonable scope and add interesting things to it. But probably the most important thing it is that I can actually finish this project. For the last couple of years I had a ton of good ideas but didn't actually finish any of them,
        I started to question my ability to finish projects and I felt like I was not good enough.
      </p>

      <blockquote>
        <p><strong>Pro Tip.</strong> Even for small projects, it's important to always take a step back and think about what you want to achieve. It's easy to get lost in the details and lose sight of the bigger picture.</p>
      </blockquote>

      <h2>Personal projects</h2>
      <p>I still believe that working in a personal projects is almost a must if you want to improve your skills and keep yourself relevant. For me, I always loved to work in the Vue ecosystem, but unfortunately my professional life was not always
        as flexible as I would have liked, 99% of the projects just default to React/Next.js and even though it is good, I don't believe is the best choice every time.</p>

      <p>Working in personal projects is also a great way to experiment with new technologies and frameworks, and to learn from your mistakes. SSR was getting really popular when I started my first personal project so I used that oportunity to learn
        tecnologies like Nuxt.js. The kept me close to the community and helped me to grow as a developer but also improve my skills as a developer. Here's the main things that I learned working in personal projects:</p>

        <h3>Technologies</h3>
        <ul>
            <li>Tailwind CSS</li>
            <li>Nuxt.js</li>
            <li>Supabase</li>
            <li>Flutter</li>
          </ul>
        <h3>Concepts</h3>
        <ul>
            <li>SSR</li>
            <li>SEO</li>
            <li>Performance</li>
            <li>Gathering requirements</li>
          </ul>

      <h2>Pros and cons</h2>
      <p>Even though is a good opportunity to push yourself forward, it not always easy to do so.</p>

        <h3>Pros</h3>
        <ul>
            <li>
              Improve skills
            </li>
            <li>
              Better understanding of the requirements
            </li>
            <li>
              Choice on what you want to work
            </li>
          </ul>
        <h3>Cons</h3>
        <ul>
            <li>
              It can get very big and complex
            </li>
            <li>
              You can feel stuck and lose interest very easily
            </li>
            <li>
              After some time, you may feel overwhelmed by not finishing the project
            </li>
          </ul>

      <h2>Conclusion</h2>
      <p>
        With all of that, I still feel like it is very important to work on yourself in your off time. But you should always remember that your mental health is more important than your work. It's important to take care of yourself and prioritize your well-being. Small steps are key to success and you don't
        need to be productive every day, sometimes not even every week. It's important to take breaks and give yourself time to recharge.
      </p>
    </article>`,
  },
  {
    id: "2",
    title: "AI code editor battle",
    date: "2025-02-24",
    image: "9b2b1b27aaf74aa3961c47062e0ab85c",
    aspectRatio: "9:16",
    content:
      "I've tested all the popular code editors: Cursor, Windsurf, Trae and even Zed AI. Here are some thoughts on all of this AI stuff.",
    htmlContent: `<article>
        <p>
            <a href="https://cursor.sh/">Cursor</a> was the first code editor that actually implemented AI features built in. It's a great tool for developers who want to try out interact with AI.
            I was an early adopter because I do follow a lot of YouTube channels, specially related to frontend development. Before all this AI stuff, I was always trying to find a new tool that optimizes
            my workflow, that's when I discovered <a href="https://zed.dev/">Zed</a>.
        </p>

        <h2>Zed</h2>
        <p>
            For me Zed is the most interesting code editor, even though the AI features are still in early stages. It is the only one that is not a fork of VSCode. Everything is new and looks really awesome, comparing to
            VSCode the features are still lacking a lot, but we can definitely feel the progress when using that overtime. Zen is still a great tool and I built this website using it, usually in
            work environments I tend to use the most powerful tool for the job, but working in personal project I'm more free to test new tools and for an open source tool Zen is amazing!
        </p>

        <h2>Cursor</h2>
        <p>
            Cursor was my first AI code editor and I fell in love immediately. I started using cursor before them dominating everything and I think it was the first tool that I actually told anyone that I knew about it.
            My friends had the same reaction, it blows everyone's mind! Everyone started adopting AI tools to their workflows and seemed like cursor became the standard for AI code editors. I was lucky to get the subscription paid and when I got laid off, I started to doubt the price asked for the product.
        </p>

        <p>
            After more than 6 months into the Cursor era, a lot of alternatives were introduced to the market. It was cheaper options that offered the same features as cursor but in a pretty layout, so I used my personal projects to test it out because I could not abandon cursor in my workflow, it was that important.
        </p>

        <h2>Windsurf</h2>
        <p>
            The second code editor that I've tried was <a href="https://windsurfapp.com/">windsurf</a>. My first two experiences with the tool were horrible, something was always broken and it felt like it was not worth the price. The second try the ask for AI button option was not working, it was a bit frustrating.
        </p>

        <p>
            In the third wave of windsurf I gave it another shot and it felt completely different. It was a bit slower than cursor but it was more stable and it felt like it was worth the price. It is definitely prettier and for my workflow it fitted really well.
        </p>

        <h2>Trae</h2>
        <p>
            The last one that I tried was <a href="https://trae.ai/">Trae</a>, and is the first one that is completely free. It made me change my mind about paying for products like that, it has all the most important features and it is very beautiful to look at. It is definitely slower than cursor but considering that's a free tool it is definitely worth it.
        </p>

        <h2>Conclusion</h2>
        <p>
            Nowadays there's a lot of AI tools that can be introduced to our workflows. There's a lot of code editors and even very powerful VSCode extensions that we can use and when I think about paying a subscription for a product that offers those features that are available everywhere, it seems like is not worth it.
        </p>

        <p>
            Cursor is definitely the best tool, but Trae is a free tool so it is a little bit hard for me to recommend paying for it. There's also Zen which is free and a really different alternative than just adding AI features and charging for a subscription in an open source project.
        </p>

        <p>
            But recently I became a little bit skeptical about introducing that many AI features to our workflows. It's a lot of work to maintain and update those features, and it's not always clear what the benefits are. It can definitely help on doing some repetitive work but using those tools can be a bit overwhelming. It can take over really quick and you can easily start to depend on it, that's why I decided to use Zen for this website, I felt like I need a break and let my mind think for a little bit. But in the end the most important thing is to use what you feel comfortable with and what works for you.
        </p>
    </article>
    `,
  },
  {
    id: "3",
    date: "2026-05-13",
    image: "d2b",
    title: "D2Brain is out!",
    content: `D2Brain is a place where players can share ideas and thoughts about the game. With the help
    of AI, we can utilize features like summarization and with some research even create ideas from scratch.`,
    htmlContent: `
      <article>
        <p>
            D2Brain is out and you can access it at
            <a href="https://d2b.vercel.app">this link</a>,
            your support will be very appreciated. I'm still on early stages of the platform but I've already have a lot of ideas to implement.
          </p>
        <p><a href="https://d2b.vercel.app">Visit D2Brain &rarr;</a></p>

        <h2>Side Projects &amp; Motivation</h2>
        <p>
          My idea of a side project is something that can be helpful for my career(at least on the stage I'm at right now) and it maybe can generate
          some passive income. The dream scenario is a project that can improve my skills making money in the process, but this is very hard since
          I don't have the skills to do all of that, so let's keep on the study and improvement focus so it is harder to get unmotivated.
        </p>
        <p>
          In the first blog post I commented about how easy it is to lose track and eventually let your side project die, I have a nice example at
          the <a href="/projects">projects</a> page on this website. With the popularity of
          AI tools I started to redo some of the old ideas that I had in mind because it is easy to get started and with more experience that I have now,
          I'm able to move way faster. Honestly, I let another side project die again but this website is the result of combining something that can be helpful for me
          and improving my skills.
        </p>
        <blockquote>
        <p><strong>A lesson learned.</strong> I consume a lot of programming related content and I've heard this sentence a lot of times: &ldquo;Build something that can make your life easier&rdquo;. And for some reason I always try to make something that can make money instead.</p>
      </blockquote>

        <h2>The Journey</h2>
        <p>
          The D2Brain project is another "successful" side project in the sense that I started it to help me with my work and it has been a great learning experience.
          I've already tried to create a platform like that a few years back but I never really got the hang of it and gave up. This time I decided to give it another shot
          and I'm glad I did. And most important, I had an idea that I wanted to implement from start to finish and I was able to execute it successfully. Now I'm on the path
          to improve the platform and make it even better.
        </p>
        <p>
          I consume a lot of programming related content and I've heard this sentence a lot of times: "Build something that can make your life easier". And for some reason I always
          try to make something that can make money instead. Eventually I realized that I'm building something that is pointless and not useful for me, and after this realization
          it's basically impossible to get motivated to continue working on it. This blog is the first example of a platform that can be helpful for me, building some features that
          can actually be useful and display my work to others.
        </p>
        <p>
          The idea to revive the D2Brain platform is my love for the game and my desire to bring something that is meaningful for me and for others. So working with the game
          that I love is very rewarding and adding meanful features feel even more rewarding. Finishing that was a huge step forward and I'm excited to see what the next steps will be.
          I struggled so much to finish a product and now I'm even creating roadmaps, improving existing features and making the platform always better.
        </p>

        <h2>AI Integration</h2>
        <p>
          I can't lie, AI tools are making my life so much easier and convenient. Around a year ago I've used some capable models to help me build this blog and today we have even
          powerful ones, that I can trust a bit more and with the correct context and structure I can use them to help me build even better products. Another thing that I'm exploring
          is adding AI to the product itself, not just the tools to help me build it.
        </p>
        <ul>
          <li><strong>Summarization</strong>: AI-powered summaries to quickly digest platform content.</li>
          <li><strong>Idea Generator</strong>: An AI assistant that creates ideas from scratch using external APIs.</li>
          <li><strong>Chat Agent (soon)</strong>: A chat interface to interact with the platform and help users with their gameplay.</li>
        </ul>

        <p>
          On the D2Brain platform, I'm exploring the idea of adding AI to the product itself and I'm having a lot of fun with it. We already have summarization and a
          AI assistant that can create ideas for the platform, making requests to external APIs and generating content on the fly. I'm playing around with different models
          to test the outputs and see how capable they can be on this context as well. After all of that the main goal is to create a chat interface and create an agent to
          interact with the platform and help users with their gameplay.
        </p>

        <h2>What's Next</h2>
        <p>
          Hopefully I can get back to this blog soon and share more about what I'm working on. Working on something that can be useful to me is changing how I think about
          building and creating products. It is harder to get unmotivated when you are building something that you like.
        </p>
      </article>
    `,
  },
  {
    id: "4",
    image: "{653DB11E-B417-4A81-B915-169327A11AB9}",
    title: "How AI is helping me build D2Brain",
    date: "2026-08-25",
    content: "I want to dive a bit deeper into how I use AI to build my project, also the decisions I made on how to integrate AI into the platform.",
    htmlContent: `<article>
      <p>
        It's been a while and I'm very proud to the work I did on this project in the past few months. I'm not always able to work a ton on this project but progress is always made. After the "lauch" of the platform a few months ago,
        which was not actually a lauch I kept improving and doing experiments on this project, and a lot of those was made with the help of AI. I think I can separate this discussion into two categories:
      </p>

      <ol>
        <li>How I use AI for the core functionality of the D2Brain platform;</li>
        <li>How AI helped me build D2Brain.</li>
      </ol>

      <p>
        These looks similar but they are actually very different, we can utilize AI nowadays in many different ways. I'll start telling about how do I use AI in the core functionality of the D2Brain platform.
      </p>

      <h2>How do I use AI in the core functionality of D2Brain</h2>
      <p>
        I've shifted my focus into building a product that relies on AI to provide the core functionality now, and that integrates with the current existing features that is already available, in the D2Brain case is the idea creation. I've initially created a
        page that the user can focus on creating his own idea, the next logic feature was to use AI to generate a brand new idea and now I pivoted to having a chat for the user to interact with my own AI assistant to help him understand the game and maybe create
        a new idea based on the AI's suggestions. The great thing is that the multiple ways of creating data complement each other, this gives more freedom to the user to play around the way he wants to create ideas.
      </p>

      <p>
        Now the main goal is to give more power to the chat, and have a platform similar to a ChatGPT, but for dota players. We can chat, understand concepts of the game, create build and share that with the community if we want, talking to a chat
        usually feels very natural if is replyies the way the user expects.
      </p>

      <p>
        Talking a bit more about what powers the chat, I've decided to use cheap models mostly because it is a personal small project, so we can use a cheap and fast option that can read the data from our source api and respond to the user. I've decided to use
        <a href="https://artificialanalysis.ai/models/deepseek-v4-pro-0424" target="_blank" rel="noreferrer">DeepSeek v4 Pro</a> initially, it gave me a good balance between speed and accuracy for the chat, so I was getting good result in a relatively fast response time. What mainly made me switch was the lauch of
        the new v4 models(they used the same name for new releases) so both the <a href="https://artificialanalysis.ai/models/deepseek-v4-flash" target="_blank" rel="noreferrer">v4 flash</a> model and the <a href="https://artificialanalysis.ai/models/deepseek-v4-pro" target="_blank" rel="noreferrer">pro model</a> got significant upgrades, and they got a bit
        expensive in the process. I had to play around and test the changes and this got me to search even more for the perfect model for this product. I've landed on OpenAI <a href="https://artificialanalysis.ai/models/gpt-5-6-luna" target="_blank" rel="noreferrer">Luna 5.6</a>, a extremly fast and capable small model,
        very cheap too, so it fits perfectly for this product.
      </p>

      <p>
        I created a structure that is really simple to plug and play new models, so this gives me the power to test new models and see how they perform in the context of the product.
        I've already tested a lot of models, and with all of the awesome models that are being released lately, this idea is getting even more interesting. For this context, I still believe
        that small and fast models are the way to go.
      </p>

      <h2>How AI helped me build D2Brain</h2>
      <p>
        This is the most interesting part IMO, I've adopted AI tools since the beggining and I do have another <a href="https://r4l-blog-v2.vercel.app/posts/2">blog post</a> about that. It's funny
        to see how much things changed in this period, now the setup is completely different and the models are as powerful as ever. I try to change my setup every month so I can keep up
        with the changes, test different things and make sure what works for my workflow.
      </p>

      <p>
        Last month I subscribed to <a href="https://opencode.ai/go" target="_blank" rel="noreferrer">Opencode Go</a>, the most accesible option that gives access to smaller models, mostly from China. I had a blast using this tools,
        they are very capable to what they are meant for and the price is very accesible. Since the usage limit for this more creap subscription can hit kinda quickly, I've decided to
        go on a mission and test pretty much all the free options available, I've testes all the free tiers from Codex, Cursor, Kimi, ZCode, Qoder and even Antigravity. Honorable mention
        ZCode and Qoder with the best free tiers that helped me a lot to build this project.
      </p>

      <p>
        In this period, one of the greatest examples I did with the help of AI was to migrate our database from PostgreSQL to SQLite, that is better supported on cloudflare. I've used
        <a href="https://www.better-t-stack.dev/" target="_blank" rel="noreferrer">better t stack</a> to scaffold my fullstack project and I initially picked PostgreSQL as the database, because it worked great with Neon and I wanted
        to try it out so it was a easy choice for me. When I did this migration I was on my opencode go subscription testing the cheao models and <a href="https://artificialanalysis.ai/models/kimi-k2-7-code" target="_blank" rel="noreferrer">Kimi 2.7 code</a>
        did the entire thing really fast and with a good result.
      </p>

      <p>
        Looking back is kinda funny because when scaffolding the project I picked a lot of stuff thinking that it was the best option and everything looks different now. Doing
        these tests and trying different frameworks and databases, I've realized that is one of the best use cases for AI, and a lot of times we don't need the most powerful ones
        to get the job done. I've started with a Nuxt fullstack app that now is a Nuxt + Hono app, from PostgreSQL to SQLite, from Vercel to Cloudflare. These AI tools were the only thing
        that made this transition seamless and without any hassle. I do have the expertise to do that myself, but the time and effort it would take to do that manually is not worth it.
      </p>

      <p>
        This month I'm testing it out the OpenAI Plus subscription, that made me realize how good the 5.6 luna model is for my use case in this project, I'm constantly using the state
        of the art 5.6 Sol now and trying out new perspectives and how I'll apply these concepts in my day to day use. I've moved a bit more to the desktop app instead of relying a lot
        on the CLI to get some work done. The migration to cloudflare was key because now I don't even need to run my project locally, I can have a environemnt just for development,
        with that in mind I can easily work everywhere that I want, test on the device I'm on and have a more consistent workflow.
      </p>

      <p>
        The weird part is that this will probably change in the next month, so I'm definately looking forward to see how it goes.
      </p>
    </article>`,
  },
  {
    id: "5",
    title: "Creating a system to test how my agent performs with different models",
    date: "2026-10-05",
    image: "luna-glm-5-3-flash-deepseek-v4-1-flash-pets-terraria-v2",
    aspectRatio: "16:9",
    content: "Creating a system to quickly iterate how my agent is performing helped me a lot to improve the chat functionality of my app.",
    htmlContent: `<article>
      <p>
        In the latest <a href="/posts/4">blog post</a> I mentioned that my main side project pivoted to something like a chat for the users to interact and create their ideas
        about the game. One really important topic at the time was the model I was using. When I started to develop the feature I decided to use a Gemini model, and
        later migrated to DeepSeek v4 Flash (the first release). We started to get a lot of "flash" models in the last few months, which fits perfectly with the
        idea for the BrainBot agent: I didn't need it to be super smart, I just needed it to be fast and reliable. At the time I had to manually change the model
        and test everything by hand, and a simple and fast chat can take up to 2 minutes to be clear and ready to use. I've always seen the potential of the feature,
        but it never really got to the very good state I wanted it to be in.
      </p>

      <h2>Why the functionality needs to be in a very good state</h2>
      <p>
        <a href="https://d2b.vercel.app" target="_blank" rel="noreferrer">D2Brain</a> is a platform for Dota 2 players, and Dota is kind of an old game. We already have a bunch of sources of data to consume when getting ready for a match,
        and what I'm building is not aiming to be the same, but giving a solid foundation to an idea about the game is crucial. Dota is a strategy game and minor decisions
        matter a lot: small adaptations, specific timings, being in the right place at the right time can basically win you the game. The chat itself doesn't solve this problem,
        but at least it gives a road to what the user should do and buy, and if this is not like 95% aligned with the current state of the game, it's not useful and
        can actually be harmful to the match sometimes.
      </p>

      <p>
        In short, if we recommend something that is objectively wrong, it can be more detrimental to the user than not recommending anything at all. This is a very
        important part of the concept of creating a chat, so we need to make sure that the things we are returning to the user make sense and are correct for
        most use cases.
      </p>

      <h2>Testing manually was not enough</h2>
      <p>
        This can look very straightforward from the outside, but when I was developing this functionality all by myself, iterating with the feature itself
        looked like a viable way to make sure the chat was working as expected, and for a long time it was. But as I mentioned in the previous section, I need to
        aim for a very high standard on the results of the chat, so eventually I had to take a step back and think about how I could automate that. And I'm not
        talking about unit or e2e tests, but testing the agent functionality in isolation.
      </p>

      <h2>Creating a benchmark for the BrainBot functionality</h2>
      <p>
        When a new model drops, the first thing I do is check <a href="https://artificialanalysis.ai/" target="_blank" rel="noreferrer">Artificial Analysis</a>. I want to have an initial perspective on how the model performs, especially
        in cost x intelligence. Honestly, I always wanted to create a benchmark myself just for fun, and when I saw the opportunity to do that I jumped on it as
        soon as I could. I got too excited at the beginning and probably spent more money than I wanted to, trying a lot of different and also expensive models,
        but after the hype went away I was able to focus on what mattered, and just running this benchmark made me realize an extremely important thing: the
        functionality was never going to perform the way I wanted.
      </p>

      <p>
        The main goal of the initial versions was to test how the BrainBot functionality worked: populate a state with hero, role, items and
        timings so that I could see how the model performs in a real-world scenario. Running the bench with that approach, with a lot of different models
        and different scenarios, showed a very insightful result: the BrainBot functionality was not reliable at all. Sometimes smarter models performed
        better than the dumber ones, sometimes they didn't, the time to run the tasks was all over the place and I got a lot of failed tests. Funny thing, this was not frustrating
        at all, it gave me the power to make sure I had a proper way to use the BrainBot functionality.
      </p>

      <p>
        Not gonna lie, the idea of spending money to test the app that I was developing myself was not very attractive at the beginning, but creating
        some real scenarios and a structured way of running them with different models felt like an exponentially better approach. I had all of the failures
        of each run in a JSON file: how the performance went, how much it cost, everything in one place. I started to feed that into the agentic workflow for improving
        the functionality and the engine started running really fast.
      </p>

      <p>
        Realizing that the current approach for BrainBot was far from perfect made me think about a better way to create a solid and reliable solution
        for the users of our chat. I completely changed from the mix-and-match structure the agent was doing to an election, where we have PRO matches as candidates
        and high rank matches as votes to find the medoid, so we can guarantee that, based on the latest matches, the idea we are returning to the user is the one that
        performed the best. After making this change everything started to make more sense, the chat instantly became more reliable, and I'm not sure how long
        it would have taken me to get to this point testing the way I was doing it before.
      </p>

      <figure>
        <img
          src="/images/Screenshot_20261006_180303.jpg"
          alt="Benchmark ranking comparing GPT-6 Luna, GLM 5.3 Flash and DeepSeek V4.1 Flash by intelligence, time and total cost"
          loading="lazy"
        />
        <figcaption>Latest benchmark run: intelligence, time and total cost for each model.</figcaption>
      </figure>

      <p>
        Now I'm focused on the models that really make sense for this platform, and I added more use cases to the benchmark so I can also test how the agent behaves and not
        only the output it spits out. This experiment was extremely helpful overall and definitely helped me improve the core functionality of the app.
        I also get to have some fun testing new models and checking when it makes sense to use them. If you are working on a similar project that uses AI,
        don't hesitate to start testing it in an automated way: you can use your favorite harness to easily create a small and direct structure, and you'll
        feel the benefits right away.
      </p>
    </article>`,
  },
];
