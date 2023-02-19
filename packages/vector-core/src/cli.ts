import { forEach } from "lodash";
import { executeHooks } from "./hook";
import { renderMarkdownFile } from "./utils";
import { imageSchedule } from "./utils/image/image.schedule";
import { getMarkdownFiles } from "./utils/io";

async function start() {
  console.time("read");
  
  console.timeEnd("read");

  console.time("parallelRun");
  const jobs = markdownFiles.map(renderMarkdownFile);
  const hookObj = await Promise.all(jobs);
  console.timeEnd("parallelRun");

  console.time("image");
  await imageSchedule.waitForAllTasks();
  console.timeEnd("image");

  console.time("hook");
  executeHooks(hookObj);
  console.timeEnd("hook");
}

start();
