import axios from "axios";
import path from "path";
import fs from "fs";
import { imageSchedule } from "./image.schedule";
import { ensureDirExists } from "../io";
import { getRuntime } from "../../runtime";
import { getStringMD5 } from "../common";

function getImageSavePath(url: string) {
  const extName = path.extname(url);
  const md5 = getStringMD5(url);
  return getRuntime().getImageVectorPath(md5 + extName);
}

function getImageRenderUrl(url: string) {
  const extName = path.extname(url);
  const md5 = getStringMD5(url);
  return getRuntime().getImageRenderUrl(md5 + extName);
}

export function urlImageHandler(url: string) {
  const destinationPath = getImageSavePath(url);
  imageSchedule.addAsyncTask(async () => {
    const response = await axios({
      method: "get",
      url,
      responseType: "stream",
    });
    const stream = fs.createWriteStream(destinationPath);
    response.data.pipe(stream);
  });

  return getImageRenderUrl(url);
}

export function localImageHandler(imagePath: string) {
  const destinationPath = getImageSavePath(imagePath);
  imageSchedule.addAsyncTask(async () => {
    await ensureDirExists(path.dirname(destinationPath));
    await fs.promises.copyFile(imagePath, destinationPath);
  });
  return getImageRenderUrl(imagePath);
}
