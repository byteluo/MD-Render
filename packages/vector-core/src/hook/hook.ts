import { HookObj } from "../utils";

export type Hook = (
  hookObjs: Array<HookObj>
) => Array<HookObj> | Promise<Array<HookObj>>;

export function registHook(hook: Hook) {
  hooks.push(hook);
}

export const hooks: Array<Hook> = [];
