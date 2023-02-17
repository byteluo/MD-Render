const markdownImageRender = {
  renderHeader(filePath: string, content: string) {
    return "";
  },
  renderBody(filePath: string, content: string) {
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
      header = renderHeader(filePath, content);
      body = renderBody(filePath, content);
      return header + splitFlag + body;
    }
  }
  return "";
}
