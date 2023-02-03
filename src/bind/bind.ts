import { ArgumentsType } from "vitest";
export function bind<T extends (...args: any[]) => any>(
  fn: T,
  target?: Object
) {
  const _target = target ?? global;
  let key = Symbol();
  return function (...args: ArgumentsType<T>) {
    _target[key] = fn;
    const res = _target[key](...args);
    delete res[key];
    return res;
  };
}
