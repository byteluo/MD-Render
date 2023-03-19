export function transformTimeReadable(
    time: number,
    format = 'YYYY-MM-DD'
) {
    const date = new Date(time);
    const config: any = {
        YYYY: date.getFullYear(),
        MM:
            date.getMonth() + 1 < 10
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1,
        DD: date.getDate(),
        HH: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
    };
    for (let key in config) {
        format = format.replace(key, config[key]);
    }
    return format;
}
