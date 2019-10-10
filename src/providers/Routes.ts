/**
 * Define all your routes
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import Locals from './Locals';
import Log from '../middlewares/Log';
import typeDefs = require('../schemas/schema');

import apiRouter from './../routes/Api';
// import graphQLRouter from './../routes/GraphQL';

class Routes {
  public mountApi(_express: Application): Application {
    const apiPrefix = Locals.config().apiPrefix;
    Log.info('Routes :: Mounting API Routes...');

    return _express.use(`/${apiPrefix}`, apiRouter);
  }

  public mount() {
    const server = new ApolloServer({
      typeDefs,
      resolvers: {
        Query: {
          greeting: (_, { name }) => ({
            name,
            age: 99,
            profession: 'Software Engineer',
            text: 'How are you today?'
          })
        }
      }
    });

    return server;
  }
}

export default new Routes();
