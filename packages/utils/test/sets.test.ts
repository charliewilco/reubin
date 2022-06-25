import { Setative } from "../src/set-helpers";

describe("Setative", () => {
  it("can map", () => {
    const n = new Setative([1, 2, 3]);
    const m = n.map((v) => v * 2);
    expect(m.has(6)).toBeTruthy();
  });

  it("can find difference", () => {
    const base = new Setative([1, 2, 3, 5]);
    const m = new Set([1, 2, 3, 4]);
    const diff = base.difference(m);

    expect(diff.has(5)).toBeTruthy();
    expect(diff.has(3)).toBeFalsy();
  });
});
