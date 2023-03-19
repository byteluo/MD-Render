import { useLocalStorage } from '@vueuse/core';

const isDark = useLocalStorage(
    'user-dark-choosed',
    window.matchMedia('(prefers-color-scheme: dark)').matches
);

if (!isDark.value) {
    const bodyDom = document.querySelector('body');
    bodyDom?.classList.toggle('brightness');
}

const toggleTheme = () => {
    isDark.value = !isDark.value;
    const bodyDom = document.querySelector('body');
    bodyDom?.classList.toggle('brightness');
};

export function useTheme() {
    return {
        isDark,
        toggleTheme,
    };
}
