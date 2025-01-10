import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // we use this proxy to communicate with the backend*************
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        secure: false, // because this we are using http and not https
      }
    }
  },
  plugins: [react()],
})
