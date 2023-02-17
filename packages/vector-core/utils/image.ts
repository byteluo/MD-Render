import { extname } from "path";
import { isPlainObject, forEach } from "lodash";
import yaml from "js-yaml";

interface ImageRepository {
  [fileURI: string]: {
    expires: number;
    md5: string;
    filePath: string;
  };
}

const imageRepository: ImageRepository = {};

function isImageUrl(url: string) {
  url = url.toString();
  const extName = extname(url);
  return [".jpg", ".jpeg", ".png", "webp"].includes(extName);
}

const markdownImageRender = {
  async renderHeader(filePath: string, content: string) {
    function collectImageFromAttrs(attrs: any): Array<string> {
      function flattenAttrs(attrs: any, arr: any[] = []) {
        const isComplexValue = (el: any) =>
          Array.isArray(el) || isPlainObject(el);
        if (isComplexValue(attrs)) {
          forEach(attrs, (value, key) => {
            if (isComplexValue(value)) {
              flattenAttrs(value, arr);
            } else {
              arr.push({ obj: attrs, key });
            }
          });
        }
        return arr;
      }
      const arr = flattenAttrs(attrs);
      const imageWrapper = arr
        .filter(({ obj, key }) => isImageUrl(obj[key]))
        .map(({ obj, key }) => obj[key]);
      return [];
    }

    return "";
  },
  async renderBody(filePath: string, content: string) {
    return "";
  },
};

export async function renderImage(
  filePath: string,
  content: string,
  type: "markdown" = "markdown"
) {
  if (type === "markdown") {
    const { renderBody, renderHeader } = markdownImageRender;
    const splitFlag = "---\n";
    if (content.includes(splitFlag)) {
      return renderBody(filePath, content);
    } else {
      let [header, body] = content.split(splitFlag);
      header = await renderHeader(filePath, content);
      body = await renderBody(filePath, content);
      return header + splitFlag + body;
    }
  }
  return "";
}
