<template>
    <div class="update-info-sentence">
        <h2>最近博客</h2>

        <Loading :loading="isLoading">
            <ul class="new-post-list">
                <li
                    v-for="(info, index) in (files || []).slice(0, 7)"
                    class="new-post-item"
                >
                    <div class="post-item-dot"></div>
                    <div class="post-item-container">
                        <div v-animate-onscroll="getAnimateClz(index)">
                            <div class="post-url-wrapper">
                                <router-link :to="'/post/' + info.id">{{
                                    info.title
                                }}</router-link>
                            </div>
                            <p class="update-time">
                                {{ transformTimeReadable(info.mtime) }}
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </Loading>
    </div>
</template>
<script setup>
import { useLoading } from '@/hooks';
import { getPostList } from '@/store';
import { transformTimeReadable } from '@/service';

const { Loading, setLoading, isLoading } = useLoading();

const files = reactive([]);

getPostList().then((res) => {
    res.sort((a, b) => b.mtime - a.mtime);
    files.push(...res);
    setLoading(false);
});

function getAnimateClz(index) {
    return index % 2 === 0 ? 'slideInLeft animated' : 'slideInRight animated';
}
</script>
<style lang="less" scoped>
.update-info-sentence {
    margin-top: 72px;

    .post-item-container {
        display: flex;
        width: 100%;
    }

    .info-content {
        display: flex;
        height: 90px;
        padding-left: 12px;
        padding-top: 12px;
        flex-direction: column;
        justify-content: space-around;
    }

    .new-post-list {
        margin-left: 30px;
    }

    .new-post-item {
        position: relative;
        padding-left: 16px;
        border-left: 3px dashed @color-card-background-secondary;
        display: flex;
        height: 80px;
        align-items: center;
    }
}

.update-time {
    color: @color-meta-text;
    font-size: 13px;
}

.post-item-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    left: -21px;
    top: -6px;
    background: @color-primary;
    position: relative;
}
</style>
