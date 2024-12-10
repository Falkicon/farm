interface Route {
  path: string;
  action: () => string | Promise<string>;
}

export const routes: Route[] = [
  {
    path: '/',
    action: () => `
      <div class="p-4">
        <fluent-card class="p-4">
          <h1 class="text-2xl font-bold mb-4">Welcome to the Web App Boilerplate</h1>
          <p class="mb-4">This is a modern web application starter template.</p>
          <fluent-button appearance="accent">Get Started</fluent-button>
        </fluent-card>

        <fluent-card class="p-4 mt-4">
          <h2 class="text-xl font-bold mb-4">Try it out</h2>
          <fluent-text-field placeholder="Enter some text"></fluent-text-field>
        </fluent-card>
      </div>
    `,
  },
  {
    path: '/about',
    action: () => `
      <div class="p-4">
        <fluent-card class="p-4">
          <h1 class="text-2xl font-bold mb-4">About</h1>
          <p class="mb-4">This boilerplate includes:</p>
          <ul class="list-disc pl-5 mb-4">
            <li>TypeScript</li>
            <li>Web Components with Fluent UI</li>
            <li>Fastify Backend</li>
            <li>Tailwind CSS</li>
          </ul>
          <fluent-button appearance="lightweight" onclick="window.history.back()">Go Back</fluent-button>
        </fluent-card>
      </div>
    `,
  },
];
