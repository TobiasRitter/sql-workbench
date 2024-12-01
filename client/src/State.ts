export type State = {
    data: string;
    count: number;
}

export function update(state: State, data: string): State {
    return { ...state, data };
}

export function increment(state: State): State {
    return { ...state, count: state.count + 1 };
}
