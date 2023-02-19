import { createHash } from "crypto";
import memoize from "lodash/memoize";

export const getStringMD5 = (function () {
  function getMD5Hash(input: string) {
    const hash = createHash("md5");
    hash.update(input);
    return hash.digest("hex");
  }
  return memoize(getMD5Hash);
})();

// 判断是否为图片
export function isImage(str: string) {
  return str.match(/\.(jpeg|jpg|png|gif)$/i);
}

// 判断是否为 URL
export function isURL(str: string) {
  return str.match(/^https?:\/\//i);
}
