import { ArgumentsType } from "vitest";

export function apply<T extends (...args: any[]) => any>(
  fn: T,
  target?: Object,
  args?: ArgumentsType<T>
): ReturnType<T> {
  const key = Symbol();
  let _target = target ?? global;
  _target[key] = fn;
  let _args = args?.length ? args : []
  const res = _target[key](..._args);
  delete _target[key];
  return res;
}
