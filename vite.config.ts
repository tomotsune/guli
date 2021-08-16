import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import * as path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: (name) => {
                        return `element-plus/lib/theme-chalk/${name}.css`
                    },
                    resolveComponent: (name) => {
                        return `element-plus/lib/${name}`
                    }
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'comps': path.resolve(__dirname, 'src/components'),
            'hooks': path.resolve(__dirname, 'src/hooks'),
            'router': path.resolve(__dirname, 'src/router'),
            'store': path.resolve(__dirname, 'src/store')
        }
    }

})