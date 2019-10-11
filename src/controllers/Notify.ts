/**
 * Define the Notification logic
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import UserModel from '../models/User';
import TodoModel from '../models/Todo';
import { IUser, IUserNull } from '../interfaces/models/User';
import { ITodo } from './../interfaces/models/Todo';
import { IRequest } from '../interfaces/vendors';
import TodoController from './Todo';
import Firebase from '../services/FirebaseNotification';

class Notification {
  /**
   * Fetch Notification Details based on ID
   * @param req.id,req.updated_by
   * @returns {Promise<IUser | Error> }
   */
  public static async notifyUsers(req: IRequest, type: string) {
    let todo: ITodo | Error;
    try {
      todo = await TodoController.getOne(req);
    } catch (error) {
      throw new Error(error);
    }

    try {
      let userArray = await this.getNotificationUsers(todo, req.updated_by);
      // let abc: IUserNull[];
      // userArray = userArray ? userArray : abc;
      userArray.forEach(element => {
        const message = {
          to: element.deviceId,
          title: type,
          body: todo['title']
        };
        Firebase.sendNotification(message);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public static async getNotificationUsers(
    req: ITodo | Error,
    updatedBy: string
  ): Promise<IUser[] | IUserNull[]> {
    return new Promise((resolve, reject) => {
      try {
        let userArray: IUser[] | IUserNull[] = [];
        let idArray = req['collaborater_ids'];
        let userModel_errorArray = [];
        if (req['updated_by'] === updatedBy) {
          // Gets User details
          idArray.map(async element => {
            try {
              const user_response = await UserModel.findById({ id: element });
              userArray.push(user_response);
            } catch (err) {
              console.log(
                'getNotificationUsers: idArray: User Model API Error -->',
                err
              );
              userModel_errorArray.push(err);
            }
          });
        }

        if (userModel_errorArray.length) {
          console.log(
            'getNotificationUsers: User Model API Error -->',
            userModel_errorArray
          );
          // Handle error
          return reject('error');
        }

        console.log('getNotificationUsers: userArray -->', userArray);
        const notifyAbleArray = idArray.filter(value => {
          if (value !== updatedBy) {
            return value;
          }
          return false;
        });

        userModel_errorArray = [];
        // Gets user details
        notifyAbleArray.map(async element => {
          try {
            const user_response = await UserModel.findById({ id: element });
            userArray.push(user_response);
          } catch (err) {
            console.log(
              'getNotificationUsers: notifyAbleArray: User Model API Error -->',
              err
            );
            userModel_errorArray.push(err);
          }
        });
        if (userModel_errorArray.length) {
          // Handle error
          return reject('error');
        }
        return resolve(userArray);
      } catch (error) {
        // throw new Error(error);
        return reject(error);
      }
    });
  }
}

export default Notification;
