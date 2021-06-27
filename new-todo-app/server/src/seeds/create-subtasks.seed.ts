import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Subtask } from '../entities/subtask.entity';

export default class CreateSubtasks implements Seeder {
  public async run(factory: Factory, _: Connection): Promise<any> {
    await factory(Subtask)().createMany(10);
  }
}
