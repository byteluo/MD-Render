import { readFile as fsReadFile } from "fs/promises";
import { memoize } from "lodash";

export interface FileDescriptor {
  filePath: string;
  content: string;
  md5: string;
  ctime: number;
  mtime: number;
  isReady: () => {};
  ready: () => Promise<void>;
}

async function readFileImp(filePath: string) {
  const content = (await fsReadFile(filePath)).toString();
  return {
    content,
  } as FileDescriptor;
}

export const readFile = memoize(readFileImp);
