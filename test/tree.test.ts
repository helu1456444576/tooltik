import {Tree}from "../src/utilities/tree"
describe("test tree",()=>{
  it("create",()=>{
    const array = [{id:1,pid:1},{id:2,pid:1},{id:3,pid:1}]
    const isEqual=(obj1,obj2)=>{
      return obj1.id==obj2.id
    }

    const isFather=(father,son)=>{
      return father.id==son.pid
    }

    const tree= Tree.transArrayToTree(array,isEqual,isFather,{id:1,pid:1})
    expect(tree.getTreeHeight()).toBe(2);
  })
})