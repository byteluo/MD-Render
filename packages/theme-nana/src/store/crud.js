import { sendStaticGetRequest } from "@/store/api";
import { isDevMode } from "@/service/dev";
export { getAboutInfo } from "vector-core";

export async function getThinkingData() {
  return sendStaticGetRequest("/thinking.json");
}

export async function getPostList() {
  return (await sendStaticGetRequest("/post/list.json")).items;
}

async function getPostDetail(id) {
  return sendStaticGetRequest("/post/" + id + ".json");
}

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
    destory,
  };
}

export function usePostDetail(id) {
  const post = reactive({});
  const { loaded, onDataLoaded, destory } = useData(post, () =>
    getPostDetail(id)
  );

  return {
    loaded,
    destoryPost: destory,
    onPostLoaded: onDataLoaded,
    post,
  };
}

export async function getModuleData(module) {
  return sendStaticGetRequest(`/${module}.json`);
}

export async function getPostListMap() {
  return (await sendStaticGetRequest(`/post/list.map.json`)).map;
}
