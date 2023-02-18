import yaml from "js-yaml";
import { checkImageInCache } from "./image.cache";
import { localImageHandler, urlImageHandler } from "./image.handle";
import { isImage, isURL } from "../common";

interface ImageProcessorConfig {
  imageDir: string;
}

function processObject(
  obj: any,
  config: ImageProcessorConfig,
  processedImages: Set<string>
) {
  const promises: Array<Function> = [];
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      if (!isImage(obj[key])) continue;
      const [b, cache] = checkImageInCache(obj[key]);
      if (b) {
        continue;
      }
      const handler = isURL(obj[key]) ? urlImageHandler : localImageHandler;
      promises.push(async () => {
        const handleResult = await handler(obj[key], config.imageDir);
        obj[key] = handleResult;
      });
    } else if (typeof obj[key] === "object") {
      processObject(obj[key], config, processedImages);
    }
  }

  return promises;
}

export const markdownImageRender = {
  async renderHeader(filePath: string, content: string) {
    const doc = yaml.load(content);
    const config = { imageDir: "" };
    // 收集所有 promises
    const promises = processObject(doc, config, new Set<string>());
    await Promise.all(promises);
    return yaml.dump(doc);
  },
  async renderBody(filePath: string, content: string) {
    return "";
  },
};
