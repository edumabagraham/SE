import { setup } from '../config';
import request from 'supertest';
import express from 'express';
import bootstrapApp from '../../src/app';

describe('API tests - todos', () => {
  let app: express.Express;
  beforeAll(async () => {
    await setup();
    app = bootstrapApp();
  });

  it('should retrieve all todos', async () => {
    const { status, body } = await request(app).get('/api/todos/');
    expect(status).toBe(200);
    expect(body.data).toHaveLength(0);
  });

  it('Should fail if not title is submitted to the create todos endpoint', async () => {
    const { status } = await request(app).post('/api/todos/').send({});
    expect(status).toBe(400);
  });

  it('Should create and return us a todo', async () => {
    const { status, body } = await request(app).post('/api/todos/').send({ title: 'title' });
    expect(status).toBe(201);
    expect(body.data.title).toMatch('title');
  });

  it('should retrieve all todos', async () => {
    const { status, body } = await request(app).get('/api/todos/');
    expect(status).toBe(200);
    expect(body.data).toHaveLength(1);
  });
  it('')
});
