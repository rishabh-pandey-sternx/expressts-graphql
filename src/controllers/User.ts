/**
 * Define the User API logic
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import * as bcrypt from 'bcrypt';
import { AuthenticationError, UserInputError } from 'apollo-server';
import UserModel from '../models/User';
import { IUser, IUserNull } from '../interfaces/models/User';
import { IRequest, IResponse } from '../interfaces/vendors';
import jwtLib from '../services/JwtLib';

class UserController {
  /**
   * Store The Details Of First Time User
   * @param req
   * @returns {Promise<IUser | Error> }
   */

  public static async register(req: IRequest): Promise<IUser | Error> {
    let response: object = {};
    try {
      const user = await UserModel.findOne({
        email: req.user.email
      });
      if (user) {
        throw new UserInputError(
          'Account with the e-mail address already exists.'
        );
      }
      const newUser = new UserModel({
        email: req.user.email,
        password: req.user.password,
        fullname: req.user.fullname || null,
        deviceId: req.user.deviceId || null,
        gender: req.user.gender || null
      });

      const result = await newUser.save();
      const token = jwtLib.signIn(req.user.email, req.user.password, result.id);
      response = { ...result._doc, token, password: null };
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Logging in Of A Registerd User
   * @param req
   * @returns {Promise<IUser | Error>}
   */

  public static async login(req: IRequest): Promise<IUser | Error> {
    let response: object = {};
    try {
      const user = await UserModel.findOne({ email: req.email });

      if (!user) {
        throw new UserInputError('No user found with this login credentials.');
      }

      const passwordIsValid = await bcrypt.compareSync(
        req.password,
        user.password
      );

      if (!passwordIsValid) {
        throw new AuthenticationError('Invalid password.');
      }

      const token = jwtLib.signIn(user.email, req.password, user.id);
      response = { token, password: null, ...user._doc };
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Get User By Id
   * @param req
   * @returns {Promise<*>}
   */

  public static async getUserById(id): Promise<IUser | Error> {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get All users
   * @param req
   * @returns {Promise<*>}
   */

  public static async getAll(): Promise<[IUser] | IUserNull | Error> {
    try {
      return await UserModel.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Reset Password
   * @param req
   * @returns {any}
   */

  public static resetPassword(req: IRequest, res: IResponse): any {}

  /**
   * Change Password
   * @param req
   * @returns {any}
   */

  public static changePassword(req: IRequest, res: IResponse): any {}

  /**
   * Update The Details Of User
   * @param req
   * @returns {any}
   */
  public static async update(req: IRequest): Promise<IUser | Error> {
    try {
      return await UserModel.findOneAndUpdate(
        { email: req.user.email },
        {
          fullname: req.user.fullname || null,
          deviceId: req.user.deviceId || null,
          gender: req.user.gender || null
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserController;
