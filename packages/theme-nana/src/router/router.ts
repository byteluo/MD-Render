import { createRouter, createWebHashHistory } from 'vue-router';
import NotFind from '@/page/404.vue';

const routes = [
    {
        path: '/',
        component: () => import('../page/layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('../page/home/index.vue'),
            },
            { path: '/post', component: () => import('../page/post.vue') },
            {
                path: '/post/page/:page',
                component: () => import('../page/post.vue'),
            },
            {
                path: '/thinking',
                component: () => import('../page/thinking.vue'),
            },
            {
                path: '/about',
                component: () => import('../page/about.vue'),
            },
        ],
    },
    {
        path: '/post/:id',
        component: () => import('@/page/post.detail.vue'),
    },
    {
        path: '/doc/:module',
        component: () => import('../page/doc.vue'),
    },
    {
        path: '/404',
        component: NotFind,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
