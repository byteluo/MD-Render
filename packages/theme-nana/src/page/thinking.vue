<template>
    <Loading :loading="isLoading">
        <div class="page-thinking">
            <ul class="thinking-list">
                <li
                    class="thinking-item"
                    v-for="thinking in thinkings"
                    :key="thinking.id"
                >
                    <div class="thinking-item-header">
                        <div class="thinking-user-avatar-wrapper">
                            <img
                                class="thinking-user-avatar"
                                :src="thinking.user.avatar"
                            />
                        </div>
                        <div class="thinking-user-info-wrapper">
                            <p class="thinking-user-username">
                                {{ siteConfig.nickname }}
                            </p>
                            <p class="thinking-user-phone">
                                {{ siteConfig.phone }}
                            </p>
                        </div>
                    </div>
                    <div class="thinking-item-content">
                        <p class="content doc" v-html="thinking.content"></p>
                        <div
                            :class="[
                                'thinking-image-wrapper',
                                'thinking-image-wrapper-' +
                                    thinking.images.length,
                            ]"
                            v-if="thinking.images"
                        >
                            <img
                                :src="image"
                                :key="image"
                                v-for="image in thinking.images"
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </Loading>
</template>

<script setup>
import { siteConfig } from '@/config';
import { getThinkingData } from '@/store';
import { useLoading } from '@/hooks';

const { isLoading, setLoading, Loading } = useLoading();

const thinkings = reactive([]);
getThinkingData().then((res) => {
    const its = res.items.map((el) => {
        el.user = siteConfig;
        return el;
    });
    thinkings.push(...its);
    setLoading(false);
});
</script>

<style lang="less" scoped>
.page-thinking {
    padding: 0;
    margin: 0;
    width: 100%;
}

.thinking-user-phone {
    color: @color-meta-text;
    margin-right: 16px;
}

.thinking-image-wrapper img {
    width: 300px;
    height: 300px;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    margin-right: 16px;
    object-fit: cover;
    margin-bottom: 16px;

    @media screen and (max-width: @size-mobile) {
        width: 160px;
        height: 160px;
        margin: 0 8px 8px 0;
    }
}

.thinking-image-wrapper-1 img {
    width: 300px;
    height: 300px;
}

.thinking-image-wrapper-4 img {
    width: 200px;
    height: 200px;

    @media (max-width: @size-mobile) {
        width: 150px;
        height: 150px;
    }
}

.thinking-user-username {
    font-weight: bold;
    margin-bottom: 4px;
    color: @color-meta-text;
    font-size: @size-normal-font;
}

.thinking-user-phone {
    color: @color-meta-text;
    font-size: @size-meta-font;
}

.thinking-item {
    margin-bottom: 32px;
    list-style: none;
    position: relative;
    background: @color-card-background;
    color: @color-normal-text;
    align-items: center;
    cursor: pointer;
    @media (max-width: @size-mobile) {
        background: @color-card-background;
        padding: @size-card-padding-small;
        margin-bottom: 8px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 6px,
            rgba(0, 0, 0, 0.16) 0px 3px 6px;
    }

    .thinking-image-wrapper {
        margin-top: 8px;
    }

    .thinking-item-header {
        display: flex;
        align-items: center;

        .thinking-user-info-wrapper {
            flex-grow: 1;
        }

        .thinking-user-avatar-wrapper {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 8px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .thinking-item-content {
        flex-grow: 1;
        width: 100%;
        margin: 8px 0 0 0;
        font-size: 17px;
    }
}
p {
    margin: 0;
}
</style>
