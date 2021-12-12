import { createQueue } from '../src/data-structure/queue';

describe('test queue', () => {
  it('init', () => {
    const queue = createQueue();
    expect(queue.size()).toBe(0);
  });

  it('enqueue', () => {
    const queue = createQueue();
    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.size()).toBe(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
  });

  it('dequeue', () => {
    const queue = createQueue();
    expect(queue.dequeue()).toBe(undefined);
    expect(queue.dequeue()).toBe(undefined);

    queue.enqueue(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(undefined);
  })

  it('peek', () => {
    const queue = createQueue();

    queue.enqueue(1);
    expect(queue.peek()).toBe(1);
    queue.dequeue()
    expect(queue.peek()).toBe(undefined);
  })

  it('clear', () => {
    const queue = createQueue();

    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);

    queue.clear();
    expect(queue.size()).toBe(0);
  })

  it("forEach", () => {
    const queue = createQueue();
    let fn = jest.fn()

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.forEach(fn);
    expect(fn).toBeCalledTimes(3);

    fn = jest.fn()
    queue.dequeue();
    queue.dequeue();

    queue.forEach(fn);
    expect(fn).toBeCalledTimes(1);

    fn = jest.fn()
    queue.dequeue();
    queue.forEach(fn);
    expect(fn).toBeCalledTimes(0);
  })

  it("toArray", () => {
    const queue = createQueue();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.toArray()).toEqual([1, 2, 3]);
  })

});