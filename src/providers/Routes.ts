/**
 * Define all your routes
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import Locals from './Locals';
import Log from '../middlewares/Log';
import schema from '../schemas';

import apiRouter from './../routes/Api';
import JwtLib from '../services/JwtLib';
import { IUser } from '../interfaces/models/User';
import Resolvers from '../resolvers';

class Routes {
  public mountApi(_express: Application): Application {
    const apiPrefix = Locals.config().apiPrefix;
    Log.info('Routes :: Mounting API Routes...');

    return _express.use(`/${apiPrefix}`, apiRouter);
  }

  public mount(): ApolloServer {
    const server = new ApolloServer({
      introspection: true,
      playground: true,
      typeDefs: schema,
      resolvers: Resolvers,
      formatError: error => {
        // remove the internal Mongo error message
        // leave only the important validation error
        const message = error.message
          .replace('MongoValidationError: ', '')
          .replace('Validation error: ', '');

        return {
          ...error,
          message
        };
      },
      context: ({ req }) => {
        const token = JwtLib.tokenFromHeaders(req);
        const user = JwtLib.decode(token);
        return {
          user
        };
      }
    });

    return server;
  }
}

export default new Routes();
