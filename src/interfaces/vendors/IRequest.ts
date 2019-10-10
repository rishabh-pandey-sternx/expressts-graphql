/**
 * Defines Custom method types over Express's Request
 *
 * @author Faiz A. Farooqui <faiz@geeekyants.com>
 */

import { Request } from 'express';

export interface IRequest extends Request {
  user?: object;
  todo?: object;
}
