import { useEffect, useState } from 'react';
import './App.css';
import { decrement, increment, reset, State, updateData } from './State';

const initialState: State = { data: "", count: 0 };

export function myget(url: string, callback: (data: any) => void): void {
  fetch(url).then(res => res.json()).then(callback);
}

function App() {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    myget("/api", data => setState(prev => updateData(prev, data)));
  }, []);

  const params = new URLSearchParams(window.location.search);
  const uid = params.get("uid");

  return (
    <div className="App">
      {uid ? <h1>uid: {uid}</h1> : <h1>No uid</h1>}
      {state.data ? <h1>{state.data}</h1> : <h1>Loading...</h1>}
      {state.count}
      <button onClick={() => setState(increment)}>Increment</button>
      <button onClick={() => setState(decrement)}>Decrement</button>
      <button onClick={() => setState(reset)}>Reset</button>
    </div >
  );
}

export default App;
