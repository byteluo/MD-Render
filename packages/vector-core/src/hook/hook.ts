import { HookObj } from "../utils";

type Hook = (
  hookObjs: Array<HookObj>
) => Array<HookObj> | Promise<Array<HookObj>>;

export const hooks: Array<Hook> = [];

function saveHookObj(hookObjs: HookObj[]) {
  return hookObjs;
}

hooks.push(saveHookObj);
