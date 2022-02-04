/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import { fileURLToPath } from 'url';
import commonViteConfig from './build/commonViteConfig.mjs';

const dirName = path.dirname(fileURLToPath(import.meta.url));

const configMain = defineConfig({
  ...commonViteConfig,
  optimizeDeps: {
    exclude: [
      '@vcmap/core',
      'ol',
    ],
    include: [
      '@vcmap/core > fast-deep-equal',
      '@vcmap/core > axios',
      '@vcmap/core > rbush-knn',
      '@vcmap/core > pbf',
      'ol > pbf',
    ],
  },
  server: {
    https: false,
    port: 8080,
  },
});

export default configMain;
