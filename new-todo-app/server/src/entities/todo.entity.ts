import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './common';
import { Subtask } from './subtask.entity';

@Entity({ name: 'todos' })
export class Todo {
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

  @OneToMany(() => Subtask, (subtask) => subtask.todo, { onDelete: 'CASCADE' })
  subtasks: Subtask[];
}
