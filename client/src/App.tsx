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

  return (
    <div className="App">
      {state.data ? <h1>{state.data}</h1> : <h1>Loading...</h1>}
      {state.count}
      <button onClick={() => setState(increment)}>Increment</button>
      <button onClick={() => setState(decrement)}>Decrement</button>
      <button onClick={() => setState(reset)}>Reset</button>
    </div >
  );
}

export default App;
