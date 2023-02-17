import fm from "front-matter";
import MarkdownIt from "markdown-it";
import { getMarkdownFileFromCache } from "./io";
import { HookObj } from "./hook";
import { renderImage } from "./image";

const md = MarkdownIt({ html: true });

function getMergeProps(
  key: string,
  obj1: any = {},
  obj2: any = {},
  defaultValue?: any
) {
  // todo
  return {} as any;
}

export async function renderMarkdownFile(filePath: string): Promise<HookObj> {
  const fileDescriptor = await getMarkdownFileFromCache(filePath);
  if (fileDescriptor.isReady()) {
    await fileDescriptor.ready();
  }

  // renderImage
  fileDescriptor.content = await renderImage(
    filePath,
    fileDescriptor.content,
    "markdown"
  );

  const rawContent = fileDescriptor.content;
  let { attributes, body: markdownBody } = fm(rawContent) as any;

  const id = getMergeProps("id", attributes, fileDescriptor.md5);
  const title = getMergeProps("title", attributes, fileDescriptor);
  const ctime = getMergeProps("ctime", attributes, fileDescriptor, 0);
  const mtime = getMergeProps("mtime", attributes, fileDescriptor, 0);

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
}
