import fm from "front-matter";
import MarkdownIt from "markdown-it";
import { getFileReader } from "./file.reader";
import { HookObj } from "./hook";
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
): Promise<HookObj | null> {
  try {
    const fileDescriptor = getFileReader(filePath).getFileDescriptor();
    if (!fileDescriptor.isReady()) {
      await fileDescriptor.ready();
    }

    // renderImage
    fileDescriptor.content = await renderImage(
      filePath,
      fileDescriptor.content,
      "markdown"
    );

    const rawContent = fileDescriptor.content;
    let { attributes, body: markdownBody } = fm(rawContent);

    const [id, title, ctime, mtime] = [
      ["title", ""],
      ["ctime", 0],
      ["mtime", 0],
    ].map(([key, defaultValue]) =>
      getValueFromObjects(
        key as any,
        attributes as any,
        fileDescriptor,
        defaultValue
      )
    );

    return {
      id,
      md5: fileDescriptor.md5,
      ctime,
      title,
      mtime,
      word: markdownBody.length,
      content: md.render(rawContent),
      _private: {
        filePath,
        except: false,
        rawContent,
        markdownBody,
      },
    };
  } catch (error) {
    return null;
  }
}
