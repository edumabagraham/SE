import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Status } from './common';
import { Todo } from './todo.entity';

@Entity({ name: 'subtasks' })
export class Subtask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: process.env.NODE_ENV === 'test' ? 'int' : 'enum',
    enum: Status,
    default: Status.pending,
  })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Todo, (todo) => todo.subtasks)
  todo: Todo;
}
