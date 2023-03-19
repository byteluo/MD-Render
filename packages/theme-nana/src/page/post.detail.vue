<template>
    <Loading :loading="isLoading">
        <Navigation :backUrl="route.meta.backUrl" :title="scrollY > 200 ? post.title : ''" />
        <div class="page-post-detail">
            <div class="post-wrapper card">
                <div class="post-header">
                    <div class="post-cover-wrapper">
                        <img class="post-cover" :src="
                            post.cover
                                ? post.cover
                                : siteConfig.postDefaultCover
                        " />
                    </div>

                    <h1 class="post-title">{{ post.title }}</h1>

                    <ul class="post-meta-list">
                        <li class="post-meta-item" v-for="meta in getMetas(post)">
                            <icon :icon="meta.icon"></icon>
                            {{ meta.title }}
                        </li>
                    </ul>
                </div>

                <div class="doc post-content" v-html="post.content" id="post-content"></div>
            </div>
            <div id="anchor-sidebar-post" v-if="showSidebar" class="sidebar-post anchor-sidebar-post"></div>
        </div>
        <div id="sidebar-post" v-if="showSidebar" class="sidebar-post animated slideInRight">
            <div class="post-toc card">
                <div class="post-toc-header">
                    <p>目录</p>
                </div>
                <hr />
                <div class="post-toc-content">
                    <ul class="toc-list">
                        <li @click="scroll2Target(item.target)" v-for="item in post.toc">
                            <div :id="'toc-' + item.target" :class="getTocClass(item)">
                                {{ item.text }}
                            </div>
                            <ul class="sub-toc">
                                <li @click.stop="scroll2Target(item.target)" v-for="item in item.items">
                                    <div :id="'toc-' + item.target" :class="getTocClass(item)">
                                        {{ item.text }}
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Loading>
</template>

<script setup>
import Navigation from '@/component/Navigation.vue';
import { transformTimeReadable } from '@/service/time';
import { usePostDetail } from '@/store';
import { useLoading } from '@/hooks';
import { siteConfig } from '@/config';
import { useStorage } from '@vueuse/core'
import { useWindowScroll } from '@vueuse/core';
const store = useStorage("post-md5", {})

const { y: scrollY } = useWindowScroll();
const { isLoading, setLoading, Loading } = useLoading();

const route = useRoute();
const postId = route.params.id;

const showSidebar = ref(true);
// const post = reactive({});

const resize = () => {
    const anchor = document.getElementById('anchor-sidebar-post');
    const sidebar = document.getElementById('sidebar-post');
    const { top, left } = anchor.getBoundingClientRect();
    sidebar.style.top = 72 + 'px';
    sidebar.style.left = left + 'px';
};

const activeTitle = ref('');

const { post, onPostLoaded, destoryPost } = usePostDetail(postId);
onPostLoaded(() => {
    setLoading(false);
    const obj = {};
    Object.assign(obj, store.value);
    obj[postId] = post.md5;
    store.value = obj;

    if (post.toc && post.toc.length > 0) {
        activeTitle.value = post.toc[0].target;
    }
    showSidebar.value = !!post.toc.length;
    if (!showSidebar.value) {
        return;
    }
    nextTick(() => {
        window.hljs.highlightAll();
        window.addEventListener('resize', resize);
        const tocDom = {};
        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.boundingClientRect.top < 300) {
                    activeTitle.value = entry.target.id;
                    nextTick(() => {
                        tocDom[activeTitle.value].scrollIntoView();
                    });
                }
                if (entries[0].intersectionRatio <= 0) return;
            },
            {
                rootMargin: '-300px 0px 0px 0px',
            }
        );

        // 开始监听
        post.toc.forEach((el) => {
            const dom = document.getElementById(el.target);
            tocDom[el.target] = document.getElementById('toc-' + el.target);
            intersectionObserver.observe(dom);
            (el.items || []).forEach((el) => {
                const dom = document.getElementById(el.target);
                tocDom[el.target] = document.getElementById('toc-' + el.target);
                intersectionObserver.observe(dom);
            });
        });
        resize();
    });
});

function scroll2Target(target) {
    const dom = document.getElementById(target);
    dom.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -100);
    activeTitle.value = target;
}

function getMetas(post) {
    return [
        {
            icon: 'user',
            title: 'Treecat',
        },
        {
            icon: 'edit',
            title: transformTimeReadable(post.mtime),
        },
        {
            icon: 'file-word',
            title: post.word + '字',
        },
    ];
}

function getTocClass(item) {
    return [
        'toc-item',
        {
            'toc-item-active': item.target === activeTitle.value,
        },
    ];
}

onUnmounted(() => {
    destoryPost();
    window.removeEventListener('resize', resize);
});
</script>

<style lang="less" scoped>
.page-post-detail {
    max-width: @size-max-valid-content;
    margin: 72px auto;
    position: relative;
    display: flex;

    @media screen and (max-width: @size-mobile) {
        padding: 0;
        margin: 48px auto;
    }

    .post-wrapper {
        box-sizing: content-box;
        padding: @size-card-padding-big;
        width: 0px;
        overflow: hidden;
        max-width: calc(@size-max-valid-content - 300px);
        flex-grow: 1;
        margin: auto;

        @media screen and (max-width: @size-mobile) {
            padding: @size-card-padding-small;
        }
    }

    .sidebar-post {
        @media screen and (max-width: @size-mobile) {
            display: none;
        }

        color: @color-normal-text;
        width: 250px;
        margin-left: 16px;
    }
}

#sidebar-post {
    position: fixed;
    width: 250px;

    @media screen and (max-width: @size-mobile) {
        display: none;
    }
}

.post-toc {
    .post-toc-header {
        padding: 0 16px;
        color: @color-meta-text;
    }

    hr {
        border: none;
        border-bottom: 2px solid @color-card-background-secondary;
    }

    .toc-list {
        max-height: 400px;
        overflow: auto;
        padding: 8px 16px;

        .toc-item {
            overflow: hidden;
            height: 50px;
            line-height: 50px;
            vertical-align: middle;
            color: @color-normal-text;

            &:hover {
                cursor: pointer;
                color: @color-primary;
            }
        }

        .sub-toc {
            margin-left: 24px;
        }

        .toc-item-active {
            color: @color-primary;
        }
    }
}

.post-content {
    padding: 32px 8px;
}

.post-header {
    display: flex;
    align-items: center;
    position: relative;
    height: 250px;
    flex-direction: column;
    justify-content: center;

    .post-cover-wrapper {
        filter: brightness(0.4);
        position: absolute;
        left: -32px;
        height: calc(100% + 16px);
        top: -16px;
        width: calc(100% + 64px);
    }

    .post-cover {
        width: 110%;
        height: 100%;
        left: -5%;
        top: -8px;
        position: relative;
        object-fit: cover;
    }

    .post-title {
        font-size: 24px;
        font-weight: bold;
        margin: 32px 8px;
        z-index: 0;
        margin: 32px 0 0;
        color: @color-normal-text;
    }

    .post-meta-list {
        margin: 16px 0;
        z-index: 1;
        display: flex;
        color: @color-meta-text;

        .post-meta-item {
            margin: 8px;
        }
    }
}
</style>
