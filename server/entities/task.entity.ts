import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, Column } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timeEstimation: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.id)
  assignedUser: User;

  @OneToMany(() => Project, (project) => project.id)
  project: Project;
}
