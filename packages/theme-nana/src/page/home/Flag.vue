<template>
    <div>
        <h2>最近目标</h2>
        <ul class="flag-list">
            <li v-for="flag in flags" class="flag-item">
                {{ flag.text }}
                <span>{{ flag.status }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { siteConfig } from '@/config';

const { flags } = siteConfig;
</script>

<style lang="less" scoped>
.flag-list {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 400px;
}

.flag-item {
    margin-bottom: 8px;
    display: flex;
    border-radius: 8px;
    padding: 8px 16px;
    color: @color-card-background;
    justify-content: space-between;

    &:nth-child(1) {
        background: pink;
    }

    &:nth-child(2) {
        background: #ffcc73;
    }

    &:nth-child(3) {
        background: #f3ff8b;
    }

    &:nth-child(4) {
        background: #91b9ff;
    }

    span {
        margin-left: 32px;
    }
}
</style>
