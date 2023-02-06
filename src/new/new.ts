import { ArgumentsType } from "vitest";
export function myNew<T extends (...args: any[]) => any>(
  fn: T,
  ...args: ArgumentsType<T>
) {
  let obj = Object.create(fn.prototype);
  const res = fn.call(obj, ...args);
  if(typeof res === 'object'){
    return res
  }
  return obj
}


