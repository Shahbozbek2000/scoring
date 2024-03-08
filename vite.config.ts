import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import Unfonts from 'unplugin-fonts/vite'
import checker from 'vite-plugin-checker'
import svgrPlugin from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import htmlPlugin from 'vite-plugin-html-config'

export default defineConfig({
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
  },
  plugins: [
    react(),
    htmlPlugin({
      favicon: '/logo.svg',
      metas: [
        {
          charset: 'UTF-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
      ],
    }),
    svgrPlugin(),
    tsconfigPaths(),
    checker({
      overlay: true,
      typescript: true,
    }),
    eslint({
      cache: false,
      include: ['./src/**/*.tsx', './src/**/*.ts'],
    }),
    Unfonts({
      custom: {
        families: [
          {
            name: 'Onest',
            local: 'Onest',
            src: './src/assets/fonts/*.woff2',
          },
        ],
        preload: true,
        display: 'swap',
        prefetch: false,
        injectTo: 'head-prepend',
      },
    }),
  ],
})
