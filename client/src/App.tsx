import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    fetch('http://localhost:8000/api').then(res => res.json()).then(data => {
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
