<template>
    <Loading :loading="isLoading">
        <div class="page-post">
            <div class="post-list-header">
                <p></p>
                <div class="category-list">
                    <div :class="['category-item', { active: category === null }]" @click="setCategory(null)">
                        all
                    </div>
                    <div :class="['category-item', { active: category === undefined }]" @click="setCategory(undefined)">
                        code
                    </div>
                    <div :class="['category-item', { active: category === 'emo' }]" @click="setCategory('emo')">
                        story
                    </div>
                </div>
            </div>
            <ul class="post-list">
                <li v-for="post in posts" :key="post.id" :class="'post-item card ' + post.state">
                    <div class="post-item-container">
                        <div class="post-item-header">
                            <router-link :to="'/post/' + post.id">
                                <h2>{{ post.title }}</h2>
                            </router-link>
                        </div>
                        <div class="post-item-footer">
                            <div class="post-item-meta" :style="{ color: meta.color }" v-for="meta in getMetas(post)">
                                <icon v-if="meta.icon" :icon="meta.icon"></icon>
                                {{ meta.title }}
                            </div>
                        </div>
                        <LazyImage class="post-item-cover post-item-cover-mobile" v-if="post.cover" :src="post.cover" />
                        <div class="post-item-content">
                            <div class="post-item-description doc">
                                <p v-html="post.description"></p>
                            </div>
                            <div>
                                <router-link :to="'/post/' + post.id" class="post-item-readmore">
                                    继续阅读
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="post-item-cover-wrapper" v-if="post.cover">
                        <router-link :to="'/post/' + post.id">
                            <LazyImage class="post-item-cover" :src="post.cover" />
                        </router-link>
                    </div>
                </li>
            </ul>
            <div class="pager">
                <div :class="[
                    'pager-item page-item-previous',
                    { disabled: curPage === 1 },
                ]" @click="curPage > 1 && previous()">
                    上一页
                </div>
                <div class="pager-indicator">
                    <span>{{ curPage }}</span>
                    /
                    <span>{{ Math.ceil(categoryAllPost.length / pageSize) }}</span>
                </div>
                <div :class="[
                    'pager-item page-item-next',
                    {
                        disabled: curPage * pageSize > categoryAllPost.length,
                    },
                ]" @click="curPage * pageSize < categoryAllPost.length && next()">
                    下一页
                </div>
            </div>
        </div>
    </Loading>
</template>

<script setup>
import { useLoading } from '@/hooks';
import { transformTimeReadable } from '@/service';
import { getPostList } from '@/store';
import { siteConfig } from '@/config';
import LazyImage from '@/component/LazyImage.vue';
import { useStorage } from '@vueuse/core'


const store = useStorage("post-md5", {})

const { isLoading, setLoading, Loading } = useLoading();
const router = useRouter();

const posts = reactive([]);
const allPosts = reactive([]);
let curPage = ref(router.currentRoute.value?.params?.page || 1);
const pageSize = 8;
const category = ref(null);

getPostList().then((res) => {
    const obj = {};
    Object.assign(obj, store.value);
    res.forEach(el => {
        if (obj[el.id]) {
            el.read = true;
            if (obj[el.id] != el.md5) {
                el.read = false;
            }
        }
    })
    store.value = obj

    res.sort((a, b) => {
        if (a.pin && !b.pin) {
            return 1
        } else if (!a.pin && b.pin) {
            return -1
        }
        return b.mtime - a.mtime
    });
    allPosts.push(...res);
    posts.push(
        ...allPosts.slice(
            curPage.value * pageSize - pageSize,
            curPage.value * pageSize
        )
    );
    setLoading(false);
});

const categoryAllPost = computed(() => {
    const c = category.value;
    if (c === null) {
        return allPosts
    }
    return allPosts.filter((el) => el.tag == c)
})



function setCategory(type) {
    category.value = type;

    nextTick(() => {
        if (curPage.value > categoryAllPost.value.length / pageSize + 1) {
            curPage.value = Math.ceil(categoryAllPost.value.length / pageSize);
        }
        posts.length = 0;
        posts.push(
            ...categoryAllPost.value.slice(
                curPage.value * pageSize - pageSize,
                curPage.value * pageSize
            )
        );
    })
}

function next() {
    const page = ++curPage.value;
    posts.length = 0;
    posts.push(...categoryAllPost.value.slice(page * pageSize - pageSize, page * pageSize));
    window.history.pushState('', '', '/#/post/page/' + curPage.value);
    window.scrollTo(0, 0);
}

function previous() {
    const page = --curPage.value;
    posts.length = 0;
    posts.push(...categoryAllPost.value.slice(page * pageSize - pageSize, page * pageSize));
    window.history.pushState('', '', '/#/post/page/' + curPage.value);
    window.scrollTo(0, 0);
}

function getMetas(post) {
    return [
        {
            icon: 'user',
            title: siteConfig.nickname,
        },
        {
            icon: 'edit',
            title: transformTimeReadable(post.mtime),
        },
        {
            icon: 'file-word',
            title: post.word + '字',
        },
        {
            icon: "tag",
            title: post.tag == "emo" ? "story" : "code"
        },
        {
            icon: post.read && "check",
            color: 'var(--color-primary-dark, #ffdd6c)',
            title: post.read && "已读",
        }
    ];
}
</script>

<style scoped lang="less">
.page-post {
    min-height: 500px;
}

.post-item-meta {
    margin-right: 16px;
}

.pager {
    margin: auto;
    display: flex;
    justify-content: center;

    .pager-item {
        display: inline-block;
        cursor: pointer;
        font-weight: bold;
        padding: 8px 16px;
        border-radius: 8px;
        color: @color-primary;
        background: @color-card-background;

        &.disabled {
            color: @color-meta-text;
            cursor: not-allowed;
        }
    }

    .pager-indicator {
        margin: 8px 16px;
        display: flex;
        align-items: center;
    }
}

.post-item {
    padding: @size-card-padding;
    font-size: 16px;
    margin-bottom: 8px;
    display: flex;
    box-shadow: @shadow-1;

    @media (max-width: @size-mobile) {
        padding: @size-card-padding-small;
    }

    .post-item-container {
        flex-grow: 1;
        width: 0;
        display: flex;
        flex-direction: column;

        .post-item-content {
            display: flex;
            flex-grow: 1;
            flex-direction: column;

            .post-item-description {
                line-height: 1.8;
                color: @color-normal-text;
                flex-grow: 1;

                :deep(p + p) {
                    margin-top: 4px !important;
                }
            }

            .post-item-readmore {
                font-size: @size-normal-font;
                display: inline-block;
                padding: 4px 8px;
                position: relative;
                left: -8px;
                border-radius: 6px;
                font-weight: 550;

                &:hover {
                    color: @color-primary-dark;
                    background: @color-card-background-secondary;
                }
            }
        }
    }

    .post-item-cover-wrapper {
        width: 300px;
        height: 180px;
        overflow: hidden;
        border-radius: 8px;
        margin: 8px;
        position: relative;
        border: 2px solid @color-card-background-secondary;

        &:hover {
            border-color: @color-meta-text;
            box-shadow: @shadow-1;
        }

        @media screen and (max-width: @size-mobile) {
            display: none;
        }

        .post-item-cover {
            width: 100%;
            height: 100%;
            position: relative;
            object-fit: cover;
            top: 0;
            left: 0;
            transition: 0.25s all cubic-bezier(0.165, 0.84, 0.44, 1);

            &:hover {
                top: -5%;
                left: -5%;
                width: 110%;
                height: 110%;
            }
        }
    }

    h2 {
        font-size: @size-title-font;
        font-weight: bold;
        color: @color-normal-text;
        margin: 0;
    }
}

.post-item-footer {
    font-size: @size-meta-font;
    display: flex;
    align-items: center;
    margin: 4px 0 8px;
    color: @color-meta-text !important;
}

.post-item-cover-mobile {
    display: none;
    border-radius: 8px;
    height: 200px;
    object-fit: cover;
}

@media screen and (max-width: @size-mobile) {
    .post-item-cover-mobile {
        display: block;
        margin-bottom: 4px;
    }
}

.category-list {
    display: flex;
    width: 100%;
    justify-content: right;

    .category-item {
        cursor: pointer;
        font-size: @size-meta-font;
        padding: 2px 8px;
        color: @color-normal-text;
        margin: 8px 0 8px 8px;
        border-radius: 8px;
        background: @color-card-background-secondary;

        &.active {
            color: @color-primary;
        }
    }
}
</style>
