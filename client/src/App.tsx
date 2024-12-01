import { useEffect, useState } from 'react';
import './App.css';
import { increment, State } from './State';

const initialState: State = { data: "", count: 0 };

export async function myget(url: string): Promise<any> {
  return await fetch(url).then(res => res.json())
}

function App() {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    myget("/api").then(data => setState(prev => ({ ...prev, data })));
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
