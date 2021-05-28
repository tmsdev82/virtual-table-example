import React, { useState } from "react";
import "./App.css";
import {format} from "date-fns";
import CoinData from "./classes/CoinData";
import CoinTable from "./components/CoinTable"

const ws = new WebSocket("ws://127.0.0.1:5555");

function App() {
  const [myCount, setCount] = useState<number>(0);
  const [coinData, setCoinData] = useState<CoinData[]>([]);

  ws.onopen = () => {
    console.log("Opened Connection!");
  };

  ws.onmessage = (event) => {
    // let my_data = JSON.parse(event.data);
    if (event.data) {
      // console.log(event.data);
      let parsedData = JSON.parse(event.data);
      // if(!Array.isArray(parsedData)) return;

      console.log("updating coinData");
      // console.log(parsedData[0]);

      // const mappedData = parsedData.map((data) => {
      //   return new CoinData(data.name, data.value);
      // });
      const mappedData: Array<CoinData> = parsedData.map((c: CoinData) => {
        return new CoinData(
          c.id,
          c.name,
          c.value,
          c.exchange,
          c.volume,
          c.bid,
          c.ask,
          c.amount,
          c.high,
          c.low,
          c.average_hourly_value,
          c.last_update
        );
      });
      // for(let i=0; i<parsedData.length; i++){
      //   // console.log(event.data[i].name);
      //   mappedData.push(new CoinData(parsedData[i].id ,parsedData[i].name, parsedData[i].value, parsedData[i].exchange));
      // }

      setCoinData(mappedData);
    }
  };

  function upCount() {
    setCount(myCount + 1);
  }

  function noData() {
    return <div style={{ color: "red" }}>No data to display.</div>;
  }  

  return (
    <div className="App">
      <div>{myCount}</div>
      <div>
        <button onClick={upCount}>Up count</button>
      </div>
      <div>
        {coinData && coinData.length > 0 ? <CoinTable coinData={coinData}></CoinTable> : noData()}
      </div>
    </div>
  );
}

export default App;
