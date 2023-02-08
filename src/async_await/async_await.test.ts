import { expect, test } from "vitest";
import { asyncAwait } from "./async_await";

test("async-await", () => {
  async function fn(num: number) {
    return num * 2;
  }

  function* gen() {
    const num1 = yield fn(1);
    const num2 = yield fn(num1);
    const num4 = yield null;
    const num3 = yield fn(num2);
    return num3;
  }

  let asyncFn = asyncAwait(gen);

  asyncFn().then(res=>{
    expect(res).toBe(8)
  })
});
