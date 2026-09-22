import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react(), tailwindcss()],
    base: mode === "production" ? "/word-search-puzzle/" : "/",
    // for testing in local environment
    server: {
        host: '0.0.0.0',
    },
}));
