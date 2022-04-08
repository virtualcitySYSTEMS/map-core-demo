/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import commonViteConfig from './build/commonViteConfig.mjs';

const configMain = defineConfig({
  ...commonViteConfig,
  optimizeDeps: {
    exclude: [
      '@vcmap/core',
      'ol',
    ],
    include: [
      '@vcmap/core > fast-deep-equal',
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
