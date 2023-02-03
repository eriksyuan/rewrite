import { ArgumentsType } from "vitest";

export function call<T extends (...args: any[]) => any>(
  
  fn: T,
  target?: Object,
  ...args: ArgumentsType<T>
): ReturnType<T> {
  const key = Symbol();
  const _target = target ?? global;
  _target[key] = fn;
  const res = _target[key](...args);
  delete _target[key];
  return res;
}
