import { extname } from "path";

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
