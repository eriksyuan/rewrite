import { test, expect } from "vitest";
import { myNew } from "./new"


test("new", () => {
  function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  const car1 = myNew(Car,"audi","model","year")

  expect(car1.make).toBe("audi")
  expect(car1.__proto__ === Car.prototype).toBe(true)
});
