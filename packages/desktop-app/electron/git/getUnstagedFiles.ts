const git = require("simple-git/promise");

import treeify from "./treeify";

type GetUnstagedFilesOpts = {
  repo: string;
};

const getAllChanges = async (repo: any) => {
  const { files } = await repo.status();

  return files.map((file: any) => file.path);
};

export default async ({ repo }: GetUnstagedFilesOpts) => {
  const repoRef = await git(repo);
  const files = await getAllChanges(repoRef);

  return treeify(files);
};
