import { getLatestFileCommitInfo } from "./utils/index";

const info = getLatestFileCommitInfo("../../../", "./package.json");

console.log(info);
