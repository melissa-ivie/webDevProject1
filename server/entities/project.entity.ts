import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, Column } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity'

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectLeaderID: number;

  @Column()
  title: string;

  @ManyToMany(() => User, (user) => user.id)
  users: User[];

  // @OneToMany(() => Task, (task) => task.id)
  // tasks: Task[];

}