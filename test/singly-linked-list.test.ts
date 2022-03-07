import { SinglyLinkedList } from "../src/data-structure/SinglyLinkedList";

describe("singly-linked-list", () => {
  it("addFirst", () => {
    const singlyLinkedList = new SinglyLinkedList<string>();
    singlyLinkedList.addFirst("1");
    singlyLinkedList.addFirst("2");
    expect(singlyLinkedList.size).toBe(2);
    expect(singlyLinkedList.front).toBe("2");
  });

  it("removeFirst", () => {
    const singlyLinkedList = new SinglyLinkedList<string>();
    singlyLinkedList.addFirst("1");
    singlyLinkedList.addFirst("2");
    const removedValue = singlyLinkedList.removeFirst();
    expect(singlyLinkedList.size).toBe(1);
    expect(singlyLinkedList.front).toBe("1");
    expect(removedValue).toBe("2");
  });

  it("remove", () => {
    const singlyLinkedList = new SinglyLinkedList<string>();
    singlyLinkedList.addFirst("1");
    singlyLinkedList.addFirst("2");

    const removeIndex1 = singlyLinkedList.remove("1");
    expect(removeIndex1).toBe(1);
    const removeIndex2 = singlyLinkedList.remove("2");
    expect(removeIndex2).toBe(0);
    const removeIndex3 = singlyLinkedList.remove("3");
    expect(removeIndex3).toBe(-1);
  });

  it("findIndex", () => {
    const singlyLinkedList = new SinglyLinkedList<string>();
    singlyLinkedList.addFirst("1");
    singlyLinkedList.addFirst("2");
    singlyLinkedList.addFirst("3");

    expect(singlyLinkedList.findIndex("1")).toBe(2);
    expect(singlyLinkedList.findIndex("2")).toBe(1);
    expect(singlyLinkedList.findIndex("3")).toBe(0);
    expect(singlyLinkedList.findIndex("4")).toBe(-1);
  });

  it("at", () => {
    const singlyLinkedList = new SinglyLinkedList<string>();
    singlyLinkedList.addFirst("1");
    singlyLinkedList.addFirst("2");
    singlyLinkedList.addFirst("3");

    expect(singlyLinkedList.at(0)).toBe("3");
    expect(singlyLinkedList.at(1)).toBe("2");
    expect(singlyLinkedList.at(2)).toBe("1");
    expect(singlyLinkedList.at(3)).toBe(undefined);
  });

  it("find", () => {
    const singlyLinkedList = new SinglyLinkedList<string>();
    singlyLinkedList.addFirst("1");
    singlyLinkedList.addFirst("2");
    singlyLinkedList.addFirst("3");

    expect(singlyLinkedList.find("2")?.value).toBe("2");
  });

  it("toArray", () => {
    const singlyLinkedList = new SinglyLinkedList<string>();

    singlyLinkedList.addFirst("1");
    singlyLinkedList.addFirst("2");
    singlyLinkedList.addFirst("3");

    expect(singlyLinkedList.toArray()).toEqual([
      "3",
      "2",
      "1",
    ]);
  });
});
