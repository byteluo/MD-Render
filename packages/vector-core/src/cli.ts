import { renderMarkdownFile } from "./utils";
import { parallelRun } from "./utils/common";
import { imageSchedule } from "./utils/image/image.schedule";
import { getMarkdownFiles } from "./utils/io";
import { Scheduler } from "./utils/schedule";

async function start() {
  console.time("read");
  const files = await getMarkdownFiles(
    "C:\\Users\\Treecat\\Desktop\\vector\\source"
  );
  console.timeEnd("read");

  console.time("parallelRun");
  const jobs = files.flat(Infinity).map(async (file) => {
    return await renderMarkdownFile(file);
  });
  const result = await parallelRun(jobs);
  console.timeEnd("parallelRun");

  console.time("image");
  await imageSchedule.waitForAllTasks();
  console.timeEnd("image");
}

start();
