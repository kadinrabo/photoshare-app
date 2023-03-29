import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8080/');
      const json = await response.text();
      setData(json);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {data ? (data) : (<p>Loading data...</p>)}
    </div>
  );
}

export default App;
