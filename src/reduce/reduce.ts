export function reduce<T>(
  arr: T[],
  callbackfn: (
    previousValue: T,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => T
): T;
export function reduce<T>(
  arr: T[],
  callbackfn: (
    previousValue: T,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => T,
  initialValue: T
): T;
export function reduce<T, U>(
  arr: T[],
  callbackfn: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U,
  initialValue?: U
): U {
  let result: U | undefined = initialValue;
  let index = 0;
  for (const item of arr) {
    if (!result) {
      result = item as unknown as U;
    } else {
      result = callbackfn(result, item, index, arr);
    }
    index++;
  }
  return result as U;
}
