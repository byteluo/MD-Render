import { renderMarkdownFile } from "./utils";
import { imageSchedule } from "./utils/image/image.schedule";
import { getMarkdownFiles } from "./utils/io";

async function start() {
  console.time("read");
  const files = await getMarkdownFiles(
    "C:\\Users\\Treecat\\Desktop\\vector\\source"
  );
  console.timeEnd("read");

  console.time("parallelRun");
  const jobs = files.map((el) => el.map(renderMarkdownFile));
  const result = await Promise.all(jobs.flat());
  console.timeEnd("parallelRun");

  console.time("image");
  await imageSchedule.waitForAllTasks();
  console.timeEnd("image");

}

start();
