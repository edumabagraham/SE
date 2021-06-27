import { define, factory } from 'typeorm-seeding';
import { Subtask } from '../entities/subtask.entity';
import { Todo } from '../entities/todo.entity';

define(Subtask, (faker) => {
  const title = faker.lorem.text();

  const subtask = new Subtask();
  subtask.title = title;
  subtask.todo = factory(Todo)() as any;

  return subtask;
});
