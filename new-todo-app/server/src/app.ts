import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import createAPI from './routes';
import { handle404, renderError } from './errors';

export default function bootstrapApp(): express.Express {
  const app = express();

  // setup cross-origin-resource-header sharing
  app.use(cors());

  // setup logger
  app.use(logger('dev'));

  // parse incoming request data
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // create api routes
  createAPI(app);

  app.use(handle404);
  app.use(renderError);

  return app;
}
