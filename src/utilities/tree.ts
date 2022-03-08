interface TreeNode<T> {
  value: T;
  level: number;
  children:Array< TreeNode<T>> | null;
}

const createNode = <T>(value: T, level:number): TreeNode<T> => {
  return {
    value,
    level,
    children: null,
  };
};

export class Tree<T> {
  // 树的根
  private root : TreeNode<T> | null = null;

  // 判断value相等的函数
  private isEqual =(source:T, target:T):boolean => source === target

  // 判断是否传入的value是否具有父子关系,默认返回false
  private isFather = (father:T, son:T):boolean => father === son

  constructor(isEqual: (f1, f2)=>boolean, isFather:(f1, f2)=>boolean) {
    this.isEqual = isEqual;
    this.isFather = isFather;
  }

  // todo 数组结构转为树形结构
  // 静态方法
  static transArrayToTree(
    targetArray:Array<any>,
    isEqual:(f1, f2)=>boolean,
    isFather:(f1, f2)=>boolean,
    rootKeyValue:any,
  ) {
    if (targetArray.length === 0) return null;
    const tree:Tree<any> = new Tree(isEqual, isFather);

    targetArray.some((item) => {
      if (tree.isEqual(item, rootKeyValue)) {
        // 说明该元素是根
        tree.root = createNode(item, 1);
        return true;
      }
      return false;
    });

    if (tree.root) {
      Tree.buildChildren(tree, tree.root, targetArray);
    }

    return tree;
  }

  static buildChildren(tree: Tree<any>, parentNode: TreeNode<any> | null, targetArray: Array<any>) {
    if (!parentNode) return null;

    if (!targetArray || targetArray.length === 0) {
      return null;
    }

    const newArray = targetArray.filter((item) => {
      if (tree.isFather(parentNode.value, item)) {
        const sonNode = createNode(item, parentNode.level + 1);
        if (parentNode.children) {
          parentNode.children.push(sonNode);
        } else {
          // eslint-disable-next-line no-param-reassign
          parentNode.children = [sonNode];
        }
        // 将该元素过滤掉
        return false;
      }
      return true;
    });

    parentNode.children?.forEach((son) => {
      Tree.buildChildren(tree, son, newArray);
    });
    return null;
  }

  // 计算节点的深度 从上往下第几个 pass
  getNodeDeep(value:T) {
    const node:TreeNode<T>|null = this.getNodeByValue(value);
    return (node && node.level) || 0;
  }

  // 计算节点的高度 从下往上第几个
  getNodeHeight(node: TreeNode<T>):number {
    // 叶子节点的高度为0
    if (node.children?.length === 0) return 0;
    let maxHeight = 0;
    node.children?.forEach((son) => {
      const sonHeight = this.getNodeHeight(son);
      if (sonHeight > maxHeight) maxHeight = sonHeight;
    });
    return maxHeight + 1;
  }

  // 获取树的高度 pass
  getTreeHeight():number|null {
    if (!this.root) return null;
    return this.getNodeHeight(this.root);
  }

  // 获取所有的叶子节点 pass
  getAllLeafValue():Array<T>|null {
    const leafNode: Array<T> = [];
    this.getNodeLeafValue(this.root, leafNode);
    return leafNode;
  }

  // 获取某一个节点的叶子节点 pass
  getNodeLeafValue(node: TreeNode<T> | null, leafNode: Array<T>) {
    if (!node) return;
    if (!node.children || node.children.length === 0) {
      leafNode.push(node.value);
      return;
    }
    node.children.forEach((son) => {
      this.getNodeLeafValue(son, leafNode);
    });
  }

  // 获取特定level的节点数组 pass
  getExactLevelNode(level: number): Array<T> | null {
    if (level < 0) return null;
    const array: Array<T> = [];
    this.getExactLevelNodeFromNode(level, this.root, array);
    return array;
  }

  getExactLevelNodeFromNode(level: number, node: TreeNode<T> | null, array: Array<T>) {
    if (!node) return;
    if (node.level === level) {
      array.push(node.value);
    }
    node.children?.forEach((son) => {
      this.getExactLevelNodeFromNode(level, son, array);
    });
  }

  // 根据value返回Node
  getNodeByValue(value:T):TreeNode<T>|null {
    return this.getNodeFromNode(value, this.root);
  }

  getNodeFromNode(value: T, node: TreeNode<T> | null): TreeNode<T> | null {
    if (!node) return null;
    if (this.isEqual(value, node.value)) {
      return node;
    }
    let result: TreeNode<T> | null = null;
    node.children?.some((son) => {
      result = this.getNodeFromNode(value, son);
      if (result) {
        return true;
      }
      return false;
    });
    return result;
  }

  // 获取某一个值的所有祖先值 pass
  getParentValues(value:T):Array<T>|null {
    if (!this.root) return null;
    if (this.isEqual(value, this.root.value)) return null;
    const resultArray:Array<T> = [];
    this.getParentValuesFromNode(value, resultArray, this.root);
    return resultArray;
  }

  getParentValuesFromNode(value: T, parentArray:Array<T>, node:TreeNode<T>):boolean {
    if (this.isFather(node.value, value)) {
      parentArray.push(node.value);
      return true;
    }
    let flag = false;
    node.children?.some((son) => {
      flag = this.getParentValuesFromNode(value, parentArray, son);
      if (flag) {
        parentArray.push(node.value);
        return true;
      }
      return false;
    });
    return flag;
  }
}
