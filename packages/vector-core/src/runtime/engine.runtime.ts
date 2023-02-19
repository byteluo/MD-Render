import { config, initConfig } from "./config";

export async function initEngineRuntime() {
  await initConfig();
}

// 引擎运行的一些关键性的数据
export async function getRuntime() {
  return {};
}
