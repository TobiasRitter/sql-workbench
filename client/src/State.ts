export type State = {
    data: string;
    count: number;
}

export async function fetchApi(state: State): Promise<State> {
    return await fetch('/api').then(res => res.json()).then(data => {
        return { ...state, data };
    });
}

export function increment(state: State): State {
    return { ...state, count: state.count + 1 };
}
