/**
 * Define all your routes
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import Locals from './Locals';
import Log from '../middlewares/Log';
import schema from '../schemas/PublicSchema';

import apiRouter from './../routes/Api';
import publicUserResolvers from '../resolvers/PublicResolver';
import userResolvers from '../resolvers/User';

class Routes {
  public mountApi(_express: Application): Application {
    const apiPrefix = Locals.config().apiPrefix;
    Log.info('Routes :: Mounting API Routes...');

    return _express.use(`/${apiPrefix}`, apiRouter);
  }

  public mount(): Application {
    const server = new ApolloServer({
      introspection: true,
      playground: true,
      typeDefs: schema,
      resolvers: userResolvers,
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
      }
    });

    return server;
  }
}

export default new Routes();
