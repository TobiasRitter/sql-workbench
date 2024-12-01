export type State = {
    data: string;
    count: number;
}

export function updateData(state: State, data: string): State {
    return { ...state, data };
}

export function increment(state: State): State {
    return { ...state, count: state.count + 1 };
}

export function decrement(state: State): State {
    return { ...state, count: state.count > 0? state.count - 1:0 };
}

export function reset(state: State): State {
    return {...state, count: 0 };
}
