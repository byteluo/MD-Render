export interface HookObj {
  ctime: number;
  mtime: number;
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
