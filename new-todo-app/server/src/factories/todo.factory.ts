import { define } from 'typeorm-seeding';
import { Todo } from '../entities/todo.entity';

define(Todo, (faker) => {
  const title = faker.lorem.text();

  const todo = new Todo();
  todo.title = title;
  return todo;
});
