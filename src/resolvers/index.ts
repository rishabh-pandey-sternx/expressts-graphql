import { AuthenticationError } from 'apollo-server';
import UserController from '../controllers/User';

const Resolvers = {
  Mutation: {
    // Logging In A User
    login: async (parent, args, context, info) => {
      await UserController.login(args);
    },
    // Store Details Of New User
    signUp: async (parent, args, context, info) => {
      await UserController.register(args);
    },
    // Update User's Profile
    updateProfile: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Auth Header'
        );
      }
      return await UserController.update(args);
    },
    // create new todo
    createTodo: (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Auth Header'
        );
      }
    },
    // add collaborater to already created todo
    addCollaborater: (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Auth Header'
        );
      }
    },
    // remove collaborater from todo list
    removeCollaborater: (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }
    },
    // updates the todo title and completed status
    updateTodo: (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }
    },

    // delete  todo
    deleteTodo: (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }
    }
  },
  Query: {
    dummy: (parent, args, context, info) => {
      console.log(context.user, 'context');
      return { name: args.name, age: 23, profession: 'Dev', text: 'Hello' };
    },
    // gets the complete users on the platform
    getUsers: (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Auth Header'
        );
      }
    },
    // gets single todo deatils
    todo: (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Auth Header'
        );
      }
    },
    // gets all todos on the platform
    todos: (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Auth Header'
        );
      }
    },
    // gets all todos created by authenticated  user
    personalTodos: (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Auth Header'
        );
      }
    },
    // gets all todos of the authenticated  user
    allMyTodos: (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Auth Header'
        );
      }
    }
  }
};

export default Resolvers;
