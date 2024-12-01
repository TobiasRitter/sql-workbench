export type State = {
    data: string;
    count: number;
}

export async function fetchApi() : Promise<any>{
    return await fetch('/api').then(res => res.json())
}

export function updateData(state: State, data: string): State {
    return { ...state, data };
}

export function increment(state: State): State {
    return { ...state, count: state.count + 1 };
}
