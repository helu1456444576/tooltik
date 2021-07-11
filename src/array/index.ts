type ArrayPredicate<T> = (value: T, index: number, array: IArrayLike<T>) => value is any
interface IArrayLike<T> {
  length: number;
  [n: number]: T;
}

/**
 * 返回数组的最后一个元素，不会改变原数组。
 */
export const last = <T>(arr: IArrayLike<T>): T => {
  return arr[arr.length - 1]
}


export const lastIndexOf = <T>(
  arr: IArrayLike<T>,
  searchElement: T,
  fromIndex?: number
): number => {
  return Array.prototype.lastIndexOf.call(arr, searchElement, fromIndex)
}

export const indexOf = <T>(
  arr: IArrayLike<T>,
  searchElement: T,
  fromIndex?: number,
): number => {
  return Array.prototype.indexOf.call( arr, searchElement, fromIndex)
}

export const forEach = <T, C = any>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => void,
  thisArg?: C
): void => {
  return Array.prototype.forEach.call(arr, callbackfn, thisArg)
}

/**
 * 从数组的最后一个元素向第一个元素开始遍历
 */
export const forEachRight = <T, C = any>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, self: IArrayLike<T>) => void,
  context?: C
): void => {
  const l = arr.length;
  for (let i = l - 1; i >= 0; --i) {
    if (i in arr) {
      callbackfn.call(context, arr[i], i, arr);
    }
  }
}

export const filter = <T, S = any>(
  arr: IArrayLike<T>,
  predicate: (value: T, index: number, array: T[]) => value is any,
  thisArg?: S
): IArrayLike<T> => {
  return Array.prototype.filter.call(arr, predicate, thisArg)
}

export const map = <T, S = any>(
  arr: T[],
  callbackfn: (value: T, index: number, array: T[]) => T[],
  thisArg?: S
): T[] => {
  return <T[]>Array.prototype.map.call(arr, callbackfn, thisArg)
}

export const reduce = <T>(
  arr: T[],
  callbackfn: (previousValue: unknown, currentValue: any, currentIndex: number, array: T[]) => T,
  initialValue: T
): unknown => {
  return Array.prototype.reduce.call(arr, callbackfn, initialValue)
}

export const some = <T, S = any>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => unknown,
  thisArg?: S
): boolean => {
  return Array.prototype.some.call(arr, predicate, thisArg)
}

export const splice = <T>(
  arr: IArrayLike<T>,
  start: number,
  deleteCount: number,
  ...values: any[]
): T[] => {
  return Array.prototype.splice.call(arr, start, deleteCount, ...values)
}

export const every = <T, C = any>(
  arr: IArrayLike<T>,
  predicate: ArrayPredicate<T>,
  thisArg?: C
): boolean => {
  return Array.prototype.every.call(arr, predicate, thisArg)
}

export const concat = <T>(
  arr: T[],
  ...newArr: T[]
): T[] => {
  return Array.prototype.concat.call(arr, ...newArr)
}

export const count = <T, C = any>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => value is any,
  ctx?: C
): number => {
  let count = 0
  forEach(arr, (val, index, _arr) => {
    if (callbackfn.call(ctx, val, index, _arr)) {
      ++count
    }
  }, ctx)
  return count
}

export const findIndex = <T, C>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C
): number => {
  return Array.prototype.findIndex.call(arr, callbackfn, thisArg)
}

export const findIndexRight = <T, C>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C
): number => {
  const l = arr.length;
  for (let i = l - 1; i >= 0; i--) {
    if (i in arr && callbackfn.call((thisArg), arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}


export const find = <T, C>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C
): T | null => {
  return Array.prototype.find.call(arr, callbackfn, thisArg)
}

export const findRight = <T, C>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C
): T | null => {
  const i = findIndexRight(arr, callbackfn, thisArg);

  return i > 0 ? arr[i] : null
}

/**
 * 判断数组中是否包含给定的对象
 */
export const contains = <T>(arr: IArrayLike<T>, obj: T): boolean  => {
  return indexOf(arr, obj) >= 0
}

/**
 * 判断数组是否为空
 */
export const isEmpty = <T>(arr: IArrayLike<T>): boolean => {
  return arr.length === 0
}

/**
 *清空数组中的值
 */
export const clear = <T>(arr: IArrayLike<T>): void => {
  if (!Array.isArray(arr)) {
    for (let i = arr.length - 1; i >= 0; i--) {
      delete arr[i];
    }
  }
  arr.length = 0;
}

/**
 * 插入一个值到数组的末尾，如果值已存在，则不插入
 */
export const insert = <T>(arr: T[], obj: T): void => {
  if (!contains(arr, obj)) {
    arr.push(obj);
  }
}

/**
 * 插入一个值到数组中的指定下标
 */
export const insertAt = <T>(arr: IArrayLike<T>, obj: T, index: number): void => {
  splice(arr, index, 0, obj);
}

// TODO insertArrayAt

/**
 * 在指定元素之前插入一个元素
 */
export const insertBefore = <T>(
  arr: T[],
  dataToInsert: T,
  matchedData: T
): void => {
  const i = indexOf(arr, matchedData)
  if (!matchedData || i < 0) {
    arr.push(dataToInsert)
  } else {
    insertAt(arr, dataToInsert, i, )
  }
}

/**
 * 移除数组中指定下标的元素
 */
export const removeAt = <T>(
  arr: T[],
  i: number
): boolean => {
  return Array.prototype.splice.call(arr, i, 1).length == 1
}

/**
 * 移除数组中第一个选择的元素
 */
export const remove = <T>(
  arr: T[],
  obj: T
): number => {
  const i = indexOf(arr, obj);
  if (i >= 0) {
    removeAt(arr, i);
  }
  return i;
}

/**
 * 移除数组中最后一个选择的元素
 */
export const removeLast = <T>(
  arr: T[],
  obj: T
): number => {
  const i = lastIndexOf(arr, obj);
  if (i >= 0) {
    removeAt(arr, i);
  }
  return i;
}

// TODO removeAllIf

/**
 * 将一个类数组转换为数组类型
 */
export const toArray = <T>(object: IArrayLike<T>): T[] => {
  const length = object.length;

  if (length > 0) {
    const rv: T[] = new Array(length);
    for (let i = 0; i < length; i++) {
      rv[i] = object[i];
    }
    return rv;
  }
  return [];
}