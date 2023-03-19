<template>
    <div class="app-header-wrapper">
        <div class="app-header">
            <div class="brand">
                <router-link to="/">
                    <img src="@image/treecat.png"
                /></router-link>
            </div>
            <ul class="menu">
                <li class="menu-item"><Searcher></Searcher></li>
                <li class="menu-item"><Chat></Chat></li>
                <li class="menu-item"><ThemeController></ThemeController></li>
            </ul>
        </div>
    </div>
    <Cat></Cat>
</template>

<script setup>
import ThemeController from '@/component/ThemeController.vue';

import Chat from '@/component/Chat.vue';
import Searcher from '@/component/Searcher.vue';
import Cat from '@/component/Cat.vue';
</script>

<style lang="less" scoped>
.app-header-wrapper {
    height: 40px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
    background: @color-card-background;
    display: flex;
    flex-direction: column;
    right: 0;
    box-shadow: @shadow-1;

    .app-header {
        margin: auto;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        box-sizing: border-box;
        align-items: center;
        max-width: 1300px;
        padding: 0 16px;
        .brand {
            display: flex;
            align-items: center;

            img {
                height: 35px;
            }
        }

        .menu {
            font-weight: bold;
            display: flex;
            align-items: center;
            color: @color-normal-text;

            .menu-item {
                margin: 0 20px;
                @media screen and (max-width: @size-mobile) {
                    margin: 0 2px;
                }
            }
        }
    }
}
</style>
