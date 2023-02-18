import axios from "axios";
import path from "path";
import fs from "fs";
import { calculateImageSavePath } from "./image.utils";

export function urlImageHandler(url: string) {
  const destinationPath = calculateImageSavePath(url);
  // const response = await axios({
  //   method: "get",
  //   url,
  //   responseType: "stream",
  // });
  // const stream = fs.createWriteStream(destinationPath);
  // response.data.pipe(stream);
  return destinationPath;
}

export function localImageHandler(imagePath: string) {
  const destinationPath = calculateImageSavePath(imagePath);
  // new Promise((resolve, reject) => {
  //   fs.copyFile(imagePath, destinationPath, (err) => {
  //     if (err) reject(err);
  //     resolve(imagePath);
  //   });
  // });
  return destinationPath;
}
