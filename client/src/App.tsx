import { useEffect, useState } from 'react';
import './App.css';
import { decrement, increment, reset, State, updateData } from './State';
import Plot from 'react-plotly.js';
import Module from "./main.js";

const initialState: State = { data: "", count: 0 };

export function myget(url: string, callback: (data: any) => void): void {
  fetch(url).then(res => res.json()).then(callback);
}

function App() {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    Module().then((Module: any) => {
      let add = Module.cwrap("add", "number", ["number", "number"]);
      console.log(add(1, 2));
    });

    const params = new URLSearchParams(window.location.search);
    const uid = params.get("uid");

    if (uid) {
      setState(prev => ({ ...prev, uid }));
      myget(`/api/greet/${uid}`, data => setState(prev => updateData(prev, data)));
    }
  }, []);


  return (
    <div className="App">
      {state.data ? <h1>{state.data}</h1> : <h1>Loading...</h1>}
      {state.count}
      <button onClick={() => setState(increment)}>Increment</button>
      <button onClick={() => setState(decrement)}>Decrement</button>
      <button onClick={() => setState(reset)}>Reset</button>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
          { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 1200, height: 800, title: { text: 'A Fancy Plot' } }}
      />
    </div >
  );
}

export default App;
