import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.tsx'),
            name: 'luter.component',
            formats: ['es'],
            fileName: 'index',
        },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDom",
                    "react/jsx-runtime": "react/jsx-runtime"
                }
            }
        }
    }
})
