import { expect, test } from "vitest";
import { debounce } from "./debounce";

test("debounce", async () => {
  let num = 0;

  function add() {
    num++;
  }

  const work = debounce(add, 1000,false);

  const sleep = (time) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, time);
    });

  work();
  await sleep(999);
  work();
  await sleep(1001);
  work();


  expect(num).toBe(1);
});
