<template>
    <div class="cat">
        <Cat
            :class="[
                showCat === undefined ? '' : 'animated',
                showCat ? 'fadeInDown' : 'backOutUp',
            ]"
            text="回到顶部"
        ></Cat>
    </div>
</template>

<script setup>
import Cat from '@/component/part/_Cat.vue';
import { useWindowScroll } from '@vueuse/core';
import { useScreen } from '@/service';

const { y: scrollY } = useWindowScroll();
const { isMobile } = useScreen();

const showCat = ref(undefined);
watch(scrollY, (newValue) => {
    showCat.value = newValue > 500;
});
</script>

<style lang="less" scoped>
.cat {
    position: fixed;
    top: 96px;
    right: 312px;
    z-index: 999;
    transform: scale(0.28);
    @media screen and (max-width: @size-mobile) {
        right: 72px;
        top: 72px;
        transform: scale(0.15);
    }
}
</style>
