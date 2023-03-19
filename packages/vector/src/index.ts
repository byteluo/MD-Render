// import path from "path-browserify";

async function importData(key: string) {
  return import("../dist/" + key);
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
