/**
 * Define User model
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

import { Typegoose, prop, staticMethod, pre } from '@typegoose/typegoose';

export interface Credentials {
  email: string;
  password: string;
}

@pre<UserType>('save', function(next: CallableFunction) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = UserType.encodePassword(this.password);
  next();
})
export class UserType extends Typegoose implements Credentials {
  @prop({ required: true, select: true })
  password!: string; // do not expose password as public GraphQL field

  @prop({ required: true, index: true, unique: true })
  email!: string;

  @prop({ default: null })
  fullname: string;

  @prop({ default: 'Male' })
  gender: string;

  @prop({ default: null })
  deviceId: string;

  @prop({ required: true, default: Date.now })
  created_at!: Date;

  /**
   * Searches for `User` with the given `email` and `password`. Password is
   * automatically encoded before being propagated to the mongoose.
   *
   * @param email Target user email.
   * @param password Raw target user password.
   *
   */
  @staticMethod
  static findByCredentials({ email, password }: Credentials) {
    return UserModel.findOne({
      email,
      password: this.encodePassword(password)
    });
  }

  /**
   * Returns a hash-encoded representation of password to store in the database.
   * @param password Real password to be encoded.
   */
  @staticMethod
  public static encodePassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }
}

export const UserModel = new UserType().getModelForClass(UserType, {
  existingMongoose: mongoose,
  schemaOptions: { collection: 'Users' }
});

export default UserModel;
