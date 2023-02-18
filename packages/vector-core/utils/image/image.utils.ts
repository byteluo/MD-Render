export function calculateImageSavePath(url: string) {
  const filename = path.basename(url);
  // 如果是网络图片，则使用 url 的 md5 作为文件地址
  const extName = path.extname(url);
  const destinationPath = path.resolve(savePath, getStringMD5(url) + extName);
  return "";
}
