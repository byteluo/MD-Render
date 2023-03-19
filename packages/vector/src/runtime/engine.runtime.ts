import { config, initConfig } from "./config";
import path from "path";
import { getStringMD5 } from "../utils/common";

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
      return path.resolve(config.distDir, config.imageDirName, imageName);
    },
    getMarkdownRenderPath(filePath: string, id: string) {
      const relativePath = filePath.replace(config.dataDir, "");
      const dirName = path.dirname(relativePath);
      if (dirName == path.sep) {
        return path
          .join(config.distDir, relativePath)
          .replace(/\.md$/, ".json");
      } else {
        return path.join(config.distDir, dirName, id + ".json");
      }
    },
  };
}
