import fs from "fs/promises";
import path from "path";
import { Worker } from "worker_threads";

export async function ensureDirExists(path) {
  try {
    const stat = await fs.stat(path);
    if (!stat.isDirectory()) {
      throw new Error(`${path} exists but is not a directory`);
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(path, { recursive: true });
    } else {
      throw err;
    }
  }
}

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
