import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import esbuild from 'rollup-plugin-esbuild'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        {
            ...esbuild({
                target: 'chrome70',
                // 如有需要可以在这里加 js ts 之类的其他后缀
                include: /\.vue|ts$/,
                loaders: {
                    '.vue': 'js'
                }
            }),
            enforce: 'post'
        },
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    define: {
        'process.env': {
            BASEURL: 'http://127.0.0.1'
        }
    }
})
