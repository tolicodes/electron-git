const REPO_DIR = `/Users/toli/Sites/electron-git`;

import getUnstagedFiles from "../getUnstagedFiles";

describe("@electron-git/desktop-app/electron/git/getUnstagedFiles", () => {
  it("lists unstaged files", async () => {
    console.log(
      JSON.stringify(
        await getUnstagedFiles({
          repo: REPO_DIR,
        }),
        null,
        2
      )
    );
  });
});
