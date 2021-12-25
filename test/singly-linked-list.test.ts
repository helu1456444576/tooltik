import { createSinglyLinkedList } from '../src/data-structure/singly-linked-list';

describe('singly-linked-list', () => {
  const singlyLinkedList = createSinglyLinkedList()

  it('addFirst', () => {
    singlyLinkedList.clear()
    singlyLinkedList.addFirst("1")
    singlyLinkedList.addFirst("2")
    expect(singlyLinkedList.size()).toBe(2)
    expect(singlyLinkedList.head()?.value).toBe("2")
  });


  it('addLast', () => {
    singlyLinkedList.clear()
    singlyLinkedList.addLast("1")
    singlyLinkedList.addLast("2")

    expect(singlyLinkedList.size()).toBe(2)
    expect(singlyLinkedList.head()?.value).toBe("1")
  })

  it('removeFirst', () => {
    singlyLinkedList.clear()
    singlyLinkedList.addLast("1")
    singlyLinkedList.addLast("2")
    let first = singlyLinkedList.removeFirst()

    expect(singlyLinkedList.size()).toBe(1)
    expect(first?.value).toBe("1")
    expect(singlyLinkedList.head()?.value).toBe("2")

    first = singlyLinkedList.removeFirst()
    expect(first?.value).toBe("2")
    expect(singlyLinkedList.head()).toBe(null)
  })

  it('removeLast', () => {
    singlyLinkedList.clear()
    singlyLinkedList.addLast("1")
    singlyLinkedList.addLast("2")
    let last = singlyLinkedList.removeLast()

    expect(singlyLinkedList.size()).toBe(1)
    expect(last?.value).toBe('2')
    expect(singlyLinkedList.head()?.value).toBe("1")

    last = singlyLinkedList.removeLast()
    expect(last?.value).toBe('1')
    expect(singlyLinkedList.head()).toBe(null)
  })

  it('remove', () => {
    singlyLinkedList.clear()
    singlyLinkedList.addLast("1")
    singlyLinkedList.addLast("2")
    let index = singlyLinkedList.remove('2')

    expect(singlyLinkedList.size()).toBe(1)
    expect(index).toBe(1)
    expect(singlyLinkedList.head()?.value).toBe("1")

    index = singlyLinkedList.remove('2')
    expect(index).toBe(-1)

    index = singlyLinkedList.remove('1')
    expect(index).toBe(0)
    expect(singlyLinkedList.head()).toBe(null)
  })

  it('indexOf', () => {
    singlyLinkedList.clear()
    singlyLinkedList.addLast("1")
    singlyLinkedList.addLast("2")
    singlyLinkedList.addLast("3")

    expect(singlyLinkedList.indexOf("1")).toBe(0)
    expect(singlyLinkedList.indexOf("2")).toBe(1)
    expect(singlyLinkedList.indexOf("3")).toBe(2)
    expect(singlyLinkedList.indexOf("4")).toBe(-1)
  })
  it('at', () => {
    singlyLinkedList.clear()
    singlyLinkedList.addLast("1")
    singlyLinkedList.addLast("2")
    singlyLinkedList.addLast("3")

    expect(singlyLinkedList.at(0)?.value).toBe("1")
    expect(singlyLinkedList.at(1)?.value).toBe("2")
    expect(singlyLinkedList.at(2)?.value).toBe("3")
    expect(singlyLinkedList.at(3)).toBe(null)
  })
  it('toArray', () => {
    singlyLinkedList.clear()
    singlyLinkedList.addLast("1")
    singlyLinkedList.addLast("2")
    singlyLinkedList.addLast("3")

    expect(singlyLinkedList.toArray()).toEqual(["1", "2", "3"])
  })
});
