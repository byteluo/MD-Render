export function isDevMode() {
  // @ts-ignore
  return import.meta.env.MODE === "development";
}

export function getBackendPath() {
  if (isDevMode()) {
    return "http://127.0.0.1:8081";
  } else {
    return "https://mongo-demo-eyqyo1-1252406184.ap-shanghai.app.tcloudbase.com/awesome";
  }
}
