export interface Post {
  id: string;
  image: string;
  title: string;
  content: string;
  date: string;
  htmlContent: string;
}

export const posts: Post[] = [
  {
    id: "1",
    image: "cfc31a16-48e0-4f31-8cab-87e9ba009b3d",
    title: "Welcome to my blog!",
    content:
      "This is my very first post! I'm excited to share my thoughts and experiences with you. I never really done anything like this before, but I'm sure I'll get the hang of it.",
    date: "2025-02-18",
    htmlContent: `<article class="prose lg:prose-xl dark:prose-invert relative z-10 bg-background/80 backdrop-blur-sm rounded-xl p-8 shadow-xl mx-auto mb-12">
      <p class="text-lg leading-relaxed">
        For a long time I tried to build the perfect personal project, initially I was in the trend of creating a side project that can generate some passive income, after that I tried to build
        a game that could interest me a little bit more than just build something that makes money. After that I came back and tried to create a project that connects to the game that I already play and try to make some money out of that.
      </p>

      <p class="text-lg leading-relaxed mt-6">
        After a couple of years struggling with projects that are too big for me to handle alone I was forced to take a step back after a layoff and I want to prepare a little bit more to the market. I stopped working
        in the projects and I needed something to make a good first impression, I never tried to make something like a blog because it seems like it is too simple and not worth the effort, everyone else does it.
      </p>

      <p class="text-lg leading-relaxed mt-6">
        After some thinking I decided to create a blog and immediately noticed why everyone else does it. It is the perfect way to share my thoughts and display my work in a small and direct approach, I can easily
        create a reasonable scope and add interesting things to it. But probably the most important thing it is that I can actually finish this project. For the last couple of years I had a ton of good ideas but didn't actually finish any of them,
        I started to question my ability to finish projects and I felt like I was not good enough.
      </p>

      <div class="my-12 p-8 border-l-4 border-primary bg-card/70 backdrop-blur-sm rounded-xl shadow-lg">
        <h3 class="text-2xl font-semibold mb-3">Pro Tip</h3>
        <p class="text-lg italic">Even for small projects, it's important to always take a step back and think about what you want to achieve. It's easy to get lost in the details and lose sight of the bigger picture.</p>
      </div>

      <h2 class="text-3xl font-bold mt-12 mb-6">Personal projects</h2>
      <p class="text-lg">I still believe that working in a personal projects is almost a must if you want to improve your skills and keep yourself relevant. For me, I always loved to work in the Vue ecosystem, but unfortunately my professional life was not always
        as flexible as I would have liked, 99% of the projects just default to React/Next.js and even though it is good, I don't believe is the best choice every time.</p>

      <p class="text-lg mt-6">Working in personal projects is also a great way to experiment with new technologies and frameworks, and to learn from your mistakes. SSR was getting really popular when I started my first personal project so I used that oportunity to learn
        tecnologies like Nuxt.js. The kept me close to the community and helped me to grow as a developer but also improve my skills as a developer. Here's the main things that I learned working in personal projects:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-card/70 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all hover:scale-105">
          <h4 class="text-xl font-bold mb-4">Technologies</h4>
          <ul class="list-disc list-inside space-y-3">
            <li>Tailwind CSS</li>
            <li>Nuxt.js</li>
            <li>Supabase</li>
            <li>Flutter</li>
          </ul>
        </div>
        <div class="bg-card/70 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all hover:scale-105">
          <h4 class="text-xl font-bold mb-4">Concepts</h4>
          <ul class="list-disc list-inside space-y-3">
            <li>SSR</li>
            <li>SEO</li>
            <li>Performance</li>
            <li>Gathering requirements</li>
          </ul>
        </div>
      </div>

      <h2 class="text-3xl font-bold mt-12 mb-6">Pros and cons</h2>
      <p class="text-lg mb-6">Even though is a good opportunity to push yourself forward, it not always easy to do so.</p>

      <div class="flex flex-col md:flex-row gap-6 my-8">
        <div class="flex-1 p-6 bg-card/70 backdrop-blur-sm rounded-xl shadow-lg">
          <h4 class="text-xl font-bold mb-4">Pros</h4>
          <ul class="list-none space-y-3">
            <li class="flex items-center gap-3">
              <span class="text-green-500 text-xl">✓</span> Improve skills
            </li>
            <li class="flex items-center gap-3">
              <span class="text-green-500 text-xl">✓</span> Better understanding of the requirements
            </li>
            <li class="flex items-center gap-3">
              <span class="text-green-500 text-xl">✓</span> Choice on what you want to work
            </li>
          </ul>
        </div>
        <div class="flex-1 p-6 bg-card/70 backdrop-blur-sm rounded-xl shadow-lg">
          <h4 class="text-xl font-bold mb-4">Cons</h4>
          <ul class="list-none space-y-3">
            <li class="flex items-center gap-3">
              <span class="text-red-500 text-xl">×</span> It can get very big and complex
            </li>
            <li class="flex items-center gap-3">
              <span class="text-red-500 text-xl">×</span> You can feel stuck and lose interest very easily
            </li>
            <li class="flex items-center gap-3">
              <span class="text-red-500 text-xl">×</span> After some time, you may feel overwhelmed by not finishing the project
            </li>
          </ul>
        </div>
      </div>

      <h2 class="text-3xl font-bold mt-12 mb-6">Conclusion</h2>
      <p class="text-lg">
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
    content:
      "I've testes all the popular code editors: Cursor, Windsurf, Trae and even Zed AI. Here are some thoughts on all of this AI stuff.",
    htmlContent: `<article class="prose lg:prose-xl dark:prose-invert relative z-10 bg-background/50 backdrop-blur-sm rounded-xl p-8 shadow-xl mx-auto mb-12">
        <p class="text-lg leading-relaxed mb-6">
            <a class="text-sky-500 hover:text-sky-600 transition-colors underline" href="https://cursor.sh/">Cursor</a> was the first code editor that actually implemented AI features built in. It's a great tool for developers who want to try out interact with AI.
            I was an early adopter because I do follow a lot of YouTube channels, specially related to frontend development. Before all this AI stuff, I was always trying to find a new tool that optimizes
            my workflow, that's when I discovered <a class="text-sky-500 hover:text-sky-600 transition-colors underline" href="https://zed.dev/">Zed</a>.
        </p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Zed</h2>
        <p class="text-lg leading-relaxed mb-6">
            For me Zed is the most interesting code editor, even though the AI features are still in early stages. It is the only one that is not a fork of VSCode. Everything is new and looks really awesome, comparing to
            VSCode the features are still lacking a lot, but we can definitely feel the progress when using that overtime. Zen is still a great tool and I built this website using it, usually in
            work environments I tend to use the most powerful tool for the job, but working in personal project I'm more free to test new tools and for an open source tool Zen is amazing!
        </p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Cursor</h2>
        <p class="text-lg leading-relaxed mb-6">
            Cursor was my first AI code editor and I fell in love immediately. I started using cursor before them dominating everything and I think it was the first tool that I actually told anyone that I knew about it.
            My friends had the same reaction, it blows everyone's mind! Everyone started adopting AI tools to their workflows and seemed like cursor became the standard for AI code editors. I was lucky to get the subscription paid and when I got laid off, I started to doubt the price asked for the product.
        </p>

        <p class="text-lg leading-relaxed mb-6">
            After more than 6 months into the Cursor era, a lot of alternatives were introduced to the market. It was cheaper options that offered the same features as cursor but in a pretty layout, so I used my personal projects to test it out because I could not abandon cursor in my workflow, it was that important.
        </p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Windsurf</h2>
        <p class="text-lg leading-relaxed mb-6">
            The second code editor that I've tried was <a class="text-sky-500 hover:text-sky-600 transition-colors underline" href="https://windsurfapp.com/">windsurf</a>. My first two experiences with the tool were horrible, something was always broken and it felt like it was not worth the price. The second try the ask for AI button option was not working, it was a bit frustrating.
        </p>

        <p class="text-lg leading-relaxed mb-6">
            In the third wave of windsurf I gave it another shot and it felt completely different. It was a bit slower than cursor but it was more stable and it felt like it was worth the price. It is definitely prettier and for my workflow it fitted really well.
        </p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Trae</h2>
        <p class="text-lg leading-relaxed mb-6">
            The last one that I tried was <a class="text-sky-500 hover:text-sky-600 transition-colors underline" href="https://trae.ai/">Trae</a>, and is the first one that is completely free. It made me change my mind about paying for products like that, it has all the most important features and it is very beautiful to look at. It is definitely slower than cursor but considering that's a free tool it is definitely worth it.
        </p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
        <p class="text-lg leading-relaxed mb-6">
            Nowadays there's a lot of AI tools that can be introduced to our workflows. There's a lot of code editors and even very powerful VSCode extensions that we can use and when I think about paying a subscription for a product that offers those features that are available everywhere, it seems like is not worth it.
        </p>

        <p class="text-lg leading-relaxed mb-6">
            Cursor is definitely the best tool, but Trae is a free tool so it is a little bit hard for me to recommend paying for it. There's also Zen which is free and a really different alternative than just adding AI features and charging for a subscription in an open source project.
        </p>

        <p class="text-lg leading-relaxed">
            But recently I became a little bit skeptical about introducing that many AI features to our workflows. It's a lot of work to maintain and update those features, and it's not always clear what the benefits are. It can definitely help on doing some repetitive work but using those tools can be a bit overwhelming. It can take over really quick and you can easily start to depend on it, that's why I decided to use Zen for this website, I felt like I need a break and let my mind think for a little bit. But in the end the most important thing is to use what you feel comfortable with and what works for you.
        </p>
    </article>
    `,
  },
];
