const format = require('date-fns/format')
const addDays = require('date-fns/add_days')
const compileActivities = require('../../../services/activities')

module.exports = async (_, {}, { brp }) => {
  try {
    const startdate = format(new Date(), 'YYYY-MM-DD')
    const enddate = format(addDays(startdate, 7), 'YYYY-MM-DD')

    const { activities } = await brp('activities.json', {
      startdate,
      enddate,
      includebooking: true,
    })

    return compileActivities(activities).filter(activity => activity.booked)
  } catch (e) {
    throw new Error(e)
  }
}
