import { markdownImageRender } from "./image.render";

const SPLIT_FLAG = "---\n";

/**
 * 用来处理文本中的图片数据，考虑到我们的程序会进行大量的计算，
 * 所以图片的处理，全部交给调度器来处理
 */
export function renderImage(
  filePath: string,
  content: string,
  type: "markdown" = "markdown"
) {
  if (type === "markdown") {
    const { renderBody, renderHeader } = markdownImageRender;
    const frontMatterRegex = /^---\r?\n([\s\S]*?)\n---\r?\n/;

    const frontMatterMatch = content.match(frontMatterRegex);
    let header = frontMatterMatch ? frontMatterMatch[1] : "";
    let body = content.replace(frontMatterRegex, "");
    if (header) {
      header = renderHeader(filePath, header);
      body = renderBody(filePath, body);
      return `---\n${header}---\n${body}`;
    } else {
      return renderBody(filePath, body);
    }

    // if (wrapper.length < 3) {
    //   console.log(filePath);
    //   return renderBody(filePath, content);
    // } else {
    //   let [_, header, body] = content.split(SPLIT_FLAG);
    //   header = renderHeader(filePath, header);
    //   body = renderBody(filePath, content);
    //   return header + SPLIT_FLAG + body;
    // }
  }
  return "";
}
