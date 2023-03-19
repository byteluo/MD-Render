<template>
    <div class="knowledge-graph">
        <h2>知识图谱</h2>
        <LazyImage
            src="https://static-1252406184.cos.ap-guangzhou.myqcloud.com/image/know.png"
        />
    </div>
</template>

<script setup>
import LazyImage from '@/component/LazyImage.vue';
</script>

<style lang="less" scoped>
.knowledge-graph {
    img {
        border-radius: 8px;
        width: 100%;
        filter: brightness(0.8);
    }
}
</style>
