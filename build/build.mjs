import { build } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const dirName = path.dirname(fileURLToPath(import.meta.url));

await build({
  build: {
    minify: true,
    emptyOutDir: true,
    rollupOptions: {
      plugins: [{
        transform(source, sid) {
          if (/src(\/|\\)main.js/.test(sid)) {
            return source.replace('/node_modules/@vcmap/cesium/Source/', './assets/cesium/');
          }
          return source;
        },
      }],
    },
  },
  configFile: './build/commonViteConfig.mjs',
});

await fs.symlink(path.join(dirName, '..', 'node_modules', '@vcmap', 'cesium', 'Build', 'Cesium'), path.join(dirName, '..', 'dist', 'assets', 'cesium'));
await fs.symlink(path.join(dirName, '..', 'data'), path.join(dirName, '..', 'dist', 'data'));

