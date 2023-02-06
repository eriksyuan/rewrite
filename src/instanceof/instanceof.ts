export function myInstanceOf(source: any, target: Record<any,any>) {
  let _source = source;
  while (_source.__proto__ !== null) {
    if (_source.__proto__ === target.prototype) {
      return true;
    }
    _source = _source.__proto__
  }
  return false;
}
