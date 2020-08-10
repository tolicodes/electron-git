import treeify from "../treeify";

describe("treeify", () => {
  it("parses a simple tree", () => {
    expect(treeify(["file1", "folder/file2", "folder/folder2/file3"])).toEqual([
      {
        name: "file1",
      },
      {
        name: "folder",
        children: [
          {
            name: "file2",
          },
          {
            name: "folder2",
            children: [
              {
                name: "file3",
              },
            ],
          },
        ],
      },
    ]);
  });
});
