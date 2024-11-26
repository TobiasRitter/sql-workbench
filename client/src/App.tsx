import { useEffect, useState } from 'react';
import './App.css';

type Option = {
  id: number;
  name: string;
}

const opt = { id: 1, name: "test", age: 25 } as Option;

function App() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    fetch('/api').then(res => res.json()).then(data => {
      console.log(data);
      setData(data);
    });
  }, []);

  return (
    <div className="App">
      {data ? <h1>{data}</h1> : <h1>Loading...</h1>}
    </div >
  );
}

export default App;
