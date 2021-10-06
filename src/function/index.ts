
/**
 * 从右往左执行函数组合，前一个函数的返回值将会作为后一个函数的参数传入
 */
export function compose(...funcs: any[]) {
  if (funcs.length === 0) {
    return (arg: any[]) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  const first = funcs[0];
  const rest = funcs.slice(1);
  return (...args: any[]) => rest.reduce((composed, f) => f(composed), first(...args));
}