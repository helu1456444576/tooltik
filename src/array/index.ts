type ArrayPredicate<T> = (value: T, index: number, array: IArrayLike<T>) => value is any
interface IArrayLike<T> {
  length: number;
  [n: number]: T;
}
//////////////////////////////// Array内置的方法

/**
 * 合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
 * @example
 * @param { Array } arr 待操作数组
 * const array1 = ['a', 'b', 'c'];
 * const array2 = ['d', 'e', 'f'];
 * const array3 = array1.concat(array2); // ["a", "b", "c", "d", "e", "f"]
 */
export const concat = <T>(
  arr: T[],
  ...newArr: T[]
): T[] => {
  return Array.prototype.concat.call(arr, ...newArr)
}

/**
 * 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度
 * @param { Array } arr 待操作数组
 * @param { number } from 复制序列到该位置，如果是负数，from 将从末尾开始计算，如果 end 大于等于 arr.length，将会不发生拷贝
 * @param { number } start 开始复制元素的起始位置
 * @param { number } end 开始复制元素的结束位置
 * @example
 * const array = ['a', 'b', 'c', 'd', 'e'];
 * array.copyWithin(0, 3, 4) // ["d", "b", "c", "d", "e"]
 */
export const copyWithin = <T>(
  arr: T[],
  from: number,
  start: number,
  end: number
): T[] => {
  return Array.prototype.copyWithin.call(arr, from, start, end)
}

/**
 * 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对
 * @param { Array } arr 待操作数组
 */
export const entries = <T>(
  arr: T[],
): IterableIterator<[number, T]>=> {
  return Array.prototype.entries.call( arr)
}

/**
 * 试一个数组内的所有元素是否都能通过某个指定函数的测试
 * @param { Array } arr 待操作数组
 * @param { Function } predicate 用来测试每个元素的函数
 */
export const every = <T, C = any>(
  arr: IArrayLike<T>,
  predicate: ArrayPredicate<T>,
  thisArg?: C
): boolean => {
  return Array.prototype.every.call(arr, predicate, thisArg)
}

/**
 * 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素
 * @example
 * const array1 = [1, 2, 3, 4];
 * array1.fill(0, 2, 4) // [1, 2, 0, 0]
 */
export const fill = <T>(
  arr: T[],
  value: T,
  start?: number,
  end?: number,
): T[] => {
  return Array.prototype.fill.call(arr, value, start, end)
}

/**
 * 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
 */
export const filter = <T, S = any>(
  arr: IArrayLike<T>,
  predicate: (value: T, index: number, array: T[]) => boolean,
  thisArg?: S
): IArrayLike<T> => {
  return Array.prototype.filter.call(arr, predicate, thisArg)
}

/**
 * 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
 */
export const find = <T, C>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C
): T | null => {
  return Array.prototype.find.call(arr, callbackfn, thisArg)
}

/**
 * 返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
 */
export const findIndex = <T, C>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C
): number => {
  return Array.prototype.findIndex.call(arr, callbackfn, thisArg)
}

/**
 * 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
 * @example
 * const arr1 = [0, 1, 2, [3, 4]];
 * arr1.flat() // [0, 1, 2, 3, 4]
 */
export const flat = <T, D extends number>(
  arr: T[],
  deep?: D
): FlatArray<T, D>[] => {
  return Array.prototype.flat.call(arr, deep) as FlatArray<T, D>[]
}

export const flatMap = <T, C>(
  arr: T[],
  callbackfn: (this:unknown, value: T, index: number, array: T[]) => unknown,
  thisArg?: C
): unknown[] => {
  return (Array.prototype as T[]).flatMap.call(arr, callbackfn, thisArg)
}

export const forEach = <T, C = any>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => void,
  thisArg?: C
): void => {
  return Array.prototype.forEach.call(arr, callbackfn, thisArg)
}

export const from = <T, C>(
  arr: Iterable<T> | IArrayLike<T>,
  callbackfn: (v: unknown, k: number) => unknown,
  thisArg?: C
): unknown[] => {
  return Array.from.call(thisArg, arr, callbackfn, thisArg)
}
/**
 * 判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false
 * @example
 * const array1 = [1, 2, 3];
 * array1.includes(2) // true
 */
export const includes = <T>(
  arr: T[],
  value: T,
  fromIndex?: number,
): boolean => {
  return Array.prototype.includes.call(arr, value, fromIndex)
}


export const indexOf = <T>(
  arr: IArrayLike<T>,
  searchElement: T,
  fromIndex?: number,
): number => {
  return Array.prototype.indexOf.call( arr, searchElement, fromIndex)
}

/**
 * 将一个数组的所有元素连接成一个字符串并返回这个字符串
 */
export const join = <T>(
  arr: T[],
  separator?: string
): string => {
  return Array.prototype.join.call(arr, separator)
}

export const keys = <T>(
  arr: T[]
): IterableIterator<number> => {
  return Array.prototype.keys.call(arr)
}

export const lastIndexOf = <T>(
  arr: IArrayLike<T>,
  searchElement: T,
  fromIndex?: number
): number => {
  fromIndex = fromIndex ? fromIndex : arr.length - 1
  return Array.prototype.lastIndexOf.call(arr, searchElement, fromIndex)
}


export const map = <T, S = any>(
  arr: T[],
  callbackfn: (value: T, index: number, array: T[]) => any,
  thisArg?: S
): T[] => {
  return <T[]>Array.prototype.map.call(arr, callbackfn, thisArg)
}

/**
 * 从数组中删除最后一个元素，并返回该元素的值
 */
export const pop = <T>(
  arr: T[]
): T | undefined => {
  return Array.prototype.pop.call(arr)
}

/**
 * 将一个或多个元素添加到数组的末尾，并返回该数组的新长度
 */
export const push = <T>(
  arr: T[],
  ...items: T[]
): number => {
  return Array.prototype.push.call(arr, ...items)
}

export const reduce = <T>(
  arr: T[],
  callbackfn: (previousValue: unknown, currentValue: any, currentIndex: number, array: T[]) => T,
  initialValue: T
): unknown => {
  return Array.prototype.reduce.call(arr, callbackfn, initialValue)
}

export const reduceRight = <T>(
  arr: T[],
  callbackfn: (previousValue: unknown, currentValue: any, currentIndex: number, array: T[]) => T,
  initialValue: T
): unknown => {
  return Array.prototype.reduceRight.call(arr, callbackfn, initialValue)
}

export const reverse = <T>(
  arr: T[]
): T[] => {
  return Array.prototype.reverse.call(arr)
}

/**
 * 数组中删除第一个元素，并返回该元素的值
 */
export const shift = <T>(
  arr: T[]
): T => {
  return Array.prototype.shift.call(arr)

}

/**
 * 返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝
 */
export const slice = <T>(
  arr: T[],
  begin?: number,
  end?: number,
): T[] => {
  return Array.prototype.slice.call(arr, begin, end)
}

/**
 * 测试数组中是不是至少有1个元素通过了被提供的函数测试
 */
export const some = <T, S = any>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => unknown,
  thisArg?: S
): boolean => {
  return Array.prototype.some.call(arr, predicate, thisArg)
}

/**
 * 用原地算法对数组的元素进行排序，并返回数组
 * 默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的
 */
export const sort = <T>(
  arr: T[],
  compareFn?: (a: T, b: T) => number
): T[] => {
  return Array.prototype.sort.call(arr, compareFn)
}

/**
 * 通过删除或替换现有元素或者原地添加新的元素来修改数组
 */
export const splice = <T>(
  arr: IArrayLike<T>,
  start: number,
  deleteCount: number,
  ...values: any[]
): T[] => {
  return Array.prototype.splice.call(arr, start, deleteCount, ...values)
}

/**
 * 将一个或多个元素添加到数组的开头
 */
export const unshift = <T>(
  arr: T[],
  ...items: T[]
): number => {
  return Array.prototype.unshift.call(arr, ...items)
}

/**
 * 返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
 */
export const values = <T>(
  arr: T[]
):  IterableIterator<T> => {
  return Array.prototype.values.call(arr)
}


//////////////////////////////// 引申出的方法
/**
 * 返回数组的最后一个元素，不会改变原数组。
 */
export const last = <T>(arr: IArrayLike<T>): T | undefined => {
  if (arr.length === 0) return undefined;
  return arr[arr.length - 1]
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

export const findIndexRight = <T, C>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C
): number => {
  const l = arr.length;
  for (let i = l - 1; i >= 0; i--) {
    if (callbackfn.call((thisArg), arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}


export const findRight = <T, C>(
  arr: IArrayLike<T>,
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C
): T | undefined => {
  const i = findIndexRight(arr, callbackfn, thisArg);

  return i > 0 ? arr[i] : undefined
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
export const insert = <T>(arr: T[], obj: T): T[] => {
  if (!contains(arr, obj)) {
    arr.push(obj);
  }
  return arr
}

/**
 * 插入一个值到数组中的指定下标
 */
export const insertAt = <T>(arr: T[], index: number, ...obj: T[]): T[] => {
  splice(arr, index, 0, ...obj);
  return arr
}

// TODO insertArrayAt

/**
 * 在指定元素之前插入一个元素
 */
export const insertBefore = <T>(
  arr: T[],
  matchedData: T,
  ...dataToInsert: T[]
): T[] => {
  const i = indexOf(arr, matchedData)
  if (i < 0) {
    arr.push(...dataToInsert)
  } else {
    insertAt(arr, i, ...dataToInsert)
  }
  return arr
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

/**
 * 根据给定的条件移除数组中符合的第一个元素
 */
export const removeIf = <T, C>(
  arr: T[],
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C
): boolean => {
  const index = findIndex(arr, callbackfn, thisArg);
  if (index >=0 ) {
    removeAt(arr, index)
    return true
  }
  return false
}

/**
 * 根据给定的条件移除数组中的所有符合的元素
 */
export const removeAllIf = <T, C>(
  arr: T[],
  callbackfn: (value: T, index: number, array: IArrayLike<T>) => unknown,
  thisArg?: C
): number => {
  let removedCount = 0;
  forEachRight(arr, (value, index) => {
    if (callbackfn.call(thisArg, value, index, arr)) {
      if (removeAt(arr, index)) {
        removedCount++;
      }
    }
  })
  return removedCount
}

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