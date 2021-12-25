interface LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
}

interface SinglyLinkedList<T extends any> {
  size: () => number;
  head: () => LinkedListNode<T> | null;
  clear: () => void;
  addFirst: (value: T) => void;
  addLast: (value: T) => void;
  removeFirst: () => LinkedListNode<T> | null;
  removeLast: () => LinkedListNode<T> | null;
  remove: (value: T) => number;
  indexOf: (value: T) => number;
  at: (index: number) => LinkedListNode<T> | null;
  toArray: () => T[];
}

const createNode = <T>(value: T): LinkedListNode<T> => {
  return {
    value,
    next: null
  }
}

export const createSinglyLinkedList = <T extends any>(): SinglyLinkedList<T> => {
  let HEAD: LinkedListNode<T> | null = null;
  let size = 0;
  return {
    size() {
      return size
    },

    head() {
      return HEAD
    },
    clear() {
      HEAD = null
      size = 0
    },

    addFirst(value) {
      const node = createNode(value)
      node.next = HEAD
      HEAD = node
      size++;
    },

    addLast(value) {
      const node = createNode(value)
      if (!HEAD) {
        HEAD = node
      } else {
        let currentNode = HEAD
        while (currentNode.next) {
          currentNode = currentNode.next
        }
        currentNode.next = node
      }
      size++
    },

    removeFirst() {
      if (size > 0) {
        const prevHead = HEAD
        HEAD = prevHead ? prevHead.next : null
        size--
        return prevHead ? prevHead : null
      }
      return null
    },

    removeLast() {
      if (size === 0) return null
      if (size === 1) {
        const lastNode = HEAD
        HEAD = null
        size--
        return lastNode
      } else {
        let currentNode = HEAD!
        let index = 0

        while (index !== size - 2) {
          index++
          currentNode = currentNode.next!
        }
        const lastNode = currentNode.next
        currentNode.next = null
        size--
        return lastNode
      }
    },

    remove(value) {
      if (size === 0 || !HEAD) return -1
      let currentNode = HEAD
      let deleteIndex = -1
      let index = -1

      if (currentNode.value === value) {
        HEAD = currentNode.next
        deleteIndex = 0
        size--
      } else {
        index = 0
        while (currentNode && currentNode.next) {
          index++
          if (currentNode.next.value === value) {
            deleteIndex = index
            currentNode.next = currentNode.next.next
            size--
            break
          }
          currentNode = currentNode.next
        }
      }

      return deleteIndex
    },

    indexOf(value) {
      if (size === 0 || !HEAD) return -1

      let currentNode: LinkedListNode<T> | null = HEAD
      let index = -1
      while (currentNode) {
        index++
        if (currentNode.value === value) {
          return index
        }
        currentNode = currentNode.next
      }

      return -1
    },

    at(index) {
      if (index < 0 || index > size) {
        return null
      }

      if (index === 0) return HEAD

      let currentNode = HEAD
      let count = 0
      while (count < index) {
        count++
        currentNode = currentNode ? currentNode.next : null
      }

      return currentNode
    },

    toArray() {
      if (!HEAD) return []
      const arr = []
      let cur: LinkedListNode<T> | null = HEAD
      while (cur) {
        arr.push(cur.value)
        cur = cur.next
      }
      return arr
    }
  }
}
