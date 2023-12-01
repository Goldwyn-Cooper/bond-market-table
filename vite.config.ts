import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  
  if (command == "build") {
    const { GITHUB_REPOSITORY } = process.env;
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
      base: `/${GITHUB_REPOSITORY!.split('/')[1]}/`, // Repository 이름
    };
  } else {
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
    };
  }
});