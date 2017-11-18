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

    return compileMyActivities(activitybookings)
  } catch (e) {
    throw new Error(e)
  }
}
