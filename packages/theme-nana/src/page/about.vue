<template>
    <Loading :loading="isLoading">
        <div class="page-about">
            <div class="translation">
                <span
                    :class="['tag', { active: lang === 'cn' }]"
                    @click="lang = 'cn'"
                    >{{ lang === 'cn' ? '中' : 'CN' }}</span
                >
                /
                <span
                    @click="lang = 'en'"
                    :class="['tag', { active: lang === 'en' }]"
                    >{{ lang === 'cn' ? '英' : 'EN' }}</span
                >
            </div>
            <div class="doc" v-html="info.content" />
        </div>
    </Loading>
</template>

<script setup>
import { useLoading } from '@/hooks';
import { getAboutInfo } from '@/store';

const { isLoading, setLoading, Loading } = useLoading();

const info = reactive({});
const lang = ref('');

watch(lang, () => {
    setLoading(true);
    getAboutInfo(lang.value).then((res) => {
        Object.assign(info, res);
        setLoading(false);
    });
});

lang.value = 'cn';

function toggleLanguage() {
    if (lang.value === 'cn') {
        lang.value = 'en';
    } else {
        lang.value = 'cn';
    }
}
</script>

<style lang="less">
.page-about {
    padding: 16px;
    position: relative;

    .translation {
        position: absolute;
        right: 8px;

        &:hover {
            cursor: pointer;
        }

        .tag {
            font-size: @size-meta-font;

            &:hover {
                color: @color-primary;
            }
        }

        .active {
            color: @color-primary;
            font-size: @size-title-font;
        }
    }
}

.handwriting-container {
    display: flex;
    width: 100%;
    overflow: auto;

    img {
        margin: 8px;
    }
}
</style>
