<template>
    <div class="section-chooser-pane">
        <div class="chooser-cover-wrapper">
            <LazyImage
                class="chooser-cover"
                src="https://static-1252406184.cos.ap-guangzhou.myqcloud.com/cover_w800/mobile.webp"
                v-if="isMobile"
            >
            </LazyImage>
        </div>

        <ul class="chooser-pane-list">
            <router-link
                :to="item.to"
                class="chooser-pane-item"
                v-for="item in paneList"
            >
                <img :src="item.image" />
                <p>{{ item.title }}</p>
            </router-link>
        </ul>
    </div>
</template>

<script setup>
import LazyImage from '@/component/LazyImage.vue';
import PreviewImageDark from '@/assets/image/pane_preview.dark.svg';
import BlogImageDark from '@/assets/image/pane_blog.dark.svg';
import ThinkingImageDark from '@/assets/image/pane_thinking.dark.svg';
import AboutImageDark from '@/assets/image/pane_about.dark.svg';
import PreviewImage from '@/assets/image/pane_preview.svg';
import BlogImage from '@/assets/image/pane_blog.svg';
import ThinkingImage from '@/assets/image/pane_thinking.svg';
import AboutImage from '@/assets/image/pane_about.svg';
import { useTheme } from '@/hooks/useTheme';
import { useScreen } from '@/service';

const { isMobile } = useScreen();
const { isDark } = useTheme();
const images = {
    PreviewImageDark,
    BlogImageDark,
    ThinkingImageDark,
    AboutImageDark,
    PreviewImage,
    BlogImage,
    ThinkingImage,
    AboutImage,
};

const paneList = reactive([
    {
        imageKey: 'PreviewImage',
        title: '扉页',
        to: '/home',
    },
    {
        imageKey: 'BlogImage',
        title: '博客',
        to: '/post',
    },
    {
        imageKey: 'ThinkingImage',
        title: '思考',
        to: '/thinking',
    },
    {
        imageKey: 'AboutImage',
        title: '关于',
        to: '/about',
    },
]);

watch(
    isDark,
    (isDark) => {
        console.log('isDark', isDark);
        paneList.forEach((el) => {
            el.image = images[isDark ? el.imageKey + 'Dark' : el.imageKey];
        });
    },
    {
        immediate: true,
    }
);
</script>

<style lang="less" scoped>
.section-chooser-pane {
    position: relative;
    height: 400px;

    @media screen and (max-width: @size-mobile) {
        height: 300px;
    }
}

.chooser-cover-wrapper {
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    border: none;
    background-size: cover;
    filter: brightness(0.6);
    background-color: @color-card-background-secondary;
    background-image: url(https://cdn.jsdelivr.net/gh/xb2016/kratos-pjax@0.4.3/static/images/index_image.png);
    .chooser-cover {
        object-fit: cover;
        width: 100vw;
        height: 100vh;
    }

    @media screen and (max-width: @size-mobile) {
        height: 235px;
        background-color: @color-card-background-secondary;
    }
}

.chooser-pane-list {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 30%;
    width: 300px;
    margin: 64px auto;
    display: flex;

    @media screen and (max-width: @size-mobile) {
        top: 20%;
        width: 250px;
    }

    .chooser-pane-item {
        flex-grow: 1;
        width: 0;
        border-radius: 6px;
        padding: 8px 0;
        background: @color-card-background-secondary;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin: 4px;
        color: @color-normal-text;
        box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 6px,
            rgba(0, 0, 0, 0.16) 0px 3px 6px;

        &.router-link-exact-active,
        &:hover {
            background: @color-card-background;
            color: @color-normal-text;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 6px,
                rgba(0, 0, 0, 0.3) 0px 3px 6px;
            font-weight: bold;
        }

        img {
            width: 30px;
            height: 30px;
            margin: 4px;
        }

        p {
            margin: 0;
            font-family: @font-serif;
        }
    }
}
</style>
