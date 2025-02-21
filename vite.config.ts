import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
        }
      }
    }
  }
})
