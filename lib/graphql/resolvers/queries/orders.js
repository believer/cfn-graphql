const subtractMonths = require('date-fns/sub_months')
const format = require('date-fns/format')
const { compileOrders } = require('../../../services/orders')

module.exports = async (
  _,
  { fromDate, orderBy, productType, toDate },
  { brp, token }
) => {
  try {
    const fromdate = fromDate
      ? fromDate
      : format(subtractMonths(new Date(), 1), 'YYYY-MM-DD')
    const todate = toDate ? toDate : format(new Date(), 'YYYY-MM-DD')

    const options = {
      fromdate,
      todate,
    }

    const { orders } = await brp('orders.json', options, token)

    return compileOrders(orders, orderBy, productType)
  } catch (e) {
    throw new Error(e)
  }
}
