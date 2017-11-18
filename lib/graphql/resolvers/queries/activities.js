const compileActivities = require('../../../services/activities')

module.exports = async (
  _,
  { startDate, endDate, productIds, orderBy },
  { brp }
) => {
  try {
    const { activities } = await brp('activities.json', {
      enddate: endDate,
      startdate: startDate,
      productids: productIds,
      includebooking: true,
    })

    return compileActivities(activities, orderBy)
  } catch (e) {
    throw new Error(e)
  }
}
