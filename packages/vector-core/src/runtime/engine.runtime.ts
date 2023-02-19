import { config, initConfig } from "./config";

export async function initEngineRuntime() {
  await initConfig();
}

// 引擎运行时，包含一些关键性的方法和数据
export function getRuntime() {
  return {
    getConfig() {
      return config;
    },
    getImageRenderUrl(imageName: string) {},
    getImageVectorPath(imageName: string) {
      return "";
    },
  };
}
