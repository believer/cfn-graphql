const fetch = require('node-fetch')
const nconf = require('nconf')

nconf
  .argv()
  .env()
  .file({ file: 'config.json' })

const serialize = options =>
  Object.keys(options)
    .filter(Boolean)
    .map(k => {
      if (!options[k]) {
        return false
      }

      return `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`
    })
    .filter(Boolean)
    .join('&')

const getData = async (route, options, token) => {
  if (!token) {
    throw new Error('Unauthorized')
  }

  const base = 'http://brp3.netono.se/crossfitbrponline/api/ver2/'

  options = Object.assign({}, options, {
    apikey: nconf.get('apikey'),
    businessunitids: '1',
  })

  const query = serialize(options)

  const response = await fetch(`${base}${route}?${query}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    method: 'GET',
  })

  return response.json()
}

module.exports = getData
