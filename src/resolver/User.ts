import UserController from '../controllers/User';

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
  }
};

export default userResolvers;
