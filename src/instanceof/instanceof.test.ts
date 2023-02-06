import { test, expect } from "vitest";
import { myInstanceOf } from "./instanceof";

test("instanceof", () => {
  function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  const auto = new Car("Honda", "Accord", 1998);

  expect(myInstanceOf(auto, Car)).toBe(true);
  expect(myInstanceOf(auto, Object)).toBe(true);
  expect(myInstanceOf({}, Array)).toBe(false);
  expect(myInstanceOf([], Array)).toBe(true);
  expect(myInstanceOf(()=>{}, Function)).toBe(true);
  expect(myInstanceOf(1,Number)).toBe(true);
  expect(myInstanceOf(true,Boolean)).toBe(true);
});
