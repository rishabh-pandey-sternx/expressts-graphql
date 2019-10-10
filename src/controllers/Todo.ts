/**
 * Define the Todo API logic
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import TodoModel from '../models/Todo';
import { IRequest } from '../interfaces/vendors';
import { ITodo, ITodoNull } from './../interfaces/models/Todo';

class TodoController {
  /**
   * Create A New Task
   * @param req
   * @returns {any}
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
      return await TodoModel.findByIdAndUpdate(req.id, req.input);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Update Existing Task Based On Its Id
   * @param req
   * @returns {any}
   */

  public static async delete(req: IRequest): Promise<ITodo | Error> {
    try {
      return await TodoModel.findByIdAndRemove({ _id: req.id });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get All Tasks
   * @param req
   * @returns {any}
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
   * @returns {any}
   */

  public static async getOne(req: IRequest): Promise<ITodo | Error> {
    try {
      return await TodoModel.findById(req.id);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get User's Owned Tasks
   * @param req
   * @returns {any}
   */

  public static async getMine(user): Promise<[ITodo] | ITodoNull | Error> {
    try {
      return await TodoModel.find({ owner_id: user.id });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get User's Colloborated Tasks
   * @param req
   * @returns {any}
   */

  public static async getAllMine(user): Promise<[ITodo] | ITodoNull | Error> {
    try {
      return await TodoModel.find({ collaborater_ids: user.id });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Add User As Collaborater in A Task
   * @param req
   * @returns {any}
   */

  public static async addUser(req: IRequest): Promise<ITodo | Error> {
    try {
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
   * @returns {any}
   */

  public static async removeUser(req: IRequest): Promise<ITodo | Error> {
    try {
      return await TodoModel.findByIdAndUpdate(req.id, {
        $pull: { collaborater_ids: req.collaboraterId }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default TodoController;
