/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
/* eslint-disable no-underscore-dangle */
interface LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
}

const createNode = <T>(value: T): LinkedListNode<T> => {
  return {
    value,
    next: null,
  };
};

export class SinglyLinkedList<T extends any> {
  private _size = 0;

  private _head: LinkedListNode<T> | null = null;

  constructor(
    private compare: (a: T, b: T) => boolean = (a: T, b: T) => a === b,
  ) {}

  get size() {
    return this._size;
  }

  get front() {
    return this._head ? this._head.value : undefined;
  }

  clear() {
    this._head = null;
    this._size = 0;
  }

  addFirst(value: T) {
    const node = createNode(value);
    node.next = this._head;
    this._head = node;
    this._size++;
    return node;
  }

  removeFirst() {
    if (this._size <= 0) {
      return undefined;
    }
    const prevHead = this._head;

    if (prevHead) {
      this._head = prevHead ? prevHead.next : null;
      this._size--;
      return prevHead.value;
    }
    return undefined;
  }

  findIndex(value: T) {
    if (this.size <= 0) return -1;

    let index = -1;
    let currentNode = this._head;
    while (currentNode && index < this.size - 1) {
      index++;
      if (this.compare(currentNode.value, value)) {
        return index;
      }
      currentNode = currentNode.next;
    }
    return -1;
  }

  find(value: T) {
    if (this.size <= 0) return undefined;

    let currentNode = this._head;
    while (currentNode && !this.compare(currentNode.value, value)) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  insertAt(value: T, _index: number) {
    const index = _index >= 0 ? _index : this.size + _index;
    if (index > this.size) return undefined;

    if (index === 0) {
      return this.addFirst(value);
    }
    const node = createNode(value);
    if (!this._head) {
      this._head = node;
      this._size++;
      return node;
    }
    let currentNode = this._head;
    let i = 0;
    // 查找到索引为index-1的节点
    while (currentNode.next && i < index - 1) {
      currentNode = currentNode.next;
      i++;
    }
    // node做为索引为index的节点，在索引为index-1的节点的后面
    currentNode.next = node;
    // 索引为index的节点的下一个是 index+1，即原 index-1的下一个的下一个
    node.next = currentNode.next ? currentNode.next.next : null;
    this._size++;
    return node;
  }

  removeAt(_index: number) {
    const index = _index >= 0 ? _index : this.size + _index;
    if (!this._head || this.size <= 0 || index > this.size - 1) return undefined;

    if (index === 0) {
      return this.removeFirst();
    }

    let i = 0;
    let currentNode = this._head;
    // 查找到第index-1个节点
    while (currentNode.next && i < index - 1) {
      currentNode = currentNode.next;
      i++;
    }
    currentNode.next = currentNode.next ? currentNode.next.next : null;
    this._size--;
    return currentNode.next?.value;
  }

  remove(value: T) {
    const index = this.findIndex(value);
    if (index > -1) {
      this.removeAt(index);
      return index;
    }
    return -1;
  }

  at(_index: number) {
    const index = _index >= 0 ? _index : this.size + _index;
    if (index > this.size - 1) return undefined;

    let currentNode = this._head;
    let i = 0;
    while (i < index) {
      currentNode = currentNode ? currentNode.next : null;
      i++;
    }
    return currentNode?.value;
  }

  forEach(
    callback: (value: T, index: number, queue: SinglyLinkedList<T>) => void,
  ) {
    let current = this._head;
    let index = 0;
    while (current) {
      if (typeof callback === "function") {
        callback(current.value, index, this);
      }
      current = current.next;
      index++;
    }
  }

  toArray() {
    if (!this._head) return undefined;
    const arr: T[] = [];
    let cur: LinkedListNode<T> | null = this._head;
    while (cur) {
      arr.push(cur.value);
      cur = cur.next;
    }
    return arr;
  }
}
