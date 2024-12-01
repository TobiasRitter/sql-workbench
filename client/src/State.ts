export type State = {
    data: string;
    count: number;
}

export function increment(state: State): State {
    return { ...state, count: state.count + 1 };
}
