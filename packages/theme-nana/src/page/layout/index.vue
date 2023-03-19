<template>
    <div>
        <Navbar></Navbar>

        <CatHello></CatHello>

        <div class="app-page-container">
            <div :class="['router-view-container card', r]">
                <router-view v-slot="{ Component }">
                    <component :is="Component" />
                </router-view>
                <div class="footer">
                    <p class="copy-right">自豪的使用自研博客引擎 Vector</p>
                    <p class="end-time">主题 Nana 由 Treecat 设计@2023</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import CatHello from './ChooserPane.vue';

const router = useRouter();
const r = ref();
watch(
    () => router.currentRoute.value,
    (newValue) => {
        if (newValue.path.startsWith('/post/page')) {
            r.value = 'post';
        } else {
            r.value = newValue.path.replaceAll('/', '-').replace(/^-/, '');
        }
    },
    { immediate: true }
);
</script>

<style scoped lang="less">
.app-page-container {
    overflow: visible;
    position: relative;
    padding-bottom: 56px;

    @media screen and (max-width: @size-mobile) {
        padding-bottom: 0;
        .router-view-container {
            margin: 0;
            padding: 8px 16px !important;
            min-height: 100vh;
            background: @color-card-background !important;
            &.thinking {
                border-radius: 0;
                background: none !important;
                box-shadow: none !important;
                padding: 0 !important;
            }
        }
    }

    .router-view-container {
        flex-grow: 1;
        z-index: 9;
        max-width: 960px;
        padding: @size-card-padding-big;
        margin: auto;
        background: @color-card-background;
        position: relative;
        overflow: hidden;
        min-height: calc(100vh - 100px);
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
            rgba(0, 0, 0, 0.23) 0px 3px 6px;

        &.post {
            border-radius: 0;
            background: none !important;
            box-shadow: none !important;
            padding: 0 !important;
        }
    }

    .footer {
        margin-top: 96px;

        .copy-right,
        .end-time {
            text-align: center;
            font-size: @size-meta-font;
            margin-bottom: 8px;
            color: @color-meta-text;
        }
    }
}
</style>
