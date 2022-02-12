/* eslint-disable no-param-reassign */
interface IArrayLike<T> {
  length: number;
  [n: number]: T;
}

/**
 * 返回数组的最后一个元素，不会改变原数组。
 */
export const last = <T>(arr: IArrayLike<T>): T | undefined => {
  if (arr.length === 0) return undefined;
  return arr[arr.length - 1];
};

/**
 * 从数组的最后一个元素向第一个元素开始遍历
 */
export const forEachRight = <T, C = any>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, self: IArrayLike<T>) => void,
  context?: C,
): void => {
  const l = arr.length;
  for (let i = l - 1;i >= 0;--i) {
    if (i in arr) {
      callbackfn.call(context, arr[i], i, arr);
    }
  }
};

export const count = <T, C = any>(
  arr: T[],
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => value is any,
  ctx?: C,
): number => {
  let num = 0;
  arr.forEach((val, index, _arr) => {
    if (callbackfn.call(ctx, val, index, _arr)) {
      ++num;
    }
  }, ctx);
  return num;
};

export const findIndexRight = <T, C>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C,
): number => {
  const l = arr.length;
  for (let i = l - 1;i >= 0;i--) {
    if (callbackfn.call((thisArg), arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
};

export const findRight = <T, C>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C,
): T | undefined => {
  const i = findIndexRight(arr, callbackfn, thisArg);

  return i > 0 ? arr[i] : undefined;
};

/**
 * 判断数组中是否包含给定的对象
 */
export const contains = <T>(arr: T[], obj: T): boolean => arr.indexOf(obj) >= 0;

/**
 * 判断数组是否为空
 */
export const isEmpty = <T>(arr: IArrayLike<T>): boolean => arr.length === 0;

/**
 *清空数组中的值
 */
export const clear = <T>(arr: IArrayLike<T>): void => {
  if (!Array.isArray(arr)) {
    for (let i = arr.length - 1;i >= 0;i--) {
      delete arr[i];
    }
  }
  arr.length = 0;
};

/**
 * 插入一个值到数组的末尾，如果值已存在，则不插入
 */
export const insert = <T>(arr: T[], obj: T): T[] => {
  if (!contains(arr, obj)) {
    arr.push(obj);
  }
  return arr;
};

/**
 * 插入一个值到数组中的指定下标
 */
export const insertAt = <T>(arr: T[], index: number, ...obj: T[]): T[] => {
  arr.splice(index, 0, ...obj);
  return arr;
};

// TODO insertArrayAt

/**
 * 在指定元素之前插入一个元素
 */
export const insertBefore = <T>(
  arr: T[],
  matchedData: T,
  ...dataToInsert: T[]
): T[] => {
  const i = arr.indexOf(matchedData);
  if (i < 0) {
    arr.push(...dataToInsert);
  } else {
    insertAt(arr, i, ...dataToInsert);
  }
  return arr;
};

/**
 * 移除数组中指定下标的元素
 */
export const removeAt = <T>(
  arr: T[],
  i: number,
): boolean => Array.prototype.splice.call(arr, i, 1).length === 1;

/**
 * 移除数组中第一个选择的元素
 */
export const remove = <T>(
  arr: T[],
  obj: T,
): number => {
  const i = arr.indexOf(obj);
  if (i >= 0) {
    removeAt(arr, i);
  }
  return i;
};

/**
 * 根据给定的条件移除数组中符合的第一个元素
 */
export const removeIf = <T, C>(
  arr: T[],
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C,
): boolean => {
  const index = arr.findIndex(callbackfn, thisArg);
  if (index >= 0) {
    removeAt(arr, index);
    return true;
  }
  return false;
};

/**
 * 根据给定的条件移除数组中的所有符合的元素
 */
export const removeAllIf = <T, C>(
  arr: T[],
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C,
): number => {
  let removedCount = 0;
  forEachRight(arr, (value, index) => {
    if (callbackfn.call(thisArg, value, index, arr)) {
      if (removeAt(arr, index)) {
        removedCount++;
      }
    }
  });
  return removedCount;
};

/**
 * 将一个类数组转换为数组类型
 */
export const toArray = <T>(object: IArrayLike<T>): T[] => {
  const { length } = object;

  if (length > 0) {
    const rv: T[] = new Array(length);
    for (let i = 0;i < length;i++) {
      rv[i] = object[i];
    }
    return rv;
  }
  return [];
};

/**
 * 将数组进行反转
 */
export const rotate = <T>(
  arr: T[],
  n: number,
): T[] => {
  if (arr.length) {
    n %= arr.length;
    if (n > 0) {
      // 将后n个元素，移动到前n个
      // splice会返回删除的元素，然后通过unshift插入到前面
      Array.prototype.unshift.apply(arr, arr.splice(-n, n));
    } else if (n < 0) {
      // 将前n个元素，移动到后n个
      // 将前n个元素移除，然后通过push放到数组后面
      Array.prototype.push.apply(arr, arr.splice(0, -n));
    }
  }
  return arr;
};

/**
 * 将一个数重复n次，返回一个数组
 */
export const repeat = <T>(
  value: T,
  n: number,
): T[] => {
  const array = [];
  for (let i = 0;i < n;i++) {
    array[i] = value;
  }
  return array;
};

export const flatten = <T>(...args: T[]): T[] => {
  const CHUNK_SIZE = 8192;

  const result: T[] = [];
  for (let i = 0;i < args.length;i++) {
    const element = args[i];
    if (Array.isArray(element)) {
      for (let c = 0;c < element.length;c += CHUNK_SIZE) {
        const chunk = element.slice(c, c + CHUNK_SIZE);
        const recurseResult = flatten(...chunk);
        for (let r = 0;r < recurseResult.length;r++) {
          result.push(recurseResult[r]);
        }
      }
    } else {
      result.push(element);
    }
  }
  return result;
};

// shuffle
// zip
// moveItem
// range
// bucket
// binaryRemove
// binaryInsert
// equals
// stableSort
// binarySelect
// binarySearch
// removeDuplicates
// extend
// clone
// chunk
// compact
// difference
// differenceBy
// differenceWith
// drop
// dropRight
// dropWhile
// fill
// flattenDeep
// fromPairs
// head
// initial
// intersection
// intersectionWith
// nth
// pull
// pullAll
// pullAllBy
// pullAllWith
// pullAllAt
// tail
// take
// takeRight
// takeRightWile
// union
// unionBy
// unionWith
// uniq
