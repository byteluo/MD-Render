import { forEach } from "lodash";
import { executeHooks } from "./hook";
import { renderMarkdownFile } from "./utils";
import { imageSchedule } from "./utils/image/image.schedule";
import { getMarkdownFiles } from "./utils/io";

async function start() {
  console.time("read");
  const markdownFiles = await getMarkdownFiles(
    "C:\\Users\\Treecat\\Desktop\\vector\\source"
  );
  console.timeEnd("read");

  console.time("parallelRun");
  const jobs = markdownFiles.map(renderMarkdownFile);
  const hookObj = await Promise.all(jobs);
  console.timeEnd("parallelRun");

  console.time("image");
  await imageSchedule.waitForAllTasks();
  console.timeEnd("image");

  executeHooks(hookObj);
}

start();
