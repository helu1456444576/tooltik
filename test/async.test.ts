import { to } from '../src/async/index';

describe('Async Methods Test', () => {
  it('to', async () => {
    const promise = Promise.resolve(1)
    const [data, err] = await to(promise)
    expect(data).toBe(1)
    expect(err).toBe(null)

    const promise2 = Promise.reject(new Error('error'))
    const [data2, err2] = await to(promise2)
    expect(data2).toBe(undefined)
    expect(err2?.message).toBe('error')
  })
});