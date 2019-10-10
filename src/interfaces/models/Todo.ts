/**
 * Define interface for Todo Model
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

export enum Completed {
  InProgress = 'IN_PROGRESS',
  Complted = 'COMPLETED',
  Pending = 'PENDING'
}

export interface ITodo {
  title: string;
  completed: Completed;
  owner_id: string;
  collaborater_ids?: [string];
}

export interface ITodoNull {}

export default ITodo;
