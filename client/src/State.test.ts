import { increment, updateData } from "./State";

test("properly increments count", () => {
    const initialState = { data: "", count: 0 };
    const state = increment(initialState);
    expect(state.count).toBe(1);
});

test("properly updates data", () => {
    const initialState = { data: "", count: 0 };
    const state = updateData(initialState, "new data");
    expect(state.data).toBe("new data");
});
