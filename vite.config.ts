import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [require('autoprefixer')],
    },
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    // terserOptions: {
    //   compress: {
    //     //生产环境时移除console,debugger
    //     drop_console: true,
    //     drop_debugger: true,
    //   },
    // },
  },
});
