import { setup } from '../config';
import request from 'supertest';
import express from 'express';
import bootstrapApp from '../../src/app';
import { isTypedArray } from 'util/types';

describe('API tests - subtasks', () => {
  let app: express.Express;
  beforeAll(async () => {
    await setup();
    app = bootstrapApp();
    await request(app).post('/api/todos/').send({ title: 'title' });
  });

   it('Should create a subtask and return it if the todo exists', async () => {
    const { status, body } = await request(app).post('/api/subtasks/').send({ title: 'title', todo_id: 1 });
    expect(status).toBe(201);
    expect(body.data.title).toMatch('title');
  });

  it('Should fail if the todo does not exist', async () => {
    const { status, body } = await request(app).post('/api/subtasks/').send({ title: 'title', todo_id: 2 });
    expect(status).toBe(404);
    expect(body.message).toMatch('Specified todo not found');
  });

  it('should update subtask at that id', async () => {
    const { status, body } = await request(app).patch('/api/subtasks/1').send({ status: 'pending' });
    expect(status).toBe(204);
  });

  it('should fail if subtask does not exist', async () => {
    const { status, body } = await request(app).patch('/api/subtasks/2').send({ status: 'pending' });
    expect(status).toBe(404);
  });
});