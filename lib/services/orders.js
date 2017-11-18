const format = require('date-fns/format')

const convertPrice = price => {
  return Math.round(price / 100)
}

const getSortOrder = orderBy => {
  switch (orderBy) {
    case 'DATE_DESC':
      return (a, b) => format(b.createdAt, 'X') - format(a.createdAt, 'X')
    case 'DATE_ASC':
      return (a, b) => format(a.createdAt, 'X') - format(b.createdAt, 'X')
  }
}

const standardItem = item => {
  const { end, id, priceincvat, productname, producttype, start } = item

  return {
    endTime: end && end.timepoint ? end.timepoint.datetime : '',
    id: id,
    name: productname,
    price: convertPrice(priceincvat),
    productType: producttype,
    startTime: start && start.timepoint ? start.timepoint.datetime : '',
  }
}

const standardOrder = (order, productType) => {
  return Object.assign(
    {},
    {
      createdAt: order.created,
      id: order.id,
      items: order.items
        .filter(item => item.producttype === productType)
        .map(item => standardItem(item)),
      sum: convertPrice(order.sum),
    }
  )
}

const compileOrders = (orders, orderBy, productType) => {
  return orders
    .map(order => standardOrder(order, productType))
    .filter(order => order.items.length > 0)
    .sort(getSortOrder(orderBy))
}

module.exports = {
  compileOrders,
}
