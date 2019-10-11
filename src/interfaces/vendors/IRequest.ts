/**
 * Defines Custom method types over Express's Request
 *
 * @author Faiz A. Farooqui <faiz@geeekyants.com>
 */

import { Request } from 'express';
import { ITodo } from '../models/Todo';
import { IUser } from '../models/User';

export interface IRequest extends Request {
  user: IUser;
  todo: ITodo;
  email: string;
  input: string;
  updated_by: string;
  id: string;
  password: string;
  collaboraterId: string;
}
