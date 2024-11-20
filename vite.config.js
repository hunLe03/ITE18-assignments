import { defineConfig } from 'vite';
import path from 'path';

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env;

export default defineConfig({
    root: 'src/',
    publicDir: '../static/', // Adjust if static files are inside src/static
    base: './',
    server: {
        host: true,
        open: !isCodeSandbox, // Open if it's not a CodeSandbox
    },
    build: {
        outDir: '../dist', // Ensuring cross-platform compatibility
        emptyOutDir: true,
        sourcemap: true,
    },
});
