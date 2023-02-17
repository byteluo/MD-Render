import { getLatestFileCommitInfo } from "./git-utils";

describe("getLatestFileCommitInfo", () => {
  it("should return the latest commit info for a file", () => {
    const repoPath = "/path/to/repo";
    const filePath = "file.txt";

    // 执行 Git 命令返回预期的输出
    jest.spyOn(global.console, "error").mockImplementation(() => {});
    jest.spyOn(global.console, "log").mockImplementation(() => {});
    jest.spyOn(global.console, "warn").mockImplementation(() => {});
    jest
      .spyOn(global, "execSync")
      .mockReturnValue(
        Buffer.from(
          '{"commit":"abc123","author":"John Doe","date":"2022-02-17 12:00:00","message":"Add file.txt"}'
        )
      );

    const commitInfo = getLatestFileCommitInfo(repoPath, filePath);

    expect(commitInfo).toEqual({
      commit: "abc123",
      author: "John Doe",
      date: "2022-02-17 12:00:00",
      message: "Add file.txt",
    });
  });

  it("should return null if git command fails", () => {
    const repoPath = "/path/to/repo";
    const filePath = "file.txt";

    // 执行 Git 命令时出现错误
    jest.spyOn(global.console, "error").mockImplementation(() => {});
    jest.spyOn(global.console, "log").mockImplementation(() => {});
    jest.spyOn(global.console, "warn").mockImplementation(() => {});
    jest.spyOn(global, "execSync").mockImplementation(() => {
      throw new Error("Git command failed");
    });

    const commitInfo = getLatestFileCommitInfo(repoPath, filePath);

    expect(commitInfo).toBeNull();
  });

  it("should return null if repo path is not found", () => {
    const repoPath = "/invalid/path/to/repo";
    const filePath = "file.txt";

    // 执行 Git 命令时出现错误
    jest.spyOn(global.console, "error").mockImplementation(() => {});
    jest.spyOn(global.console, "log").mockImplementation(() => {});
    jest.spyOn(global.console, "warn").mockImplementation(() => {});
    jest.spyOn(global, "execSync").mockReturnValue(Buffer.from(""));

    const commitInfo = getLatestFileCommitInfo(repoPath, filePath);

    expect(commitInfo).toBeNull();
  });

  it("should return null if file path is not found", () => {
    const repoPath = "/path/to/repo";
    const filePath = "invalid-file.txt";

    // 执行 Git 命令时出现错误
    jest.spyOn(global.console, "error").mockImplementation(() => {});
    jest.spyOn(global.console, "log").mockImplementation(() => {});
    jest.spyOn(global.console, "warn").mockImplementation(() => {});
    jest.spyOn(global, "execSync").mockReturnValue(Buffer.from(""));

    const commitInfo = getLatestFileCommitInfo(repoPath, filePath);

    expect(commitInfo).toBeNull();
  });
});
