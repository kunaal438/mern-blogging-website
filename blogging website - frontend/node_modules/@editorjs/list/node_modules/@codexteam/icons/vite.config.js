import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.js'),
            name: '@codexteam/icons',
            fileName: 'index'
        },
        emptyOutDir: false,
    },
});