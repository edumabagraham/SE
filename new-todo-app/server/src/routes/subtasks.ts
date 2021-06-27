import { getConnection } from 'typeorm';
import { Router } from 'express';
import { NotFound } from 'http-errors';
import { validateAddSubtaskInput, validateUpdateInput } from '../validations';
import { Subtask } from '../entities/subtask.entity';
import { Todo } from '../entities/todo.entity';
import { Status } from '../entities/common';

const router = Router();

// create a new subtask
router.post('/', async (req, res, next) => {
  try {
    await validateAddSubtaskInput(req.body);

    const todo = await getConnection().getRepository(Todo).findOne(req.body.todo_id);

    if (!todo) {
      throw new NotFound('Specified todo not found');
    }

    const data = new Subtask();
    data.title = req.body.title;
    data.todo = todo;

    const subtask = await getConnection().getRepository(Subtask).save(data);
    // make parent todo pending
    await getConnection().getRepository(Todo).update(todo.id, { status: Status.pending });

    res.status(201).json({ data: subtask });
  } catch (error) {
    next(error);
  }
});

// update a subtask
router.patch('/:id', async (req, res, next) => {
  try {
    await validateUpdateInput(req.body);

    const subtask = await getConnection()
      .getRepository(Subtask)
      .findOne(req.params.id, { relations: ['todo'] });
    if (!subtask) {
      throw new NotFound('Subtask with given id was not found');
    }

    // update todo's status
    subtask.status = req.body.status === 'pending' ? 0 : 1;
    await getConnection().getRepository(Subtask).update(subtask.id, { status: subtask.status });

    // if subtask is pending, mark parent todo as pending
    if (subtask.status === Status.pending) {
      await getConnection().getRepository(Todo).update(subtask.todo.id, { status: Status.pending });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default { path: '/subtasks', router };
