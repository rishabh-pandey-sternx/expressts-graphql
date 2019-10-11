/**
 * JWToken Operations
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';

import Locals from '../providers/Locals';
import { IRequest } from '../interfaces/vendors';
import { Request } from 'express';

class JwtLib {
  public static signIn(email, password, id): string {
    return jwt.sign({ email, password, id }, Locals.config().appSecret, {
      expiresIn: Locals.config().jwtExpiresIn
    });
  }

  public static decode(token): object {
    return jwt.decode(token, Locals.config().appSecret, {
      expiresIn: Locals.config().jwtExpiresIn
    });
  }

  public static verify(token): boolean {
    return jwt.verify(token, Locals.config().appSecret);
  }

  public static tokenFromHeaders(req: IRequest | Request): string {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    }

    return '';
  }
}

export default JwtLib;
