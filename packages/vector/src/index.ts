import { config } from "./runtime";
import path from "path";

async function importData(key: string) {
  return import(path.resolve(config.tmpDir, key));
}

export async function getAboutInfo(lang) {
  if (lang === "cn") {
    return importData("about.json");
  } else {
    return importData("about.en.json");
  }
}

export async function getPostList() {
  return [];
  // return (await importData("post/list.json")).items;
}

async function getPostDetail(id: string) {
  return importData("post/" + id + ".json");
}
