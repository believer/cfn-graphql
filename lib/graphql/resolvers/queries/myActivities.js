const { compileMyActivities } = require('../../../services/activities')

module.exports = async (_, {}, { brp, token }) => {
  try {
    const options = {
      type: 'ordinary',
    }

    const { activitybookings } = await brp(
      'activitybookings.json',
      options,
      token
    )

    if (activitybookings.length === 0) {
      return []
    }

    return compileMyActivities(activitybookings)
  } catch (e) {
    throw new Error(e)
  }
}
