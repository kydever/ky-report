import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import esbuild from 'rollup-plugin-esbuild'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
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
            resolvers: [ElementPlusResolver()],
            imports: ['vitest'],
            dts: true // generate TypeScript declaration
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        legacy({
            targets: ['defaults', 'not IE 11']
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        proxy: {
            '/ky-api': {
                target: 'https://daily-report.knowyourself.cc/api',
                changeOrigin: true, //是否跨域
                rewrite: (path) => path.replace(/^\/ky-api/, ""),
            },
            '/api': {
                target: 'http://127.0.0.1:5001',
                changeOrigin: true, //是否跨域
            }
        }
    },
    build: {
        brotliSize: false /* 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能 */,
        outDir: 'dist' /* 指定输出路径 */,
        cssCodeSplit: true /* 整个项目中的所有 CSS 将被提取到一个 CSS 文件中 */,
        chunkSizeWarningLimit: 1500 /* chunk 大小警告的限制（以 kbs 为单位） */,
        assetsDir: 'static/img/' /* 指定生成静态资源的存放路径 */,
        emptyOutDir: true /* 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录 */,
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name].[hash].js',
                entryFileNames: 'static/js/[name].[hash].js',
                assetFileNames: 'static/[ext]/[name].[hash].[ext]'
            }
        }
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        coverage: {
            reporter: ['text', 'json', 'html']
        },
        deps: {
            inline: ['element-plus']
        }
    }
})