import CoinData from "../classes/CoinData";
import "./CoinTable.css";
import { format } from "date-fns";
import { Table, Column } from "react-virtualized";

type CointTableProps = {
  coinData: CoinData[];
};

function CoinVirtualTable(props: CointTableProps) {

  function getVolumeClass(volume: number) {
    if (volume > 500) {
      return "volume-high";
    } else if (volume < 200) {
      return "volume-low";
    }
    return "";
  }

  return (
    <div className="container">
        
      <Table
        rowClassName="table-row"
        headerHeight={40}
        width={1000}
        height={800}
        rowHeight={30}
        rowCount={props.coinData.length}
        rowGetter={({ index }) => props.coinData[index]}
      >
        
        <Column label="exchange" dataKey="exchange" width={80} />
        <Column label="coin" dataKey="name" width={80} />
        <Column label="value" dataKey="value" width={80} />
        <Column label="bid" dataKey="bid" width={80} />
        <Column label="ask" dataKey="ask" width={80} />
        <Column label="amount" dataKey="amount" width={80} />
        <Column label="high" dataKey="high" width={80} />
        <Column label="low" dataKey="low" width={80} />
        <Column label="average hourly value" dataKey="average_hourly_value" width={60} />
        <Column label="volume" dataKey="volume" width={80} cellRenderer={({cellData}) => { return <span className={getVolumeClass(cellData)}>{cellData}</span>}} />
        <Column label="last update" dataKey="last_update" width={180} cellRenderer={({cellData}) => format(cellData, "dd-MM-yyyy HH:mm:ss")} />
      </Table>
    </div>
  );
}

export default CoinVirtualTable;
