import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000, // Set limit to 1000 KB
    rollupOptions: {
      output: {
        manualChunks(id){
          if(id.includes("src/input/")){
            return "input";
          }
          if(id.includes("src/output/")){
            return "output";
          }
          if(id.includes("src/context/")){
            return "context";
          }
          if(id.includes("src/util/")){
            return "util";
          }
          if(id.includes("src/settings/")){
            return "settings";
          }
        }
      }
    }
  }
})
