import { getFileReader } from "../utils/file.reader";

describe("getFileReader", () => {
  it("returns the same instance when called with the same file path", () => {
    const filePath = "test/fixtures/file.txt";
    const reader1 = getFileReader(filePath);
    const reader2 = getFileReader(filePath);

    expect(reader1).toBe(reader2);
  });

  it("returns different instances when called with different file paths", () => {
    const filePath1 = "test/fixtures/file1.txt";
    const filePath2 = "test/fixtures/file2.txt";
    const reader1 = getFileReader(filePath1);
    const reader2 = getFileReader(filePath2);

    expect(reader1).not.toBe(reader2);
  });

  it("returns instances with the correct file path", () => {
    const filePath = "test/fixtures/file.txt";
    const reader = getFileReader(filePath);

    expect(reader.getFileDescriptor().filePath).toBe(filePath);
  });

  it("returns instances with the correct content", async () => {
    const filePath = "test/fixtures/file.txt";
    const reader = getFileReader(filePath);

    await reader.getFileDescriptor().ready();

    expect(reader.getFileDescriptor().content).toBe("Hello, world!\n");
  });

  it("returns instances with the correct md5", async () => {
    const filePath = "test/fixtures/file.txt";
    const reader = getFileReader(filePath);

    await reader.getFileDescriptor().ready();

    expect(reader.getFileDescriptor().md5).toBe(
      "6cd3556deb0da54bca060b4c39479839"
    );
  });
});
