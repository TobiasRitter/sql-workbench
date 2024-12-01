import { useState } from 'react';
import './App.css';

type State = {
  data: string;
  count: number;
}

const initialState: State = { data: "", count: 0 };

async function fetchApi(state: State): Promise<State> {
  return await fetch('/api').then(res => res.json()).then(data => {
    return { ...state, data };
  });
}

function increment(state: State): State {
  return { ...state, count: state.count + 1 };
}

function App() {
  const [state, setState] = useState<State>(initialState);

  // fetchApi(state).then(newState => { setState(newState) });

  return (
    <div className="App">
      {state.data ? <h1>{state.data}</h1> : <h1>Loading...</h1>}
      {state.count}
      <button onClick={() => setState(increment)}>Increment</button>
    </div >
  );
}

export default App;
