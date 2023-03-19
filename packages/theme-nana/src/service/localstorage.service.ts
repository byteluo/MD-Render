import { reactive, toRefs } from 'vue';

export enum LocalStorageKey {
    WebSiteSetting = 'page.website.setting.post.filter',
    Locker = 'cn.treecat.auth.locker.localstorage',
    Cat = 'component.cat.show.cat',
}

export function useLocalStorage<T extends Object>(
    key: LocalStorageKey,
    defaultValue: T
) {
    const save = () => {
        localStorage.setItem(key.toString(), JSON.stringify(data));
    };
    let s = localStorage.getItem(key.toString());
    const data = reactive(defaultValue);
    if (s) {
        Object.assign(data, JSON.parse(s));
    } else {
        save();
    }

    return {
        data,
        save,
    };
}

export function useLocalStoragePlain<T>(key: LocalStorageKey, defaultValue: T) {
    const { data, save } = useLocalStorage(key, { v: defaultValue });
    const { v } = toRefs(data);
    return {
        data: v,
        save: function () {
            data.v = v.value;
            save();
        },
    };
}
