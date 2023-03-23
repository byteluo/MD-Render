import fm from "front-matter";
import MarkdownIt from "markdown-it";
import { getFileReader } from "./file.reader";
import { PostHookObj } from "./hook";
import { renderImage } from "./image";

const md = MarkdownIt({ html: true });

function getValueFromObjects(
    key: string,
    obj1: Record<string, any> = {},
    obj2: Record<string, any> = {},
    defaultValue: any
): any {
    if (key in obj1) {
        return obj1[key];
    } else if (key in obj2) {
        return obj2[key];
    } else {
        return defaultValue;
    }
}

export async function renderMarkdownFile(
    filePath: string
): Promise<PostHookObj | null> {
    try {
        const fileDescriptor = getFileReader(filePath).getFileDescriptor();
        if (!fileDescriptor.isReady()) {
            await fileDescriptor.ready();
        }

        fileDescriptor.content = renderImage(
            filePath,
            fileDescriptor.content,
            "markdown"
        );

        const rawContent = fileDescriptor.content;
        let { attributes, body: markdownBody } = fm(rawContent) as any;

        const [id, title, ctime, mtime] = [
            ["id", fileDescriptor.md5],
            ["title", ""],
            ["ctime", 0],
            ["mtime", 0]
        ].map(([key, defaultValue]) =>
            getValueFromObjects(
                key as string,
                attributes,
                fileDescriptor,
                defaultValue
            )
        );

        return {
            type: "PostHookObj",
            id,
            md5: fileDescriptor.md5,
            ctime,
            title,
            cover: attributes.cover,
            toc: [],
            mtime,
            word: markdownBody.length,
            content: md.render(rawContent),
            _private: {
                filePath,
                except: !!attributes.except,
                rawContent,
                rawContentBody: markdownBody
            }
        };
    } catch (error) {
        console.error(`渲染 ${filePath} 失败\n` + error);
        return null;
    }
}
