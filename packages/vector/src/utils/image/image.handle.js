"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localImageHandler = exports.urlImageHandler = void 0;
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const image_schedule_1 = require("./image.schedule");
const io_1 = require("../io");
const runtime_1 = require("../../runtime");
const common_1 = require("../common");
function getImageSavePath(url) {
    const extName = path_1.default.extname(url);
    const md5 = (0, common_1.getStringMD5)(url);
    return (0, runtime_1.getRuntime)().getImageVectorPath(md5 + extName);
}
function getImageRenderUrl(url) {
    const extName = path_1.default.extname(url);
    const md5 = (0, common_1.getStringMD5)(url);
    return (0, runtime_1.getRuntime)().getImageRenderUrl(md5 + extName);
}
function urlImageHandler(url) {
    const destinationPath = getImageSavePath(url);
    image_schedule_1.imageSchedule.addAsyncTask(() => __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.default)({
            method: "get",
            url,
            responseType: "stream",
        });
        const stream = fs_1.default.createWriteStream(destinationPath);
        response.data.pipe(stream);
    }));
    return getImageRenderUrl(url);
}
exports.urlImageHandler = urlImageHandler;
function localImageHandler(imagePath) {
    const destinationPath = getImageSavePath(imagePath);
    image_schedule_1.imageSchedule.addAsyncTask(() => __awaiter(this, void 0, void 0, function* () {
        yield (0, io_1.ensureDirExists)(path_1.default.dirname(destinationPath));
        yield fs_1.default.promises.copyFile(imagePath, destinationPath);
    }));
    return getImageRenderUrl(imagePath);
}
exports.localImageHandler = localImageHandler;
//# sourceMappingURL=image.handle.js.map