import React, { useState } from "react";
import "./App.css";
import {format} from "date-fns";

const ws = new WebSocket("ws://127.0.0.1:5555");

class CoinData {
  id: string;
  name: string;
  value: number;
  exchange: string;
  volume: number;
  bid: number;
  ask: number;
  amount: number;
  high: number;
  low: number;
  average_hourly_value: number;
  last_update: Date;

  constructor(
    id: string,
    name: string,
    value: number,
    exchange: string,
    volume: number,
    bid: number,
    ask: number,
    amount: number,
    high: number,
    low: number,
    average_hourly_value: number,
    last_update: Date
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.exchange = exchange;
    this.volume = volume;
    this.bid = bid;
    this.ask = ask;
    this.amount = amount;
    this.high = high;
    this.low = low;
    this.average_hourly_value = average_hourly_value;
    this.last_update = new Date(last_update);
  }
}

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

  function getVolumeClass(volume: number) {
    if(volume > 500){
      return "volume-high";
    }else if(volume < 200) {
      return "volume-low"
    }

    return "";
  }

  function displayCoinData() {
    return (
      <div className="coin-data-container">
        <table>
          <thead>
            <tr>
              <th>exchange</th>
              <th>coin</th>
              <th>value</th>
              <th>bid</th>
              <th>ask</th>
              <th>amount</th>
              <th>high</th>
              <th>low</th>
              <th>average hourly value</th>
              <th>volume</th>
              <th>last update</th>
            </tr>
          </thead>
          <tbody>
            {coinData.map((coin) => {
              return (
                <tr className={"coin-row"} key={coin.id}>
                  <td>{coin.exchange}</td>
                  <td>{coin.name}</td>
                  <td>{coin.value}</td>
                  <td>{coin.bid}</td>
                  <td>{coin.ask}</td>
                  <td>{coin.amount}</td>
                  <td>{coin.high}</td>
                  <td>{coin.low}</td>
                  <td>{coin.average_hourly_value}</td>
                  <td className={getVolumeClass(coin.volume)}>{coin.volume}</td>
                  <td >{format(coin.last_update, "dd-MM-yyyy HH:mm:ss")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="App">
      <div>{myCount}</div>
      <div>
        <button onClick={upCount}>Up count</button>
      </div>
      <div>
        {coinData && coinData.length > 0 ? displayCoinData() : noData()}
      </div>
    </div>
  );
}

export default App;
