<template>
    <Navigation :title="docData.title" />

    <Loading :loading="isLoading">
        <div class="doc card" v-html="docData.content"></div>
    </Loading>
</template>

<script lang="ts" setup>
import { useLoading } from '@/hooks';
import { getModuleData } from '@/store';
import Navigation from '@/component/Navigation.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const { isLoading, setLoading, Loading } = useLoading();

const { params } = useRoute();
const module = params.module as string;
const docData = ref({} as any);
getModuleData(module).then((doc) => {
    docData.value = doc;
    setLoading(false);
});
</script>

<style lang="less" scoped>
.doc {
    margin: 96px auto;
    max-width: 960px;
    padding: 16px 32px;
    background: red;

    @media screen and (max-width: @size-mobile) {
        margin: 56px auto;
        padding: 8px 16px;
    }
}
</style>
