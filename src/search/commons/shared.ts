function isObject(item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function deepMerge<T extends Record<string, any>>(target: T, source: RecursivePartial<T>): T {
  let output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key: keyof T) => {
      if (isObject(source[key])) {
        if (!(key in target)){
          output = { ...output, [key]: source[key] };
        } else {
          // @ts-ignore
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output = { ...output, [key]: source[key] };
      }
    });
  }
  return output;
}

export type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends Color4 ? T[P] :
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};