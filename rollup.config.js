// rollup.config.js
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js", // 入口文件
  output: [
    {
      file: "dist/my-library.js", // 输出文件路径
      format: "umd", // 输出格式
      name: "MyLibrary", // UMD 包名称
    },
    {
      file: "dist/my-library.esm.js", // 输出文件路径
      format: "esm", // 输出格式
    },
  ],
  plugins: [
    nodeResolve(), // 解析第三方模块
    commonjs(), // 转换 CommonJS 模块为 ES6 模块
    babel({
      // Babel 转换
      exclude: "node_modules/**", // 排除 node_modules 目录
      babelHelpers: "bundled", // 使用 Bundled 模式
    }),
  ],
};
