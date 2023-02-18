import { createHash } from "crypto";
import os from "os";
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

export async function parallelRun<T>(
  funcs: Promise<T>[],
  maxConcurrency = os.cpus().length
) {
  const results: T[] = [];
  const errors: any[] = [];
  const running: Promise<void>[] = [];

  for (const func of funcs) {
    running.push(
      (async () => {
        try {
          const result = await func;
          results.push(result);
        } catch (error) {
          errors.push(error);
        }
      })()
    );

    if (running.length >= maxConcurrency) {
      await Promise.race(running);
    }
  }

  await Promise.all(running);

  if (errors.length > 0) {
    throw errors[0];
  }

  return results;
}
