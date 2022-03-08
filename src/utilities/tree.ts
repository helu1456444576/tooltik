interface TreeNode<T> {
  value: T;
  level: number;
  children:Array< TreeNode<T>> | null;
}

const createNode = <T>(value: T,level:number): TreeNode<T> => {
  return {
    value,
    level,
    children: null,
  };
};

// const buildChildren = (parentNode: TreeNode<Object>|null, map: Map<any, Array<any>>, key: String):void=>{
//   if(!parentNode) return 
//   let array: Array<any> | undefined= map.get(parentNode.value[key]) 
//   if(array?.length){
//     parentNode.children=[];
//     array.forEach(son=>{
//       if(son){
//         let sonNode:TreeNode<Object>= createNode(son,parentNode.level+1)
//         parentNode.children?.push(sonNode)
//         buildChildren(sonNode,map,key)
//       }
//     })
//   }
//   return 
// }

export class Tree<T>{
    //树的根
    private _root : TreeNode<T> | null = null;

  
    //判断value相等的函数
    private _isEqual :Function =(source:T,target:T):boolean=>{
      return source===target;
    }
    //判断是否传入的value是否具有父子关系,默认返回false
    private _isFather:Function = (father:T,son:T):boolean=>{
      return false;
    }

    constructor(isEqual: Function,isFather:Function) {
      this._isEqual= isEqual;
      this._isFather= isFather;
    }

    get root(){
      return this._root;
    }

    //todo 数组结构转为树形结构
    //静态方法
    static transArrayToTree(targetArray:Array<any>, isEqual:Function,isFather:Function,rootKeyValue:any){
      if(targetArray.length===0) return null;
       const tree:Tree<Object> = new Tree(isEqual,isFather);
      
      targetArray.some(item=>{
        if (tree._isEqual(item,rootKeyValue)){
          //说明该元素是根
          tree._root=createNode(item,0);
          return true
        }
        return false
      })

      if(tree._root){

        tree.buildChildren(tree,tree._root,targetArray)
      }

      return tree;
    }

  buildChildren(tree: Tree<T>, parentNode: TreeNode<T> | null, targetArray: Array<any>){
    if (!parentNode) return null;

    if (!targetArray || targetArray.length === 0) {
      return null;
    }

    let newArray = targetArray.filter(item => {
      if (tree._isFather(parentNode.value,item)){
        let sonNode=createNode(item,parentNode.level+1);
        if(parentNode.children){
          parentNode.children.push(sonNode)
        }else{
          parentNode.children=[sonNode]
        }
        //将该元素过滤掉
        return false;
      }
      return true
    })

    parentNode.children?.forEach(son=>{
      tree.buildChildren(tree,son,newArray);
    })

  }

    //计算节点的深度 从上往下第几个
    getNodeDeep(node:TreeNode<T>){
      return  node.level+1 || null;
    }

    //计算节点的高度 从下往上第几个
    getNodeHeight(node: TreeNode<T>):number{
      //叶子节点的高度为0
      if(node.children?.length===0) return 0;
      let maxHeight=0;
      node.children?.forEach(son=>{
        let sonHeight = this.getNodeHeight(son);
        if(sonHeight>maxHeight) maxHeight= sonHeight
      })
      return maxHeight+1;
    }

    //获取树的高度
    getTreeHeight():number|null{
      if(!this._root) return null
      return this.getNodeHeight(this._root);
    }

    //获取所有的叶子节点
    getAllLeafValue():Array<T>|null{
      return this.getNodeLeafValue(this._root)
    }

    //获取某一个节点的叶子节点
  getNodeLeafValue(node:TreeNode<T>|null): Array<T>|null{
    if(!node) return null;
    if(!node.children||node.children.length===0) return [node.value];
    let leafNode:Array<T>=[];
    node.children.forEach(son=>{
      let sonLeafNodes= this.getNodeLeafValue(son);
      if (sonLeafNodes){
        leafNode.concat();
      }
    })
    return leafNode;
  }

  //获取特定level的节点数组
  getExactLevelNode(level: number): Array<TreeNode<T>> | null{
    if(level<0)return null;
    return this.getExactLevelNodeFromNode(level,this._root)
  }

  getExactLevelNodeFromNode(level: number, node: TreeNode<T> | null): Array<TreeNode<T>> | null{
    if (!node) return null;
    let array: Array<TreeNode<T>>=[];
    if(node.level==level){
      return [node]
    }
    node.children?.forEach(son=>{
      let sonArray= this.getExactLevelNodeFromNode(level,son)
      if (sonArray&&sonArray?.length>0){
        array.concat(sonArray)
      }
    })
    return array;
  }


    //根据value返回Node
    getNodeByValue(value:T):TreeNode<T>|null{
      return this.getNodeFromNode(value,this._root)
    }

  getNodeFromNode(value: T, node: TreeNode<T> | null): TreeNode<T> | null{
      if(!node) return null;
      if(this._isEqual(value,node.value)){
        return node
      }
      let result= null;
      node.children?.some(son=>{
        result = this.getNodeFromNode(value,son);
        if(result){
          return true;
        }
        return false;
      })
      return result
    }
    

    //获取某一个值的所有祖先值
    getParentValues(value:T):Array<T>|null{
      if(!this._root) return null;
      if(this._isEqual(value,this._root)) return null;
      let resultArray:Array<T>= []
      this.getParentValuesFromNode(value,resultArray,this._root)
      return resultArray;
    }

    
  getParentValuesFromNode(value: T,parentArray:Array<T>,node:TreeNode<T>):boolean{
    if(this._isFather(node.value,value)){
      parentArray.push(node.value)
      return true
    }
    let flag= false;
    node.children?.some(son=>{
      flag= this.getParentValuesFromNode(value,parentArray,son)
      if(flag){
        parentArray.push(node.value)
        return true
      }
      return false;

    })
    return flag;
  }



    
}

