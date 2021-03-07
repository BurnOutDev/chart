import { HubConnectionBuilder } from '@aspnet/signalr'
import axios from 'axios'

const connection = new HubConnectionBuilder()
  .withUrl('http://localhost:5000/kline', {
    accessTokenFactory: () =>
      axios
        .post('https://localhost:5001/accounts/authenticate', {
          email: 'user@email.com',
          password: 'password'
        })
        .then((result) => result.data.accessToken)
  })
  .build()

export { connection }

function fu() {
Promise.reject().then((state) => {
  debugger;
  connection.invoke(
    'GetKline',
    'btcusdt',
    '1m',
    'from',
    'to'
  ).then(data => {
    console.log(data)
    debugger;
  })
})

Promise.reject().then(() => connection.on(`btcusdt_1m_Get`, (s) => {
  var data = s.message;
  var key = data.klineItems.klineStartTime;
  const h = parseFloat(data.klineItems.highPrice);
  const l = parseFloat(data.klineItems.lowPrice);
  const c = parseFloat(data.klineItems.closePrice);
  const q = parseFloat(data.klineItems.quoteAssetsVolume);
  const o = parseFloat(data.klineItems.openPrice);
  const v = parseFloat(data.klineItems.baseAssetVolume);
  
  [].push({
    symbol: data.klineItems.symbol,
    startTime: key,
    high: h,
    close: c,
    low: l,
    lastTime: data.klineItems.klineCloseTime,
    open: o,
    volume: v,
    interval: data.klineItems.interval,
    quoteAssetsVolume: q,
    numberOfTrades: data.klineItems.numberOfTrades,
  })

  console.log([].length)
}));
}