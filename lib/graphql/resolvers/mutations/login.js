module.exports = async (
  _,
  { input },
) => {
  try {
    const { username, password } = input

    return new Buffer(`${username}:${password}`).toString('base64')
  } catch (e) {
    throw new Error(e)
  }
}
