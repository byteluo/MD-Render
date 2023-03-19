import { ref } from "vue";
import Loading from "@/component/Loading.vue";

export function useLoading() {
  const isLoading = ref(true);
  const setLoading = (b: boolean) => {
    isLoading.value = b;
  };

  return {
    isLoading,
    setLoading,
    Loading,
  };
}
