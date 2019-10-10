import UserController from '../controllers/User';
import { Query } from '@google-cloud/firestore';

const userResolvers = {
  Mutation: {
    // Logging In A User
    login: async (parent, args, context, info) => {
      const user = await UserController.login(args);
      return user;
    },
    // Store Details Of New User
    signUp: async (parent, args, context, info) => {
      const value = await UserController.register(args);
      return value;
    }
    // Update User's Profilexw
    // updateProfile: UserController.update
  },
  Query: {
    dummy: (parent, args, context, info) => {
      return { name: args.name, age: 23, profession: 'Dev', text: 'Hello' };
    }
  }
};

export default userResolvers;
