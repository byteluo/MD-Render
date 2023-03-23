import { executeHooks } from "../hook";
import { getRuntime, initEngineRuntime } from "../runtime";
import { renderMarkdownFile, getMarkdownFiles } from "../utils";

export async function setup() {
    await initEngineRuntime();
    const config = getRuntime().getConfig();
    const markdownFiles = await getMarkdownFiles(config.dataDir);
    const jobs = markdownFiles.map(renderMarkdownFile);
    const hookObj = await Promise.all(jobs);
    executeHooks(hookObj);
}
