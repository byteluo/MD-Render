import axios from "axios";
import path from "path";
import fs from "fs";
import { calculateImageSavePath } from "./image.utils";
import { imageSchedule } from "./image.schedule";
import { ensureDirExists } from "../io";

export function urlImageHandler(url: string) {
  const destinationPath = calculateImageSavePath(url);
  imageSchedule.addAsyncTask(async () => {
    const response = await axios({
      method: "get",
      url,
      responseType: "stream",
    });
    const stream = fs.createWriteStream(destinationPath);
    response.data.pipe(stream);
  });

  return destinationPath;
}

export function localImageHandler(imagePath: string) {
  const destinationPath = calculateImageSavePath(imagePath);
  imageSchedule.addAsyncTask(async () => {
    await ensureDirExists(path.dirname(destinationPath));
    await fs.promises.copyFile(imagePath, destinationPath);
  });
  return destinationPath;
}
