<template>
    <div class="navbar">
        <div class="navbar-content">
            <a class="back" href="javascript:void(0);" @click="goBack">
                <icon class="back-icon" icon="angle-left" />
            </a>
            <p class="title animated fadeIn" v-if="title">
                {{ title }}
            </p>
            <p class="title" v-else></p>
            <slot name="right"
                ><ul class="menu">
                    <li class="menu-item"><Chat></Chat></li>
                    <li class="menu-item">
                        <ThemeController></ThemeController>
                    </li></ul
            ></slot>
        </div>
    </div>
</template>
<script setup>
import ThemeController from './ThemeController.vue';
import Chat from './Chat.vue';
const router = useRouter();
const { title } = defineProps(['title']);
function goBack() {
    router.go(-1);
}
</script>
<style lang="less" scoped>
.navbar {
    z-index: 999999;
    height: 40px;
    background: @color-card-background;
    display: flex;
    padding: 0 8px;
    position: fixed;
    top: 0;
    color: @color-normal-text;
    left: 0;
    width: 100%;
    align-items: center;
    flex-direction: column;
    box-shadow: @shadow-1;

    @media screen and (max-width: @size-mobile) {
        height: 40px;
    }

    p {
        margin: 0;
    }
}

.navbar-content {
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    box-sizing: border-box;
    align-items: center;
    max-width: 1300px;
    padding: 0 16px;
}

.back {
    padding: 4px 4px 4px 8px;
    border-radius: 6px;
    &:hover {
        background: @color-card-background-secondary;
    }
}

.back-icon {
    margin-right: 8px;
    font-size: 14px;
}

a {
    font-size: 16px;
}

.title {
    flex-grow: 1;
    text-align: center;
    padding-right: 50px;
    margin: 4px 0 0;
    font-weight: bold;
}

.menu {
    font-weight: bold;
    display: flex;
    align-items: center;
    color: @color-normal-text;

    .menu-item {
        margin: 0 16px;
    }
}
</style>
