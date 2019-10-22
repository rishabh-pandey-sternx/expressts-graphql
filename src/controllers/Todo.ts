/**
 * Define the Todo API logic
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import mongoose from 'mongoose';
import TodoModel from '../models/Todo';
import { IRequest } from '../interfaces/vendors';
import { ITodo, ITodoNull } from './../interfaces/models/Todo';
import Notification from './Notify';

class TodoController {
  /**
   * Create A New Task
   * @param req
   * @returns {Promise<ITodo | Error> }
   */

  public static async create(req: IRequest): Promise<ITodo | Error> {
    try {
      return await TodoModel.create(req.input);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Update Existing Task Based On Its Id
   * @param req
   * @returns {Promise<ITodo | Error>}
   */

  public static async update(req: IRequest): Promise<ITodo | Error> {
    try {
      Notification.notifyUsers(req, 'Edited');
      return await TodoModel.findByIdAndUpdate(req.id, req.input);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Update Existing Task Based On Its Id
   * @param req
   * @returns {Promise<ITodo | Error>}
   */

  public static async delete(req: IRequest): Promise<ITodo | Error> {
    try {
      Notification.notifyUsers(req, 'Deleted');
      return await TodoModel.findByIdAndRemove({ _id: req.id });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get All Tasks
   * @param req
   * @returns {Promise<[ITodo] | ITodoNull | Error>}
   */

  public static async getAll(): Promise<[ITodo] | ITodoNull | Error> {
    try {
      return await TodoModel.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get One Task Based On Its Id
   * @param req
   * @returns {Promise<ITodo | Error>}
   */

  public static async getOne(req: IRequest): Promise<ITodo | Error> {
    try {
      const todo = await TodoModel.findById(mongoose.Types.ObjectId(req.id));
      return todo;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get User's Owned Tasks
   * @param req
   * @returns {Promise<[ITodo] | ITodoNull | Error>}
   */

  public static async getMine(
    req: IRequest
  ): Promise<[ITodo] | ITodoNull | Error> {
    try {
      const getMine = await TodoModel.find({
        owner_id: mongoose.Types.ObjectId(req.id)
      });
      return getMine;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get User's Colloborated Tasks
   * @param req
   * @returns {Promise<[ITodo] | ITodoNull | Error>}
   */

  public static async getAllMine(
    req: IRequest
  ): Promise<[ITodo] | ITodoNull | Error> {
    try {
      return await TodoModel.find({
        $or: [{ owner_id: req.id }, { collaborater_ids: req.id }]
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Add User As Collaborater in A Task
   * @param req
   * @returns {Promise<ITodo | Error>}
   */

  public static async addUser(req: IRequest): Promise<ITodo | Error> {
    try {
      Notification.notifyUsers(req, 'Updated');
      return await TodoModel.findByIdAndUpdate(req.id, {
        $push: { collaborater_ids: req.collaboraterId }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Remove User From A Colloborated Tasks
   * @param req
   * @returns {Promise<ITodo | Error> }
   */

  public static async removeUser(req: IRequest): Promise<ITodo | Error> {
    try {
      Notification.notifyUsers(req, 'Updated');
      return await TodoModel.findByIdAndUpdate(req.id, {
        $pull: { collaborater_ids: req.collaboraterId }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default TodoController;
