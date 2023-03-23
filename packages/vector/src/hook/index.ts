import { PostHookObj } from "../utils";
export { registInitHook, registBeforeSaveHook } from "./hook";
import { hooks } from "./hook";
import { initHooks } from "./init.hook";
import { beforeSaveHooks } from "./before.save.hook";

export async function executeHooks(data: PostHookObj[]) {
    const bundleHooks = [
        ...hooks.init,
        ...initHooks,
        ...hooks.beforeSave,
        ...beforeSaveHooks
    ];
    for (let i = 0; i < bundleHooks.length; i++) {
        const hook = bundleHooks[i];
        const res = hook(data);
        if (res instanceof Promise) {
            data = (await res) as any;
        } else {
            data = res as any;
        }
    }
}
