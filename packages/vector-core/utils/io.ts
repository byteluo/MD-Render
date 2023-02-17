import { readFile } from "fs/promises";

export interface FileDescriptor {
  filePath: string;
  content: string;
  md5: string;
  ctime: number;
  mtime: number;
  isReady: () => {};
  ready: () => Promise<void>;
}

export async function getMarkdownFileFromCache(filePath: string) {
  return {} as FileDescriptor;
}
