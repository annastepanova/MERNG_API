const gql = require('graphql-tag') // import A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST

// Define schema's types
module.exports = gql`
  type User {
    id: ID!,
    username: String!,
    name: String!,
    email: String!,
    token: String!
  }

  input RegisterInput {
    name: String!,
    username: String!,
    email: String!,
    password: String!,
    confirmPassword: String!
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`
