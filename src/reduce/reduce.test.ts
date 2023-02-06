import { expect, test } from "vitest";
import { reduce } from "./reduce";

// Edit an assertion and save to see HMR in action

test("Call", () => {
  let arr1 = [1, 2, 3];
  let fn1 = (pre, cur) => pre + cur;
  let res1 = arr1.reduce(fn1);
  expect(reduce(arr1, fn1)).toBe(res1);

  let arr2 = [1, 2, 3, 4, 5, 6, 7];
  let fn2 = (pre, cur) => pre - cur;
  let res2 = arr2.reduce(fn2, 100);
  expect(reduce(arr2, fn2, 100)).toBe(res2);
});
