import { config, initEngineRuntime } from "../runtime";
import { getMarkdownFiles } from "../utils/io";

export async function setup() {
  await initEngineRuntime();

  const markdownFiles = await getMarkdownFiles(config.dataDir);
}
