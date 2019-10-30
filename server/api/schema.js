const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  type Item {
    id: ID!
    title: String!
    imageurl: String
    itemowner: User!
    description: String!
    tags: [Tag]
    created: Date
    borrower: User
  }

  type User {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  input AssignedTag {
    id: ID!
    title: String!
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    imageurl: String
    tags: [AssignedTag]
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    fullname: String!
    email: String!
    password: String!
  }

  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    signup(user: SignUpInput): AuthPayload!
    login(user: LoginInput): AuthPayload!
    logout: Boolean!
    addItem(input: NewItemInput!): Item
  }
`;
