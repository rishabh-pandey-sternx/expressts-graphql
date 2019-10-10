import { buildSchema } from 'graphql';
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
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type SingUpResult {
    email: String!
    fullname: String!
    deviceId: String
    gender: String
    website: String
    profile_url: String
    token: String!
  }

  type LoginResult {
    email: String!
    fullname: String!
    deviceId: String
    gender: String
    website: String
    profile_url: String
    token: String
  }

  type Greeting {
    name: String
    age: Int
    profession: String
    text: String
  }

  extend type Query {
    dummy(name: String): Greeting
  }

  extend type Mutation {
    signUp(user: UserInfo): SingUpResult
    login(email: String!, password: String!): LoginResult
  }
`;
