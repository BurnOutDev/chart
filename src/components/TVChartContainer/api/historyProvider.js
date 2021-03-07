import { HubConnectionState } from '@aspnet/signalr'
import moment from 'moment'
import { connection } from '../../../connection'
import pairs from './pairs'
import stream from './stream'
var rp = require('request-promise').defaults({ json: true })
const api_root = 'https://min-api.cryptocompare.com'
const history = {}

export default {
  history: history,

  getBars: function (symbolInfo, resolution, from, to, first, limit) {
    return new Promise((resolve) => setTimeout(() => resolve(), 3000)).then(
      () =>
        connection
          .invoke(
            'GetKline',
            'btcusdt',
            '1m',
            moment
              .utc(from * 1000)
              .toDate()
              .getTime(),
            moment
              .utc(to * 1000)
              .toDate()
              .getTime()
          )
          .then((data) => {
            return data.map((d) => ({
              time: d.openTime * 1000, //TradingView requires bar time in ms
              low: d.low,
              high: d.high,
              open: d.open,
              close: d.close,
              volume: d.volumefrom
            }))
          })
    )
  }
}
