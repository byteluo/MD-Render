import { HookObj } from "../utils";
import { hooks } from "./hook";

export function registHook(hook: HookObj) {
  hooks.push(hook);
}

export async function executeHooks(data: HookObj[]) {
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    const res = hook(data);
    if (res instanceof Promise) {
      data = await res;
    } else {
      data = res;
    }
  }
  return data;
}
