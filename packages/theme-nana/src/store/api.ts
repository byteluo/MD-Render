import axios, { AxiosResponse } from "axios";
import {
  devApiUrl,
  devBackendUrl,
  productionApiUrl,
  productionBackendUrl,
} from "@/config";
import { isDevMode } from "@/service/dev";

let api = axios.create({
  headers: {
    // 'content-type': 'application/x-www-form-urlencoded'
  },
}) as any;

api.interceptors.request.use(
  (config: any) => {
    // const {currentUser} = useUser();
    // if(currentUser.value) {
    //     config.headers.authorization = currentUser.value.ticket
    // }
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    //拦截响应，做统一处理
    // if (response.data.code !== 200) {
    //     if (response.data.msg) {
    //         Toast.fail(response.data.msg);
    //     }
    //     throw new Error(response.data.msg || "状态码错误");
    // }
    // response = ;
    return response.data;
  },
  //接口错误状态处理，也就是说无响应时的处理
  () => {
    // Toast.fail("网络请求错误");
    throw new Error();
  }
);

// api.sendGetRequest = function <T>(url: string, params?: Object) {
//     return api.get(url, params)
// }

let staticUrl = productionApiUrl;
let backendUrl = productionBackendUrl;
if (isDevMode()) {
  staticUrl = devApiUrl;
  backendUrl = devBackendUrl;
}

export async function sendStaticGetRequest<T>(
  url: string,
  params?: any
): Promise<T> {
  const startTime = new Date().getTime();
  const result = await api.get(url.startsWith("http") ? url : staticUrl + url, {
    params,
  });
  const endTime = new Date().getTime();
  return new Promise((res) => {
    setTimeout(
      () => {
        res(result);
      },
      isDevMode() ? 100 - (endTime - startTime) : 0
    );
  });
}

export function sendPostRequest<T>(
  url: string,
  params?: { [key: string]: string }
): Promise<T> {
  return api.post(url.startsWith("https") ? url : backendUrl + url, params);
}
