import { AuthenticationError } from 'apollo-server';
import UserController from '../controllers/User';

const userResolvers = {
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
        throw new AuthenticationError('Not Authenticated');
      }
      return await UserController.update(args);
    }
  },
  Query: {
    dummy: (parent, args, context, info) => {
      console.log(context.user, 'context');
      return { name: args.name, age: 23, profession: 'Dev', text: 'Hello' };
    }
  }
};

export default userResolvers;
