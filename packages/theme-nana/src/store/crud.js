import { sendStaticGetRequest } from "@/store/api";
import { isDevMode } from "@/service/dev";
export {
    getAboutInfo,
    getPostList,
    getPostDetail,
    getThinkingData
} from "vector-core";

export function useData(data, fetch) {
    const loaded = ref(false);
    let isDesctoryed = false;
    const invokeQueue = [];
    const stopWatch = watch(
        loaded,
        (v) => {
            if (v) {
                invokeQueue.forEach((cb) => {
                    cb();
                });
                invokeQueue.length = 0;
                stopWatch();
            }
        },
        { immediate: true }
    );
    const getData = async () => {
        const res = await fetch();
        loaded.value = true;
        Object.assign(data, res);
        if (isDevMode()) {
            getData();
        }
    };
    getData();
    const onDataLoaded = (cb) => {
        if (loaded.value) {
            cb();
        } else {
            invokeQueue.push(cb);
        }
    };
    const destory = () => {
        stopWatch();
        isDesctoryed = true;
    };
    return {
        onDataLoaded,
        loaded,
        destory
    };
}

export async function getModuleData(module) {
    return sendStaticGetRequest(`/${module}.json`);
}

export async function getPostListMap() {
    return (await sendStaticGetRequest(`/post/list.map.json`)).map;
}

export function usePostDetail() {}
