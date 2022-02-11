import { upperAt } from './../src/string/index';
import {
  padStart,
  padEnd,
  upperFirst
} from '../src/string/index';

describe('String test', () => {
  it('padStart', () => {
    expect(padStart("Hello", 2)).toBe("Hello");
    expect(padStart("Hello", 7)).toBe("00Hello");
    expect(padStart("Hello", 7, "*")).toBe("**Hello");
    expect(padStart("Hello", 7, "123")).toBe("11Hello");
    expect(padStart("Hello", 7, "")).toBe("Hello");
  });

  it('padEnd', () => {
    expect(padEnd("Hello", 2)).toBe("Hello");
    expect(padEnd("Hello", 7)).toBe("Hello00");
    expect(padEnd("Hello", 7, "*")).toBe("Hello**");
    expect(padEnd("Hello", 7, "123")).toBe("Hello11");
    expect(padEnd("Hello", 7, "")).toBe("Hello");
  });

  it('upperFirst', () => {
    expect(upperFirst("")).toBe("");
    expect(upperFirst("hello")).toBe("Hello");
    expect(upperFirst("Hello")).toBe("Hello");
    expect(upperFirst("12")).toBe("12");
    expect(upperFirst("+-1")).toBe("+-1");
  })

  it('upperAt', () => {
    expect(upperAt("", 1)).toBe("");
    expect(upperAt("hello", 0)).toBe("Hello");
    expect(upperAt("Hello", 1)).toBe("HEllo");
    expect(upperAt("Hello", -1)).toBe("HellO");
    expect(upperAt("hello", 10)).toBe("hello");
    expect(upperAt("12", 1)).toBe("12");
    expect(upperAt("+-1", 1)).toBe("+-1");
  })
});