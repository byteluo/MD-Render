import { PostHookObj, HookObj } from "../utils";

export type InitHook = (
    hookObjs: Array<PostHookObj>
) => Array<PostHookObj> | Promise<Array<PostHookObj>>;

export type BeforeSaveHook = (
    hookObjs: Array<HookObj>
) => Array<HookObj> | Promise<Array<HookObj>>;

export const hooks = {
    init: [] as Array<InitHook>,
    beforeSave: [] as Array<BeforeSaveHook>
};

export function registInitHook(hook: InitHook) {
    hooks.init.push(hook);
}

export function registBeforeSaveHook(hook: BeforeSaveHook) {
    hooks.beforeSave.push(hook);
}
