type PlainObject = Record<string, any>

export function pick(data: PlainObject, attrs: string[] = []) {
  const result: PlainObject = {};
  attrs.forEach((attr) => {
    if (typeof data[attr] !== 'undefined') {
      result[attr] = data[attr];
    }
  });
  return result;
}

export function omit(data, attrs = []) {
  const result = {
    ...data,
  };
  attrs.forEach((attr) => {
    delete result[attr];
  });
  return result;
}