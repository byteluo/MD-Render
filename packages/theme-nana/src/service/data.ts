import {reactive} from "vue";

export function useRemoteData(fetchFunc: Function) {
    const arr = reactive([] as any[]);
    fetchFunc().then((res: any[]) => {
        arr.push(...res);
    });
    return arr;
}

export function arr2Map(arr: any[], key: string) {
    const m = {} as { [key: string]: any };
    arr.forEach(object => {
        m[object[key]] = object;
    });
    return m;
}

export function run(f: Function) {
    f();
}
