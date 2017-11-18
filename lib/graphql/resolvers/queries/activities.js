const { compileActivities } = require('../../../services/activities')

module.exports = async (
  _,
  { startDate, endDate, productIds, orderBy },
  { brp, token }
) => {
  try {
    const options = {
      enddate: endDate,
      startdate: startDate,
      productids: productIds,
      includebooking: true,
    }
    const { activities } = await brp('activities.json', options, token)

    return compileActivities(activities, orderBy)
  } catch (e) {
    throw new Error(e)
  }
}
