import { HookObj } from "../utils";
export { registHook } from "./hook";
import { hooks } from "./hook";
import { innerHooks } from "./inner.hook";

export async function executeHooks(data: HookObj[]) {
  hooks.push(...innerHooks);
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
