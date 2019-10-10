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

  enum CompletedEnum {
    PENDING
    COMPLETED
    IN_PROGRESS
  }
  type Todo {
    id: ID
    title: String!
    completed: CompletedEnum
    owner_id: String!
    collaborater_ids: [ID]
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
  type User {
    id: ID
    email: String!
    fullname: String!
    deviceId: String
    gender: String
  }

  input TodoInput {
    title: String!
    completed: CompletedEnum
    collaborater_ids: [ID]
  }

  type Query {
    dummy(name: String): Greeting
    getUsers: [User]
    todo(id: ID!): Todo
    todos: [Todo]
    personalTodos: [Todo]
    allMyTodos: [Todo]
  }

  type Mutation {
    signUp(user: UserInfo): SingUpResult
    login(email: String!, password: String!): LoginResult
    updateProfile(user: UserInfo): User
    createTodo(input: TodoInput!): Todo
    addCollaborater(id: ID!, collaboraterId: ID!): Todo
    removeCollaborater(id: ID!, collaboraterId: ID!): Todo
    updateTodo(id: ID!, input: TodoInput!): Todo
    deleteTodo(id: ID!): Todo
  }
`;
