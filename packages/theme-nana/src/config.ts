export const devApiUrl = 'http://127.0.0.1:4000/';
export const productionApiUrl = '/api';
export const devBackendUrl = 'http://127.0.0.1:8080';
export const productionBackendUrl = '';
export const leastLoadInterval = 200;

export const siteConfig = reactive({
    avatar: 'https://static-1252406184.cos.ap-guangzhou.myqcloud.com/awesome/avatar.jpg',
    nickname: 'Treecat',
    phone: 'Collected by BOX Spider',
    postDefaultCover:
        'https://static-1252406184.cos.ap-guangzhou.myqcloud.com/cover_w800/6.jpg',
    homeAsideSpeaks: [
        '山风微微，像月光下晃动的海浪，温和而柔软，停留在时光的背后，变成小时候听过的故事。在遥远的城市，陌生的地方，有他未曾见过的山和海。',
        '云边有个小卖部，货架堆着岁月和夕阳，背后就是山，老人靠着躺椅假装睡着，小孩子偷走了一块糖，泪水几点钟落地，飞鸟要去向何方，人们聚和离，云朵来又往，讲故事的人，总有一个故事不愿讲，时光飞逝，悄悄话变成纸张。',
    ],
    flags: [
        {
            text: '🎈  刷完力扣500题',
            status: '完成175题',
        },
        {
            text: '🚀 做 React 版的主题',
            status: '正在进行',
        },
        {
            text: '🍳 看 React 源码并总结',
            status: '正在进行',
        },
        {
            text: '🕚  习惯：9点睡觉4点起',
            status: '正在养成',
        },
    ],
});
