const { makeExecutableSchema } = require('graphql-tools')
const reqdir = require('require-dir')
const Query = reqdir('./resolvers/queries')
const Mutation = reqdir('./resolvers/mutations')

const typeDefs = `
  type Participant {
    firstname: String!
    fullname: String!
    lastname: String!
    id: Int
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
    date: String!
    id: Float!
    location: String!
    name: String!
    participants: [Participant!]!
    slots: Slots
    time: String!
    timestamp: Int!
    wod: WOD!
  }

  type OrderItem {
    endTime: String!
    id: Int!
    name: String!
    price: Int!
    productType: PRODUCT_TYPE!
    startTime: String!
  }

  type Order {
    createdAt: String!
    id: Int!
    items: [OrderItem]!
    sum: Int!
  }

  enum WOD {
    DAGENS
    PERFORMANCE
    FITNESS
    HELG
    MASTODONT
    TRYOUT
  } 

  enum SORT_ORDER {
    DATE_ASC
    DATE_DESC
  }

  enum PRODUCT_TYPE {
    Class
    Item
    Subscription
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    activities(startDate: String, endDate: String, productIds: [Int], orderBy: SORT_ORDER = DATE_ASC
    ): [Activity!]!
    myActivities(orderBy: SORT_ORDER = DATE_ASC): [Activity!]!
    orders(orderBy: SORT_ORDER = DATE_DESC, productType: PRODUCT_TYPE = Class, fromDate: String, toDate: String): [Order!]!
  }

  type Mutation {
    login(input: LoginInput!): String!
  }
`

const resolvers = {
  Query,
  Mutation,
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
