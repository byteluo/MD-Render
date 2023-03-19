import rewire from "rewire"
const io = rewire("../../../src/utils/io")
const ensureDirExists = io.__get__("ensureDirExists")
// @ponicode
describe("ensureDirExists", () => {
    test("0", async () => {
        await ensureDirExists("path/to/folder/")
    })

    test("1", async () => {
        await ensureDirExists("./path/to/file")
    })

    test("2", async () => {
        await ensureDirExists("path/to/file.ext")
    })

    test("3", async () => {
        await ensureDirExists("/path/to/file")
    })

    test("4", async () => {
        await ensureDirExists(".")
    })

    test("5", async () => {
        await ensureDirExists("")
    })
})
