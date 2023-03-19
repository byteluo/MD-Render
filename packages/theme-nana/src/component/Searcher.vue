<template>
    <div class="search-toggler clickable" @click="toggle">
        <icon icon="search"></icon>
    </div>
    <div
        :class="[
            'search-dialog animated',
            showSearchDialog ? 'bounceInDown' : dismiss ? '' : 'bounceOutUp',
        ]"
        v-if="!dismiss"
        ref="dialogRef"
    >
        <div class="search-dialog-header">
            <div class="search-input-wrapper">
                <input
                    ref="inputRef"
                    class="search-input"
                    v-model="searchText"
                    placeholder="博客搜索"
                />
            </div>
        </div>
        <div class="search-dialog-body" v-if="resultItems.length > 0">
            <div class="search-result">
                <ul>
                    <router-link
                        :to="'/post/' + item.id"
                        v-for="item in resultItems"
                    >
                        <li class="search-result-item clickable">
                            <div
                                class="search-result-item-title"
                                v-html="item.title"
                            ></div>
                            <div
                                class="search-result-item-content"
                                v-html="item.content"
                            ></div>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getPostListMap } from '@/store';
import { onClickOutside } from '@vueuse/core';
import { useScreen } from '@/service';
const websitePostList = [];
const resultItems = reactive([]);
const searchText = ref('');
const showSearchDialog = ref(false);
const dialogRef = ref('');
const dismiss = ref(true);
const inputRef = ref();
const { isMobile } = useScreen();

onClickOutside(dialogRef, (event) => {
    showSearchDialog.value = false;
    dismiss.value = false;
});

function toggle() {
    showSearchDialog.value = !showSearchDialog.value;
    dismiss.value = false;
    nextTick(() => {
        inputRef.value.focus();
    });
}

watch(searchText, (v) => {
    search(v);
});

getPostListMap().then((res) => {
    websitePostList.push(...res);
});

const search = (text) => {
    const deleteBlank = (str) => str.replace(/\s/g, '');
    const trimedText = deleteBlank(text);
    let list = JSON.parse(JSON.stringify(websitePostList));
    resultItems.length = 0;
    text = deleteBlank(text);
    list.forEach((el) => {
        el.title = deleteBlank(el.title);
        el.content = deleteBlank(el.content);
    });
    if (trimedText) {
        let targetItems = list
            .filter((el) => el.title.includes(trimedText))
            .map((el) => {
                el.title = el.title.replace(
                    trimedText,
                    `<span class="keyword">${trimedText}</span>`
                );
                el.choosed = true;
                el.content = el.description.substring(0, 200);
                return el;
            });
        resultItems.push(...targetItems);
        list = list.filter((el) => !el.choosed);

        list.forEach((el) => {
            el.content = el.content.replace(/<\/?[^>]+>/g, '');
        });

        targetItems = list
            .filter((el) => el.content.includes(text))
            .map((el) => {
                let startOffset = 50;
                let itemLength = 200;
                if (isMobile.value) {
                    startOffset = 30;
                    itemLength = 80;
                }
                let start = el.content.indexOf(text) - startOffset;
                start = start >= 0 ? start : 0;
                let end = start + itemLength;
                el.content = el.content
                    .slice(start, end)
                    .replace(text, `<span class="keyword">${text}</span>`);
                return el;
            });
        resultItems.push(...targetItems.reverse());
    } else {
        resultItems.length = 0;
    }
};
</script>

<style lang="less" scoped>
.search-toggler {
    &:hover {
        color: @color-primary;
    }
    padding: 6px 8px 4px;
}
.search-dialog {
    z-index: 999;
    left: 0;
    overflow: hidden;
    width: 80vw;
    max-width: 500px;
    right: 0;
    margin: auto;
    box-shadow: @shadow-1;
    position: fixed;
    border-radius: 8px;
    background: @color-card-background;

    .search-dialog-header {
        padding: 16px 24px;
    }
    .search-dialog-body {
        height: 80vw;
        padding: 16px 16px;
        max-height: 500px;
        overflow-y: auto;

        @media screen and (max-width: @size-mobile) {
            padding: 8px;
        }
    }
}

.search-result-item-title,
.search-result-item-content {
    overflow: auto;
    font-size: @size-normal-font;
    :deep(.keyword) {
        color: @color-primary;
    }
}

.search-result-item-title {
    font-size: @size-normal-font;
}

.search-result-item-content {
    margin-top: 8px;
    font-weight: normal;
    @color: @color-meta-text;
}

.search-result-item {
    margin: 0 0 16px;
    padding: 8px 12px;
}

.search-input {
    border: none;
    padding: 4px 8px;
    box-sizing: border-box;
    width: 100%;
    font-size: @size-normal-font;
    border-radius: 6px;
    color: @color-normal-text;
    background-color: @color-card-background-secondary;
}
</style>
