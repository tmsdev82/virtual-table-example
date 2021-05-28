import React, { useState } from "react";
import "./App.css";
import { format } from "date-fns";
import CoinData from "./classes/CoinData";
import CoinTable from "./components/CoinTable";
import CoinVirtualTable from "./components/CoinVirtualTable";

const ws = new WebSocket("ws://127.0.0.1:5555");

function App() {
  const [virtualTableRender, setVirtualTableRender] = useState<boolean>(false);
  const [coinData, setCoinData] = useState<CoinData[]>([]);

  ws.onopen = () => {
    console.log("Opened Connection!");
  };

  ws.onmessage = (event) => {
    // let my_data = JSON.parse(event.data);
    if (event.data) {
      // console.log(event.data);
      let parsedData = JSON.parse(event.data);
      console.log("updating coinData");

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

  function toggleRenderType() {
    setVirtualTableRender(!virtualTableRender);
  }

  function renderTable() {
    return (
      <div>
        {virtualTableRender ? (
          <CoinVirtualTable coinData={coinData} />
        ) : (
          <CoinTable coinData={coinData}></CoinTable>
        )}
      </div>
    );
  }

  function noData() {
    return <div style={{ color: "red" }}>No data to display.</div>;
  }

  return (
    <div className="App">
      <div className="actions">
        <div>
          <button onClick={toggleRenderType}>toggle render type</button>
        </div>
        <div>
          Render type: {virtualTableRender ? "Virtual Table" : "Normal Table"}
        </div>
      </div>
      <div>
        {coinData && coinData.length > 0 ? renderTable() : noData()}
        {/* <CoinVirtualTable coinData={coinData}/> */}
      </div>
    </div>
  );
}

export default App;
