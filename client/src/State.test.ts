import { decrement, increment, updateData } from "./State";

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

test("properly decrements count", () => {
    const initialState = { data: "", count: 1 };
    const state = decrement(initialState);
    const state2 = decrement(state);
    
    expect(state.count).toBe(0);
    expect(state2.count).toBe(0);
});
