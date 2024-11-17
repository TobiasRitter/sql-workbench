import { useEffect, useState } from 'react';
import './App.css';

type Option = {
  id: number;
  name: string;
}

const opt = { id: 1, name: "test", age: 25 } as Option;

function App() {
  const [data, setData] = useState<any>([{}]);

  useEffect(() => {
    fetch('/message').then(res => res.json()).then(data => {
      setData(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      {(typeof data.message === "undefined") ? <h1>Loading...</h1> : <h1>{data.message}</h1>}
    </div >
  );
}

export default App;
