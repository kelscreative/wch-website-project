import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        pillars: resolve(__dirname, 'pillars.html'),
        chambers: resolve(__dirname, 'chambers.html'),
        founder: resolve(__dirname, 'founder.html'),
        teachings: resolve(__dirname, 'teachings.html'),
        events: resolve(__dirname, 'events.html'),
        contact: resolve(__dirname, 'contact.html'),
        policies: resolve(__dirname, 'policies.html'),
      },
    },
  },
});
