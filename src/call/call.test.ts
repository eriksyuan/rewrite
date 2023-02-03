import { expect, test } from "vitest";
import { call } from "./call";

// Edit an assertion and save to see HMR in action

test("Call", () => {
  let a = { name: "yzt" };
  function fn(name?:string,) {
    return name?name:this.name;
  }
  expect(call( fn,a)).toBe("yzt");
  expect(call(fn)).toBe(undefined);
  expect(call(fn,a,'sdsd')).toBe('sdsd')
});
