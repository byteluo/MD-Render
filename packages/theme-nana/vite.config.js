import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import AutoImport from "unplugin-auto-import/vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关函数
      dts: "src/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
    }),
    viteCompression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
      "@store": path.join(__dirname, "./src/store"),
      "@component": path.join(__dirname, "./src/component"),
      "@config": path.join(__dirname, "./src/config.ts"),
      "@page": path.join(__dirname, "./src/page"),
      "@image": path.join(__dirname, "./src/assets/image"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  },
});
