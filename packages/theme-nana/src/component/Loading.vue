<template>
    <Loading v-if="loading"></Loading>
    <slot v-else></slot>
</template>

<script setup>
import Loading from './part/_Loading.vue';
const { loading } = defineProps(['loading']);
</script>