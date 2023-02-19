interface TocItem {
  text: string;
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  target: string;
}

export interface HookObj {
  ctime: number;
  mtime: number;
  toc: Array<any>;
  cover?: string;
  _private: {
    filePath: string;
    except: boolean;
    rawContent: string;
    markdownBody: string;
  };
  title: string;
  id: string;
  md5: string;
  content: string;
  word: number;
}
