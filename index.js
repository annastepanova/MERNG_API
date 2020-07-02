if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag') // import A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST
const mongoose = require('mongoose')


// Define schema's types
const typeDefs = gql `   
  type Query {
    sayHello: String!
  }
`

const resolvers = {
  Query: {
    sayHello: () => 'Hello World'
  }

}

// setting up Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers
})


const port = process.env.PORT || 5000

// connecting to MongoDB database
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-xdon8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    server.listen(port, () => { console.log(`API listening on ${port}`) })
  })
  .catch(err => {
    console.log(err)
  })

