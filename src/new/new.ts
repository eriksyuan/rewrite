import { ArgumentsType } from "vitest";
export function myNew<T extends (...args: any[]) => any>(
  fn: T,
  ...args: ArgumentsType<T>
) {
  const obj = {}
  // Object.setPrototypeOf(obj, fn.prototype)
  // obj.__proto__ = fn.prototype
  // const obj = Object.create(fn.prototype);
  const res = fn.call(obj, ...args);
  if(typeof res === 'object'){
    return res
  }
  return obj
}


