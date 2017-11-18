const { makeExecutableSchema } = require('graphql-tools')
const reqdir = require('require-dir')
const Query = reqdir('./resolvers/queries')

const typeDefs = `
  enum WOD {
    DAGENS
    PERFORMANCE
    FITNESS
    HELG
    MASTODONT
    TRYOUT
  } 

  type Participant {
    firstname: String!
    fullname: String!
    lastname: String!
    id: Int!
  }

  type Slots {
    open: Int!
    total: Int!
    waiting: Int!
  }

  type Activity {
    booked: Boolean!
    cancelled: Boolean!
    coach: String!
    endTime: String!
    id: Float!
    location: String!
    name: String!
    participants: [Participant]!
    slots: Slots
    startTime: String!
    timestamp: Int!
    wod: WOD!
  }

  enum SORT_ORDER {
    DATE_ASC
    DATE_DESC
  }

  type Query {
    activities(startDate: String, endDate: String, productIds: [Int], orderBy: SORT_ORDER = DATE_ASC
    ): [Activity]!
    myActivities(orderBy: SORT_ORDER = DATE_ASC): [Activity]!
  }
`

const resolvers = {
  Query,
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
