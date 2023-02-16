// 防抖函数

import { ArgumentsType } from "vitest";

/*
 * @param {Function} fn - 需要防抖的函数
 * @param {Number} delay - 防抖的时间
 * @param {Boolean} immediate - 是否立即执行
 * @return {Function} - 返回一个防抖函数
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  immediate = false
) {
  let time: ReturnType<typeof setTimeout> | null;
  return function (...args: ArgumentsType<T>) {
    if (!time && immediate) {
      fn.call(this, ...args);
    }
    if (time) {
      clearTimeout(time);
      time = null;
    }

    time = setTimeout(() => {
      fn.call(this, ...args);
      time = null;
    }, delay);
  };
}
