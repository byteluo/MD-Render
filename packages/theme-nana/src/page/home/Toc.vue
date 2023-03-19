<template>
    <div class="sentence-toc">
        <div class="toc-list">
            <div v-for="toc in categories" class="toc-item">
                <div class="toc-cover-wrapper rounded" :onclick="toc.handler">
                    <LazyImage class="toc-cover rounded animated rollIn"
                        :src="toc.absoluteImg ? toc.absoluteImg : '' + toc.img">
                    </LazyImage>
                </div>
                <p class="toc-description">{{ toc.description }}</p>
                <p class="toc-title">{{ toc.title }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import LazyImage from '@/component/LazyImage.vue';
const router = useRouter();

const categories = [
    {
        img: '1.jpg',
        description: 'Foundation',
        title: '前端学习',
        handler: () => {
            router.push('/doc/foundation');
        },
    },
    {
        img: 't01662406687cf7219b.jpg',
        description: 'Excellent',
        title: '屠龙勇士',
        handler: () => {
            router.push('/doc/experience');
        },
    },
    {
        img: '3.jpg',
        description: 'Summarize',
        title: '年度小结',
        handler: () => {
            router.push('/doc/summarize');
        },
    },
    {
        img: '2.jpg',
        description: 'Daily Life',
        title: '柴米油盐',
        handler: () => {
            router.push('/doc/life');
        },
    },
    {
        img: '5.jpg',
        description: 'The Box',
        title: '小木盒子',
        handler: () => {
            // router.push('/login');
        },
    },
    {
        img: '6.jpg',
        description: 'Book',
        title: '我的书单',
        handler: () => {
            router.push('/doc/book');
        },
    },
].map((el) => {
    if (el.img && !el.img.startsWith('http')) {
        el.img =
            'https://static-1252406184.cos.ap-guangzhou.myqcloud.com/cover_w800/' +
            el.img;
    }

    return el;
});
</script>

<style scoped lang="less">
.sentence-toc {
    .toc-list {
        display: grid;
        grid-template-columns: 33.3% 33.3% 33.3%;
    }

    @media screen and (max-width: @size-mobile) {
        .toc-list {
            grid-template-columns: 50% 50% !important;
        }

        .toc-item {
            margin: 4px 8px !important;
        }
    }

    .toc-item {
        display: flex;
        margin: 16px;
        flex-direction: column;
        align-items: center;
    }
}

.toc-description {
    margin: 16px 0 0;
    color: @color-normal-text;
}

.toc-title {
    font-size: 13px;
    margin: 4px 0 32px;
    color: @color-normal-text;
}

.toc-cover-wrapper {
    width: 100%;
    position: relative;
    height: 0;
    margin-top: 6px;
    background: @color-card-background;
    border-radius: 8px;
    overflow: hidden;
    padding-bottom: 70%;

    &:hover {
        box-shadow: rgb(0 0 0 / 30%) 0px 1.5px 3px,
            rgb(0 0 0 / 40%) 0px 1.5px 3px;
    }

    img {
        border-radius: 8px;
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transition: 0.25s all cubic-bezier(0.165, 0.84, 0.44, 1);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            top: -10%;
            left: -10%;
            width: 120%;
            height: 120%;
        }
    }
}
</style>
