import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        visualizer({
            open: Boolean(process.env.OPEN_REPORT), // auto-open in browser only if OPEN_REPORT is set
            filename: "bundle-report.html", // output file
            gzipSize: true, // show gzip sizes
            brotliSize: true, // show brotli sizes
        }),
    ],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/setupTests.js", // optional, for jest-dom matchers
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ["react", "react-dom"],
                    vendor: [
                        "axios",
                        "framer-motion",
                        "react-router-dom",
                        "react-hook-form",
                    ],
                },
            },
        },
    },
});
