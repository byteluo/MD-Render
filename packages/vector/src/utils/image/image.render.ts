import yaml from "js-yaml";
import { localImageHandler, urlImageHandler } from "./image.handle";
import { isImageURI, isHttpURI } from "../common";
import path from "path";

function processObject(filePath: string, obj: any) {
  for (const key in obj) {
    let objValue = obj[key];
    if (typeof objValue === "string") {
      if (!isImageURI(objValue)) continue;
      if (!isHttpURI(objValue)) {
        objValue = path.resolve(path.dirname(filePath), objValue);
      }
      const handler = isHttpURI(objValue) ? urlImageHandler : localImageHandler;
      obj[key] = handler(objValue);
    } else if (typeof obj[key] === "object") {
      processObject(filePath, obj[key]);
    }
  }
}

export const markdownImageRender = {
  renderHeader(filePath: string, content: string) {
    const doc = yaml.load(content);
    processObject(filePath, doc);
    return yaml.dump(doc);
  },
  renderBody(filePath: string, content: string) {
    return content;
  },
};
