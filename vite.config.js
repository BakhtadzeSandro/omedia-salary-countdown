import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Omedia Salary Countdown",
        short_name: "Omedia Salary Countdown",
        description: "Omedia Salary Countdown",
        theme_color: "#f5322d",
        icons: [
          {
            src: "favicon-16x16.png",
            sizes: "16x16",
            type: "image/png"
          },
          {
            src: "favicon-32x32.png",
            sizes: "32x32",
            type: "image/png"
          },
        ]
      }
    })
  ]
});
