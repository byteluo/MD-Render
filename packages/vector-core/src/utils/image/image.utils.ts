import config from "../../../vector.config";
import { getStringMD5 } from "../common";
import path from "path";

export function calculateImageSavePath(url: string) {
  const extName = path.extname(url);
  const md5 = getStringMD5(url);
  return path.resolve(config.imageDirPath, md5 + extName);
}
