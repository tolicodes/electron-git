import React, { useState, useEffect } from "react";
import Tree from "rc-tree";
import { v4 as uuid } from "uuid";

import "./treeStyle.css";

const forEachNodeInTree = (tree, mutationFunc) => {
  console.log(tree);
  return tree.map((node) => {
    if (node.children) {
      node.children = forEachNodeInTree(node.children, mutationFunc);
    }

    // if the mutation doesn't return anything then the mutation was internal
    const mutationResult = mutationFunc(node);
    return mutationResult ? mutationResult : node;
  });
};

const prepareData = (tree) => {
  return forEachNodeInTree(tree, (node) => {
    node.toggled = true;
    node.key = uuid();
    node.title = node.name;
    node.checkable = true;
  });
};

export default ({ files }) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData(prepareData(files));
  }, [files]);

  const onCheck = (checkedKeys, a) => {
    console.log(checkedKeys, a);
  };

  return (
    <div>
      <div>Select the files you'd like to commit </div>
      {data && (
        <Tree checkable defaultExpandAll treeData={data} onCheck={onCheck} />
      )}
    </div>
  );
};
