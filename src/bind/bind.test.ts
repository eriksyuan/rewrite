import { expect, test } from "vitest";
import { bind } from "./bind";

// Edit an assertion and save to see HMR in action

test("Bind", () => {
  global.x = 9;
  const module = {
    x: 42,
    getX: function () {
      return this?.x ?? global.x;
    },
  };

  expect(module.getX()).toBe(42)

  const unboundGetX = module.getX;

  expect(unboundGetX()).toBe(9);
  const boundGetX = bind(unboundGetX, module);
  expect(boundGetX()).toBe(42);
  // Expected output: 42
});
