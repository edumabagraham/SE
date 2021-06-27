import { Express, Router } from 'express';
import todos from './todos';
import subtasks from './subtasks';

export interface Endpoint {
  path: string;
  router: Router;
}

const endpoints: Endpoint[] = [todos, subtasks];

export default function createAPI(app: Express) {
  endpoints.forEach((endpoint) => {
    app.use(`/api${endpoint.path}`, endpoint.router);
  });
}
