import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'server/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(relations: string[] = []) {
    return this.tasksRepository.find({ relations });
  }

  create(newTask: Task) {
    return this.tasksRepository.save(newTask);
  }
}
