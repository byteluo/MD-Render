import {ref} from "vue";

const isMobile = ref(true);


function justifyIsMobile() {
    return document.body.clientWidth < 750
}

isMobile.value = justifyIsMobile();

window.addEventListener("resize", function () {
    isMobile.value = justifyIsMobile();
});

export function useScreen() {
    return {
        isMobile
    }
}
