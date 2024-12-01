import { useState } from 'react';
import './App.css';

type State = {
  data: string;
}

const initialState: State = { data: "" };

async function fetchApi(state: State): Promise<State> {
  return await fetch('/api').then(res => res.json()).then(data => {
    return { ...state, data };
  });
}

function App() {
  const [state, setState] = useState<State>(initialState);

  fetchApi(state).then(newState => { setState(newState) });

  return (
    <div className="App">
      {state.data ? <h1>{state.data}</h1> : <h1>Loading...</h1>}
    </div >
  );
}

export default App;
