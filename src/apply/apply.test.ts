import { expect, test } from "vitest";
import { apply } from "./apply";

// Edit an assertion and save to see HMR in action

test("Apply", () => {
  let a = { name: "yzt" };
  function fn(name?: string) {
    return name ? name : this.name;
  }
  expect(apply(fn, a)).toBe("yzt");
  expect(apply(fn)).toBe(undefined);
  expect(apply(fn, a, ["sdsd"])).toBe("sdsd");
});
