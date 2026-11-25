import { defineConfig } from 'vite';

// base: './' 讓 dist 可用相對路徑開啟／上傳，不必一定架在網域根目錄
export default defineConfig({
  base: './',
  preview: {
    // Cloudflare quick tunnel 等公開網域
    allowedHosts: true,
  },
  server: {
    allowedHosts: true,
  },
});
