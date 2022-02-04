/* eslint-disable import/extensions */
import path from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';

const configMain = defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(process.cwd(), 'src')}`,
      '@vcsuite/uicomponents': `${path.resolve(process.cwd(), 'components')}`,
      vue: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    createVuePlugin(),
    Components({
      resolvers: [
        VuetifyResolver(),
      ],
      dirs: ['src'],
      include: [],
      exclude: [],
    }),
  ],
});

export default configMain;
