import { useEffect, useState } from 'react';
import './App.css';
import { increment, State, update } from './State';

const initialState: State = { data: "", count: 0 };

export function myget(url: string, callback: (data: any) => void): void {
  fetch(url).then(res => res.json()).then(callback);
}

function App() {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    myget("/api", data => setState(prev => update(prev, data)));
  }, []);

  return (
    <div className="App">
      {state.data ? <h1>{state.data}</h1> : <h1>Loading...</h1>}
      {state.count}
      <button onClick={() => setState(increment)}>Increment</button>
    </div >
  );
}

export default App;
