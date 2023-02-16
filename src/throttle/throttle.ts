import { ArgumentsType } from "vitest";


/**
 *
 *
 * @template T
 * @param {T} fn
 * @param {number} delay
 * @param {boolean} [immediate=false]
 */
export function throttle<T extends (...args: any[]) => void>(
    fn: T,
    delay: number,
    immediate = false
  ) {
    let lastTime: number = 0;
    return function (...args: ArgumentsType<T>) {
      const now = Date.now();
  
      if (immediate) {
        fn.apply(this, args);
        lastTime = now;
      }
  
      if (!lastTime) {
        lastTime = now;
      }
      if (lastTime - now > delay) {
        fn.apply(this, args);
        lastTime = now;
      }
    };
  }

