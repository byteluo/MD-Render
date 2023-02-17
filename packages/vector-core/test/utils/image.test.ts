import rewire from "rewire";
const image = rewire("../../utils/image");
const markdownImageRender = image.__get__("markdownImageRender");
// @ponicode
describe("markdownImageRender.renderHeader", () => {
  test("0", async () => {
    const header = await markdownImageRender.renderHeader(undefined, undefined);
  });
});
