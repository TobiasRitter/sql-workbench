import { useEffect, useState } from 'react';
import './App.css';
import { fetchApi, increment, State } from './State';

const initialState: State = { data: "", count: 0 };

function App() {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    fetchApi().then(data => setState(prev => ({ ...prev, data })));
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
