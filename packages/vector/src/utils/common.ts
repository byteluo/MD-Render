import { createHash } from "crypto";
import memoize from "lodash/memoize";

/**
 * 获取字符串的 md5 值。
 */
export const getStringMD5 = (function () {
  function getMD5Hash(input: string) {
    const hash = createHash("md5");
    hash.update(input);
    return hash.digest("hex");
  }
  return memoize(getMD5Hash);
})();

/**
 * 判断 URI 是否为图片。
 */
export function isImageURI(str: string): boolean {
  return !!str.match(/\.(jpeg|jpg|png|gif)$/i);
}

/**
 * 判断 URI 是否为网络路径。
 */
export function isHttpURI(str: string): boolean {
  return !!str.match(/^https?:\/\//i);
}
