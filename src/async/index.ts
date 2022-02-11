import type { Fn } from '../typeDef';

export function sleep(ms: number, callback?: Fn<any>) {
  return new Promise<void>(resolve =>
    setTimeout(async() => {
      await callback?.()
      resolve()
    }, ms),
  )
}

export function to<D, E = Error> (
  promise: Promise<D>,
  errorExt?: Record<string, any>
): Promise<[undefined, E] | [D, null]> {
  return promise
    .then<[D, null]>((data: D) => [data, null])
    .catch<[undefined, E]>((err: E) => {
    if (errorExt) {
      Object.assign(err, errorExt);
    }

    return [undefined, err];
  });
}
