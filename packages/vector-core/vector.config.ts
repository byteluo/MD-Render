import path from "path";
import fs from "fs";
import os from "os";

const config = {
  tmpDir: os.tmpdir(),
  sourceDir: path.resolve("source"),
  distDir: path.resolve("api"),
  restfulRoot: "/api",
  postUrl: "/#/post/:id",
  encryptKey: "123456",
  imageDirPath: path.resolve("api/__web_images__"),
  imageReplacer: (el) => {
    function getImagePrefix() {
      if (process.env.mode === "dev") {
        return "http://127.0.0.1:4000/images/";
      } else {
        return "http://treecat.cn/api/images/";
      }
    }
    return getImagePrefix() + el + "?imageMogr2/format/webp";
  },
  listFileName: "list.json",
  listMapFileName: "list.map.json",
  errorImage: "http://treecat.cn/api/images/error.jpg?imageMogr2/format/webp",
  sourceRepoes: "git@gitee.com:bytesci/treecat-doc.git",
  theme: {
    path: path.resolve("theme/nana"),
    productPath: path.resolve("theme/nana/dist"),
    script: {
      dev: "yarn dev",
      build: "yarn build",
    },
  },
  cos: {
    secretConfig: { SecretId: "", SecretKey: "" },
    Bucket: "treecat-cn-1252406184",
    Region: "ap-guangzhou",
  },
};

try {
  const secretConfigFile = fs.readFileSync("./secret.json").toString();
  Object.assign(config.cos.secretConfig, JSON.parse(secretConfigFile));
} catch (err) {}

export default config;
