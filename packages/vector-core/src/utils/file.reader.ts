import memoize from "lodash/memoize";
import fs from "fs";
import crypto from "crypto";

interface FileDescriptor {
  filePath: string;
  content: string;
  md5: string;
  ctime: number;
  mtime: number;
  isReady: () => boolean;
  ready: () => Promise<void>;
}

class FileReader {
  private fileDescriptor: FileDescriptor;

  constructor(filePath: string) {
    this.fileDescriptor = {
      filePath,
      content: "",
      md5: "",
      ctime: 0,
      mtime: 0,
      isReady: () => false,
      ready: async () => {
        const fileStat = await fs.promises.stat(filePath);
        this.fileDescriptor.ctime = fileStat.ctimeMs;
        this.fileDescriptor.mtime = fileStat.mtimeMs;
        const fileContent = await fs.promises.readFile(filePath, "utf8");
        this.fileDescriptor.content = fileContent;
        const md5sum = crypto.createHash("md5");
        md5sum.update(fileContent);
        this.fileDescriptor.md5 = md5sum.digest("hex");
        this.fileDescriptor.isReady = () => true;
      },
    };
  }

  public getFileDescriptor(): FileDescriptor {
    return this.fileDescriptor;
  }
}

export const getFileReader = memoize(
  (filePath: string) => new FileReader(filePath)
);
