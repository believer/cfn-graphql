const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./graphql/schema')
const compression = require('compression')
const brp = require('./adapters/brp')
const nconf = require('nconf')

nconf
  .argv()
  .env()
  .file({ file: 'config.json' })

const PORT = nconf.get('port') || 3000

const app = express()

app.use(cors())
app.use(compression())

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => {
    return {
      schema,
      context: {
        brp,
        token: req.header('authorization'),
      },
    }
  })
)

app.get(
  '/graphiql',
  graphiqlExpress({ endpointURL: '/graphql', editorTheme: 'mdn-like' })
)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
