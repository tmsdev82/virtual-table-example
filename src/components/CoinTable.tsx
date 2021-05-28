import CoinData from "../classes/CoinData";
import "./CoinTable.css";
import {format} from "date-fns";

type CointTableProps = {
    coinData: CoinData[]
}

function CoinTable(props: CointTableProps) {

    function getVolumeClass(volume: number) {
        if(volume > 500){
            return "volume-high";
        }else if(volume < 200) {
            return "volume-low"
        }

        return "";
    }
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
            {props.coinData.map((coin) => {
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

export default CoinTable