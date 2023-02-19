import path from "path";
import fs from "fs/promises";
import os from "os";

interface VectorConfig {
  tmpDir: string;
  dataDir: string;
  rootUrl: string;
  imageDirName: string;
  distDir: string;
}

export const config: VectorConfig = {} as any;

export async function initConfig() {
  const defultTmpDir = path.resolve(__dirname, "../../../tmp");
  const distDir = path.resolve(defultTmpDir, "dist");
  const defualtDataDir = "";
  const rootUrl = "http://127.0.0.1:3000";
  Object.assign(config, {
    tmpDir: defultTmpDir,
    dataDir: defualtDataDir,
    distDir: distDir,
    rootUrl,
    imageDirName: "__image__",
  } as VectorConfig);
}
