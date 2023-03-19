import path from "path";
import fs from "fs/promises";
import { merge } from "lodash";

interface VectorConfig {
  tmpDir: string;
  dataDir: string;
  rootUrl: string;
  imageDirName: string;
  distDir: string;
}

export const config: VectorConfig = { uninitialized: true } as any;

export async function initConfig() {
  if ((config as any).uninitialized) {
    return;
  }
  const rootDir = path.resolve(__dirname, "../../../..");
  const defultTmpDir = path.resolve(__dirname, "../..", "_tmp");
  const distDir = path.resolve(__dirname, "../..", "dist");
  const defualtDataDir = path.resolve(rootDir, "packages/vector-data");
  const rootUrl = "http://127.0.0.1:3000";
  const userConfig = {};
  try {
    const data = await fs.readFile(path.resolve(rootDir, "vector.config.js"));
    const obj = eval(data.toString());
    Object.assign(userConfig, obj);
  } catch (err) {
    console.log("配置失败");
  }
  Object.assign(
    config,
    merge(
      {
        tmpDir: defultTmpDir,
        dataDir: defualtDataDir,
        distDir: distDir,
        rootUrl,
        imageDirName: "__image__",
      } as VectorConfig,
      userConfig
    )
  );
}
