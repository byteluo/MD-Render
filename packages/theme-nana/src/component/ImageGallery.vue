<template>
    <teleport to="body">
        <div class="image-gallery animated fadeIn">
            <div class="navbar">
                <div>{{props.title}}</div>
                <icon icon="close" class="icon close-icon" @click="emit('dismiss')"></icon>
            </div>
            <div class="image-container">
                <img :src="props.list[props.cur]" />
            </div>
            <div class="image-control">
                <icon icon="angle-left" class="icon left-icon" @click="left"></icon>
                <div>{{(props.cur + 1) + " / " + (props.list.length)}} </div>
                <icon icon="angle-right" class="icon right-icon" @click="right"></icon>
            </div>
        </div>
    </teleport>
</template>

<script setup>



const props = defineProps({ show: String, cur: String, list: Array, title: String })


const emit = defineEmits(["dismiss", "setCur"]);

const left = () => {
    let cur = props.cur - 1;
    if (cur < 0) {
        cur = props.list.length - 1;
    }
    emit("setCur", cur);
}

const right = () => {
    let cur = props.cur + 1;
    if (cur > props.list.length - 1) {
        cur = 0;
    }
    emit("setCur", cur);
}

</script>

<style lang="less" scoped>
.navbar {
    display: flex;
    position: fixed;
    height: 56px;
    width: 100%;
    padding: 0 8px;
    color: white;

    .close-icon {
        font-size: 24px;
    }
}

.image-gallery {
    top: 0;
    left: 0;
    z-index: 9999;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
}

.image-container {
    img {
        max-width: 80%;
        max-height: 80%;
        left: 0;
        right: 0;
        position: absolute;
        margin: 120px auto;
        user-select: none;
    }
}



.icon {
    color: white;
    font-size: 32px;
    cursor: pointer;
    margin: 8px;
}

.image-control {
    position: fixed;
    bottom: 16px;
    margin: auto;
    left: 0;
    right: 0;
    width: 100%;
    justify-content: center;
    display: flex;
    margin: auto;
    align-items: center;

    div {
        font-size: 17px;
        color: white;
        margin: 16px;
        user-select: none;
    }

    .icon {
        font-size: 17px;
    }
}
</style>