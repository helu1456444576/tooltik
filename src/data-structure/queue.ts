/* eslint-disable accessor-pairs */
/* eslint-disable no-underscore-dangle */
interface QueueNode<T> {
  value: T;
  next: QueueNode<T> | null;
}

const createNode = <T>(value: T): QueueNode<T> => {
  return {
    value,
    next: null,
  };
};

export class Queue<T> {
  private _size = 0;

  private _head: QueueNode<T> | null = null;

  private _tail: QueueNode<T> | null = null;

  get size() {
    return this._size;
  }

  get front() {
    return this._head ? this._head.value : undefined;
  }

  /**
   * @description 将元素添加到队列尾部
   * @param value 需要添加的值
   */
  enqueue(value: T) {
    const node = createNode(value);
    if (this._head && this._tail) {
      this._tail.next = node;
      this._tail = node;
    } else {
      this._head = node;
      this._tail = node;
    }

    this._size++;
  }

  /**
   * @description 删除队列头部元素
   */
  dequeue(): T | undefined {
    const current = this._head;
    if (!current) {
      return undefined;
    }

    this._head = current.next;
    this._size--;
    return current.value;
  }

  clear() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  forEach(
    callback: (value: T, index: number, queue: Queue<T>) => void,
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
    const arr: T[] = [];
    this.forEach((value) => {
      arr.push(value);
    });
    return arr;
  }
}
