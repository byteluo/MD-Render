<template>
    <img ref="imgDom" :src="previewUrl" />
</template>

<script setup>
const { src = '' } = defineProps(['src']);
const previewUrl = ref(src);
const imgDom = ref(null);
onMounted(() => {
    if (src.includes('static-1252406184.cos.ap-guangzhou.myqcloud.com')) {
        previewUrl.value =
            src + `?imageMogr2/format/webp/thumbnail/${50}x${50}`;
    }
    setTimeout(() => {
        if (imgDom.value) {
            const width = imgDom.value.width * 1.4;
            const height = imgDom.value.height * 1.4;
            previewUrl.value =
                src +
                `?imageMogr2/format/webp/quality/100/thumbnail/${width}x${height}`;
        }
    }, 800);
});
</script>
