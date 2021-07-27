import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { createConnection } from 'typeorm';

export const setup = async () => {
  await createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities: ['src/entities/**/*.ts'],
    logging: false,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
  });
};
