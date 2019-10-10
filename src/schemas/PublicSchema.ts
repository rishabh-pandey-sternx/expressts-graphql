import { gql } from 'apollo-server-express';

export default gql`
  input UserInfo {
    id: ID
    password: String!
    email: String!
    fullname: String!
    deviceId: String
    gender: String
  }

  type SingUpResult {
    email: String!
    fullname: String!
    deviceId: String
    gender: String
    token: String!
  }

  type LoginResult {
    email: String!
    fullname: String!
    deviceId: String
    gender: String
    token: String
  }

  type Greeting {
    name: String
    age: Int
    profession: String
    text: String
  }

  type Query {
    dummy(name: String): Greeting
  }

  type Mutation {
    signUp(user: UserInfo): SingUpResult
    login(email: String!, password: String!): LoginResult
  }
`;
