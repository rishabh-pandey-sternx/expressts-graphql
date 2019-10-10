/**
 * Define interface for User Model
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

export interface IUser {
  email: string;
  password?: string;
  token?: string;
  fullname: string;
  gender: string;
}
export interface IUserNull {}

export default IUser;
