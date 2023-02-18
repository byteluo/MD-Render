import fs from "fs/promises";
import path from "path";

export const ensureDirExists = (function () {
  const dirCache = new Set();
  return async function (filePath: string) {
    if (dirCache.has(filePath)) {
      return;
    }
    try {
      const stat = await fs.stat(filePath);
      if (!stat.isDirectory()) {
        throw new Error(`${filePath} exists but is not a directory`);
      }
    } catch (err) {
      if (err.code === "ENOENT") {
        // 双重校验锁
        if (dirCache.has(filePath)) {
          return;
        }
        await fs.mkdir(filePath, { recursive: true });
        dirCache.add(filePath);
      } else {
        throw err;
      }
    }
  };
})();

export async function getMarkdownFiles(folderPath: string) {
  const result = [];
  async function traverse(folderPath: string) {
    const markdownFiles: string[] = [];
    const files = await fs.readdir(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        if (file.startsWith(".")) {
          continue;
        } else {
          await traverse(filePath);
        }
      } else if (stats.isFile() && path.extname(filePath) === ".md") {
        markdownFiles.push(filePath);
      }
    }
    if (markdownFiles.length > 0) {
      result.push(markdownFiles);
    }
  }
  await traverse(folderPath);
  return result;
}
