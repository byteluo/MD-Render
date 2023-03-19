<template>
    <div class="theme-control clickable" @click="toggleTheme">
        <icon
            icon="sun"
            :class="[
                'animated theme-control-item',
                !isDark ? 'rotateIn' : 'rotateOut',
            ]"
        ></icon>
        <icon
            icon="moon"
            :class="[
                'animated theme-control-item',
                isDark ? 'rotateIn' : 'rotateOut',
            ]"
        ></icon>
    </div>
</template>

<script setup>
import { useTheme } from '@/hooks/useTheme';
const { isDark, toggleTheme } = useTheme();
</script>

<style lang="less">
.theme-control {
    width: 13px;
    height: 13px;
    padding: 8px 12px 8px 8px;
    cursor: pointer;
    position: relative;
    &:hover {
        color: @color-primary;
    }
    .theme-control-item {
        position: absolute;
    }
}
</style>
