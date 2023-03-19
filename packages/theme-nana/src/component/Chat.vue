<template>
    <div class="chat clickable">
        <icon class="icon" icon="message" @click="chat"></icon>
    </div>
    <Waiting v-if="showWaiting"></Waiting>
</template>

<script setup>
import Waiting from '@/component/Waiting.vue';
const showWaiting = ref(false);
function chat() {
    showWaiting.value = true;
    const interval = setInterval(() => {
        if (window.tidioChatApi) {
            showWaiting.value = false;
            tidioChatApi.show();
            tidioChatApi.open();
            clearInterval(interval);
        }
    }, 500);
    setTimeout(() => {
        clearInterval(interval);
        showWaiting.value = false;
    }, 6 * 1000);
}
</script>

<style lang="less" scoped>
.chat {
    padding: 4px 8px;
    position: relative;
    .icon {
        position: relative;
        top: 2px;
    }
    &:hover {
        color: @color-primary;
    }
}
</style>
