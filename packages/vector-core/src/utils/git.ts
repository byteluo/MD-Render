interface GitInfo {
  time: number;
  author: string;
  commitInfo: string;
}

import { execSync } from "child_process";

/**
 * 获取指定存储库中特定文件的最新提交信息
 * @param repoPath 存储库路径
 * @param filePath 文件路径
 * @returns 包含提交哈希、作者、日期和消息的对象
 */
export function getLatestFileCommitInfo(
  repoPath: string,
  filePath: string
): GitInfo {
  const latestCommit = execSync(
    `cd ${repoPath} && git log --pretty=format:"{time: %ct000, commitInfo: '%s', author: '%cn'}" -- ${filePath}`
  )
    .toString()
    .trim();

  // 将输出转换为 JSON 对象
  const commitInfo = JSON.parse(latestCommit);

  return commitInfo;
}
