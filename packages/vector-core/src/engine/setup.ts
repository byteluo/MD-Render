import { executeHooks } from "../hook";
import { config, initEngineRuntime } from "../runtime";
import { renderMarkdownFile } from "../utils";
import { getMarkdownFiles } from "../utils/io";

export async function setup() {
  await initEngineRuntime();
  const markdownFiles = await getMarkdownFiles(config.dataDir);
  const jobs = markdownFiles.map(renderMarkdownFile);
  const hookObj = await Promise.all(jobs);
  executeHooks(hookObj);
}
