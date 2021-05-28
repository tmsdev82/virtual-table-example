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

  export default CoinData