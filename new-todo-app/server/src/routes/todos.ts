import { Router } from 'express';
import { getConnection } from 'typeorm';
import { NotFound } from 'http-errors';
import { Todo } from '../entities/todo.entity';
import { validateAddTodoInput, validateUpdateInput } from '../validations';
import { Status } from '../entities/common';
import { Subtask } from '../entities/subtask.entity';

const router = Router();

// retrieve all todos
router.get('/', async (_, res, next) => {
  try {
    const todos = await getConnection()
      .getRepository(Todo)
      .find({ relations: ['subtasks'], order: { title: 'ASC' } });
    res.json({ data: todos });
  } catch (error) {
    next(error);
  }
});

// create a new todo
router.post('/', async (req, res, next) => {
  try {
    await validateAddTodoInput(req.body);

    const data = new Todo();
    data.title = req.body.title;

    const todo = await getConnection().getRepository(Todo).save(data);
    res.status(201).json({ data: todo });
  } catch (error) {
    next(error);
  }  
});

router.patch('/:id', async (req, res, next) => {
  try {
    await validateUpdateInput(req.body);

    const todo = await getConnection()
      .getRepository(Todo)
      .findOne(req.params.id, { relations: ['subtasks'] });
    if (!todo) {
      throw new NotFound('Todo with given id was not found');
    }

    // update todo's status
    todo.status = req.body.status === 'pending' ? 0 : 1;
    await getConnection().getRepository(Todo).update(todo.id, { status: todo.status });

    // if status === completed, update all subtasks status to completed
    if (todo.status === Status.completed) {
      await Promise.all(
        todo.subtasks.map(async (subtask) => {
          await getConnection()
            .getRepository(Subtask)
            .update(subtask.id, { status: Status.completed });
        })
      );
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default { path: '/todos', router };
