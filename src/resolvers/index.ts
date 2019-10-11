import { AuthenticationError } from 'apollo-server';
import UserController from '../controllers/User';
import TodoController from '../controllers/Todo';
import { argsToArgsConfig } from 'graphql/type/definition';

const Resolvers = {
  Mutation: {
    // Logging In A User
    login: async (parent, args, context, info) => {
      const value = UserController.login(args);
      console.log(value, 'value');
      return value;
    },
    // Store Details Of New User
    signUp: async (parent, args, context, info) => {
      await UserController.register(args);
    },
    // Update User's Profile
    updateProfile: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Authorization Token'
        );
      }
      return await UserController.update(args);
    },
    // create new todo
    createTodo: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Authorization Token'
        );
      }
      args.input['owner_id'] = context.user.id;

      const created = await TodoController.create(args);
      return created;
    },
    // add collaborater to already created todo
    addCollaborater: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Authorization Token'
        );
      }
      args.input['updated_by'] = context.user.id;
      return await TodoController.addUser(args);
    },
    // remove collaborater from todo list
    removeCollaborater: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }
      args.input['updated_by'] = context.user.id;
      return await TodoController.removeUser(args);
    },
    // updates the todo title and completed status
    updateTodo: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }
      args.input['updated_by'] = context.user.id;
      return await TodoController.update(args);
    },

    // delete  todo
    deleteTodo: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }
      args.input['updated_by'] = context.user.id;
      return await TodoController.delete(args);
    }
  },
  Query: {
    dummy: (parent, args, context, info) => {
      return { name: args.name, age: 23, profession: 'Dev', text: 'Hello' };
    },
    // gets the complete users on the platform
    getUsers: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Authorization Token'
        );
      }
      return await UserController.getAll();
    },
    // gets single todo deatils
    todo: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Authorization Token'
        );
      }
      await TodoController.getOne(args);
    },
    // gets all todos on the platform
    todos: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Authorization Token'
        );
      }
      return await TodoController.getAll();
    },
    // gets all todos created by authenticated  user
    personalTodos: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Authorization Token'
        );
      }
      await TodoController.getMine(args);
    },
    // gets all todos of the authenticated  user
    allMyTodos: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(
          'Not Authenticated Please Provide Authorization Token'
        );
      }
      await TodoController.getAllMine(args);
    }
  }
};

export default Resolvers;
