import { getType, isNull, isUndefined} from "../src/types"
describe('types', () => {
  const str = "123"
  const num = 123
  const bool = false
  const reg = /name/
  const obj = {}
  const arr = ["1"]
  const func = () => {
    // 
  }
  const map = new Map()
  const weakMap = new WeakMap()
  const set = new Set()
  const weakSet = new WeakSet()
  const symbol = Symbol("s")
  const nullVar = null
  const undefinedVar = undefined

  it('getType ', () => {

    expect(getType(str)).toBe("[object String]")
    expect(getType(num)).toBe("[object Number]")
    expect(getType(bool)).toBe("[object Boolean]")
    expect(getType(reg)).toBe("[object RegExp]")
    expect(getType(obj)).toBe("[object Object]")
    expect(getType(arr)).toBe("[object Array]")
    expect(getType(func)).toBe("[object Function]")
    expect(getType(map)).toBe("[object Map]")
    expect(getType(weakMap)).toBe("[object WeakMap]")
    expect(getType(set)).toBe("[object Set]")
    expect(getType(weakSet)).toBe("[object WeakSet]")
    expect(getType(symbol)).toBe("[object Symbol]")
  });

  it('is*', () => {
    expect(isNull(nullVar)).toBeTruthy()
    expect(isUndefined(undefinedVar)).toBeTruthy()
  });
});