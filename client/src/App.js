import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  // data = null
  // setData is a function to update data
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8080/');
      const json = await response.json();
      setData(json);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {data ? (
        <div>{JSON.stringify(data)}</div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
