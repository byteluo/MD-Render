<template>
    <div class="loading-container">
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<style>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0.6);
}
.loading-container ul {
    margin: 200px 0;
    height: 0px;
    list-style: none;
    padding: 0;
}
.loading-container li {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin-right: 10px;
}
.loading-container li:nth-child(1) {
    background-color: #f62e74;
    animation: love1 1.5s infinite;
}
.loading-container li:nth-child(2) {
    background-color: #f45330;
    animation: love2 1.5s infinite;
    animation-delay: 0.05s;
}
.loading-container li:nth-child(3) {
    background-color: #ffc883;
    animation: love3 1.5s infinite;
    animation-delay: 0.1s;
}
.loading-container li:nth-child(4) {
    background-color: #30d268;
    animation: love4 1.5s infinite;
    animation-delay: 0.15s;
}
.loading-container li:nth-child(5) {
    background-color: #006cb4;
    animation: love5 1.5s infinite;
    animation-delay: 0.2s;
}
.loading-container li:nth-child(6) {
    background-color: #784697;
    animation: love4 1.5s infinite;
    animation-delay: 0.25s;
}
.loading-container li:nth-child(7) {
    background-color: #ffc883;
    animation: love3 1.5s infinite;
    animation-delay: 0.3s;
}
.loading-container li:nth-child(8) {
    background-color: #f45330;
    animation: love2 1.5s infinite;
    animation-delay: 0.35s;
}
.loading-container li:nth-child(9) {
    background-color: #f62e74;
    animation: love1 1.5s infinite;
    animation-delay: 0.4s;
    margin-right: 0px;
}
@keyframes love1 {
    30%,
    50% {
        height: 60px;
        transform: translateY(-30px);
    }
    75%,
    100% {
        height: 20px;
        transform: translateY(0);
    }
}
@keyframes love2 {
    30%,
    50% {
        height: 125px;
        transform: translateY(-62.5px);
    }
    75%,
    100% {
        height: 20px;
        transform: translateY(0);
    }
}
@keyframes love3 {
    30%,
    50% {
        height: 160px;
        transform: translateY(-75px);
    }
    75%,
    100% {
        height: 20px;
        transform: translateY(0);
    }
}
@keyframes love4 {
    30%,
    50% {
        height: 180px;
        transform: translateY(-60px);
    }
    75%,
    100% {
        height: 20px;
        transform: translateY(0);
    }
}
@keyframes love5 {
    30%,
    50% {
        height: 190px;
        transform: translateY(-45px);
    }
    75%,
    100% {
        height: 20px;
        transform: translateY(0);
    }
}
</style>
