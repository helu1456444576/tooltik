import { Queue } from "../src/data-structure/Queue";

describe("test queue", () => {
  it("init", () => {
    const queue = new Queue();
    expect(queue.size).toBe(0);
  });

  it("enqueue", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.size).toBe(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
  });

  it("dequeue", () => {
    const queue = new Queue();
    expect(queue.dequeue()).toBe(undefined);
    expect(queue.dequeue()).toBe(undefined);

    queue.enqueue(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(undefined);
  });

  it("peek", () => {
    const queue = new Queue();

    queue.enqueue(1);
    expect(queue.front).toBe(1);
    queue.dequeue();
    expect(queue.front).toBe(undefined);
  });

  it("clear", () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size).toBe(2);

    queue.clear();
    expect(queue.size).toBe(0);
  });

  it("forEach", () => {
    const queue = new Queue();
    let fn = jest.fn();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.forEach(fn);
    expect(fn).toBeCalledTimes(3);

    fn = jest.fn();
    queue.dequeue();
    queue.dequeue();

    queue.forEach(fn);
    expect(fn).toBeCalledTimes(1);

    fn = jest.fn();
    queue.dequeue();
    queue.forEach(fn);
    expect(fn).toBeCalledTimes(0);
  });

  it("toArray", () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.toArray()).toEqual([
      1,
      2,
      3,
    ]);
  });
});
