<template>
    <Loading class="waiting"></Loading>
</template>

<script setup>
import Loading from './part/_Loading.vue';
</script>

<style>
.waiting {
    position: fixed;
    top: 96px;
    left: 0;
    right: 0;
    transform: scale(0.3);
    margin: auto;
    width: 400px;
    z-index: 9999;
}
</style>
