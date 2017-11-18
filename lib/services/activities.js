const getTypeOfWorkout = id => {
  switch (id) {
    case 382:
    case 414:
      return 'MASTODONT'
    case 236:
    case 179:
      return 'PERFORMANCE'
    case 232:
      return 'HELG'
    case 313:
      return 'FITNESS'
    case 27:
      return 'TRYOUT'
    default:
      return 'DAGENS'
  }
}

const getSortOrder = orderBy => {
  switch (orderBy) {
    case 'DATE_ASC':
      return (a, b) => a.timestamp - b.timestamp
    case 'DATE_DESC':
      return (a, b) => b.timestamp - a.timestamp
  }
}

const standardActivity = activity => {
  const { end, resources, participants, product, start } = activity

  return Object.assign(
    {},
    {
      booked: !!activity.bookingid,
      cancelled: activity.cancelled,
      coach: resources.find(r => r.type === 'Personal').name,
      id: activity.id,
      endTime: end.timepoint.datetime,
      location: resources.find(r => r.type === 'Lokal').name,
      name: product.name,
      participants: participants.map(p => {
        return Object.assign({}, p, {
          fullname: `${p.firstname} ${p.lastname}`,
          id: p.personid,
        })
      }),
      slots: {
        open: activity.freeslots,
        total: activity.totalslots,
        waiting: activity.waitinglistsize,
      },
      startTime: start.timepoint.datetime,
      timestamp: start.timepoint.timestamp,
      wod: getTypeOfWorkout(product.id),
    }
  )
}

const compileMyActivities = (activitybookings, orderBy) => {
  return activitybookings.activitybooking
    .map(({ activity }) => standardActivity(activity))
    .sort(getSortOrder(orderBy))
}

const compileActivities = (activities, orderBy) => {
  return activities.activity
    .map(activity => standardActivity(activity))
    .sort(getSortOrder(orderBy))
}

module.exports = {
  compileActivities,
  compileMyActivities,
}
