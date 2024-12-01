import { increment } from "./State";

test("properly increments count", () => {
    const initialState = { data: "", count: 0 };
    const state = increment(initialState);
    expect(state.count).toBe(1);
});
