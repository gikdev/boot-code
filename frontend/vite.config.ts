import masterCSS from "@master/css.vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteConfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: false,
      semicolons: false,
      quoteStyle: "double",
    }),
    react(),
    masterCSS(),
    viteConfigPaths(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5078",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
