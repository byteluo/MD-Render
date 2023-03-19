"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownImageRender = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const image_handle_1 = require("./image.handle");
const common_1 = require("../common");
const path_1 = __importDefault(require("path"));
function processObject(filePath, obj) {
    for (const key in obj) {
        let objValue = obj[key];
        if (typeof objValue === "string") {
            if (!(0, common_1.isImageURI)(objValue))
                continue;
            if (!(0, common_1.isHttpURI)(objValue)) {
                objValue = path_1.default.resolve(path_1.default.dirname(filePath), objValue);
            }
            const handler = (0, common_1.isHttpURI)(objValue) ? image_handle_1.urlImageHandler : image_handle_1.localImageHandler;
            obj[key] = handler(objValue);
        }
        else if (typeof obj[key] === "object") {
            processObject(filePath, obj[key]);
        }
    }
}
exports.markdownImageRender = {
    renderHeader(filePath, content) {
        const doc = js_yaml_1.default.load(content);
        processObject(filePath, doc);
        return js_yaml_1.default.dump(doc);
    },
    renderBody(filePath, content) {
        return content;
    },
};
//# sourceMappingURL=image.render.js.map