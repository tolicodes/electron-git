// @ts-nocheck
// from https://joelgriffith.net/array-reduce-is-pretty-neat/

export default function treeify(files) {
  var fileTree = {};

  if (files instanceof Array === false) {
    throw new Error("Expected an Array of file paths, but saw " + files);
  }

  function mergePathsIntoFileTree(prevDir, currDir, i, filePath) {
    if (i === filePath.length - 1) {
      prevDir[currDir] = filePath[filePath.length - 1];
    }

    if (!prevDir.hasOwnProperty(currDir)) {
      prevDir[currDir] = {};
    }

    return prevDir[currDir];
  }

  function parseFilePath(filePath) {
    var fileLocation = filePath.split("/");

    // If file is in root directory, eg 'index.js'
    if (fileLocation.length === 1) {
      return (fileTree[fileLocation[0]] = null);
    }

    fileLocation.reduce(mergePathsIntoFileTree, fileTree);
  }

  function objToArray(tree) {
    return Object.entries(tree).map(([key, value]) => {
      // 1st level
      if (value === null) {
        return {
          name: key,
        };
      }

      if (typeof value === "string") {
        return {
          name: value,
        };
      }

      return {
        name: key,
        children: objToArray(value),
      };
    }, []);
  }

  function collapseExtraLevels(tree) {
    return tree.map((node) => {
      if (node.children && node.children.length === 1) {
        const onlyChild = node.children[0];
        return {
          name: `${node.name}/${onlyChild.name}`,
          children: onlyChild.children
            ? collapseExtraLevels(onlyChild.children)
            : [onlyChild],
        };
      }
      return node;
    });
  }

  files.forEach(parseFilePath);

  const arr = objToArray(fileTree);

  return collapseExtraLevels(arr);
}
