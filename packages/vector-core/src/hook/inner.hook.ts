import { HookObj } from "../utils";
import { getStringMD5 } from "../utils/common";

function filterExcept(hookObjs: HookObj[]) {
  return hookObjs.filter((el) => el._private.except);
}

function generatePostToc(hookObjs: HookObj[]) {
  hookObjs
    .filter((item) => item.content)
    .forEach((item) => {
      const reg = /<(h[1-6])>(.*?)<\/\1>/g;
      const content = item.content;
      // 给内容增加 id
      item.content = content.replace(reg, (_, g1, g2) => {
        return `<${g1} id=${getStringMD5(item.title + g2)}>${g2}</${g1}>`;
      });
      // 生成 toc
      const list = Array.from(content.matchAll(new RegExp(reg))).map((el) => {
        return {
          text: el[2],
          type: el[1],
          target: getStringMD5(item.title + el[2]),
        };
      });
      // 把 toc 分组
      const groupList = [];
      list.forEach((item) => {
        if (item.type === "h2") {
          groupList.push(item);
        } else if (groupList.length > 0) {
          const lastItem = groupList[groupList.length - 1];
          lastItem.items = lastItem.items || [];
          lastItem.items.push(item);
        }
      });
      item.toc = groupList;
    });
  return hookObjs;
}

function generateCover(hookObjs: HookObj[]) {
  hookObjs
    .filter((obj) => !obj.cover)
    .forEach((hookObj) => {
      const res = hookObj.content.match(/<img src="(.*?)"(.*?)>/);
      if (res) {
        hookObj.cover = res[1];
      }
    });
  hookObjs.forEach((el) => {
    console.log(el.cover);
  });
  return hookObjs;
}

// 不一定会执行
function saveObj(hookObjs: HookObj[]) {
  return hookObjs;
}

export const innerHooks = [
  filterExcept,
  generateCover,
  generatePostToc,
  saveObj,
];
