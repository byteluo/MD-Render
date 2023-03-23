import { Scheduler } from "../utils/schedule";
import fs from "fs/promises";
import path from "path";
import { getRuntime } from "../runtime";
import { PostHookObj, HookObj, IndexHookObj } from "../utils";
import { ensureDirExists } from "../utils/io";
import { BeforeSaveHook } from "./hook";

/**
 *  生成索引文件
 */
function generateIndexFile(hookObjs: PostHookObj[]): Array<HookObj> {
    const map = {} as Record<string, IndexHookObj>;
    hookObjs.forEach((obj) => {
        const dir = path.dirname(obj._private.filePath);
        map[dir] = map[dir] || {
            items: [],
            _private: { filePath: dir },
            type: "IndexHookObj"
        };
        map[dir].items.push({
            mtime: obj.mtime,
            cover: obj.cover,
            id: obj.id,
            title: obj.title
        });
    });
    return [...Object.values(map), ...hookObjs];
}

/**
 * 把内容存下来
 */
function saveObj(hookObjs: HookObj[]) {
    const saveScheduler = new Scheduler();
    hookObjs.forEach((obj) => {
        saveScheduler.addAsyncTask(async () => {
            let savePath = "";
            if (obj.type === "IndexHookObj") {
                savePath = getRuntime().getMarkdownRenderPath(
                    obj._private.filePath,
                    "index"
                );
            } else if (obj.type === "PostHookObj") {
                savePath = getRuntime().getMarkdownRenderPath(
                    obj._private.filePath,
                    obj.id
                );
            }

            const { _private, ...saveObj } = obj;
            await ensureDirExists(path.dirname(savePath));
            await fs.writeFile(savePath, JSON.stringify(saveObj));
        });
    });
    return hookObjs;
}

export const beforeSaveHooks = [
    generateIndexFile,
    saveObj
] as Array<BeforeSaveHook>;
