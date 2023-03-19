import CryptoJS from 'crypto-js';

export function verifyPassword(key: string) {
    console.log(key);
    return decodeString(key, 'VTJGc2RHVmtYMStKY2J0b1lzT01IN2JPYWFXUW0zaEl2KytCT1JPOC9NWT0=') === 'treecat';
}

export function decodeString(key: string, content: string) {
    const c = CryptoJS.enc.Base64.parse(content + "").toString(CryptoJS.enc.Utf8)
    const decrypted = CryptoJS.AES.decrypt(c, key + "", {
        iv: CryptoJS.enc.Utf8.parse(''),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    try {
        console.log("解锁结果", key, decrypted.toString(CryptoJS.enc.Utf8).toString())
        return decrypted.toString(CryptoJS.enc.Utf8).toString();
    } catch (e) {
        console.log("解锁失败", key, "?")
        return ''

    }
}

