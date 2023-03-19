<template>
    <Category></Category>

    <div class="speak-aside">
        <p>
            {{ nextSpeak() }}
        </p>
    </div>

    <PostList></PostList>

    <div class="speak-aside">
        <p>
            {{ nextSpeak() }}
        </p>
    </div>

    <Flag></Flag>

    <Xmind></Xmind>
</template>

<script setup>
import Category from './Toc.vue';
import PostList from './SimplePostList.vue';
import Flag from './Flag.vue';
import Xmind from './Xmind.vue';
import { siteConfig } from '@/config';

const entries = siteConfig.homeAsideSpeaks.entries();
function nextSpeak() {
    const { done, value } = entries.next();
    if (done) {
        return '';
    } else {
        return value[1];
    }
}
</script>

<style scoped lang="less">
.speak-aside {
    letter-spacing: 2.5px;
    font-size: @size-meta-font;
    color: @color-meta-text;
}

:deep(h2) {
    font-size: @size-title-font;
    color: @color-normal-text;
    margin: 64px 0 32px;
}
</style>
