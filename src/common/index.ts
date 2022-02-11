import cloneDeep from "lodash.clonedeep";

/**
 * 深度拷贝
 * @param { * } raw 要深拷贝的值
 */
export function deepClone(raw: any) {
  return cloneDeep(raw);
}
