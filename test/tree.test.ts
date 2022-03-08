import { Tree } from "../src/utilities/tree";
describe("test tree", () => {
  it("create", () => {
    const array = [
      { id: 1, pid: 0 },
      { id: 2, pid: 1 },
      { id: 3, pid: 2 },
    ];
    const isEqual = (obj1, obj2) => obj1.id === obj2.id;

    const isFather = (father, son) => father.id === son.pid;

    const tree = Tree.transArrayToTree(array, isEqual, isFather, { id: 1, pid: 1 });
    // expect(tree?.getTreeHeight()).toBe(2);
    // expect(tree?.getAllLeafValue()?.length).toBe(2);

    // expect(tree?.getNodeDeep({ id: 2, pid: 0 })).toBe(2);
    // expect(tree?.getExactLevelNode(1)?.length).toBe(1);
    expect(tree?.getParentValues({ id: 2, pid: 0 })?.length).toBe(0);
  });
});
