import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Project } from 'server/entities/project.entity';
import { Task } from 'server/entities/task.entity'

import { intersection, isEmpty } from 'lodash';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRespository: Repository<Project>,
    //@InjectRepository(Task)
    //private taskRepository: Repository<Task>,
  ) {}

  findAll(relations: string[] = []) {
    return this.projectsRespository.find({ relations });
  }

//   findBy(options: Record<string, any>, relations: string[] = []) {
//     return this.usersRespository.findOne(options, { relations });
//   }

//   find(id: number, relations: string[] = []) {
//     return this.usersRespository.findOne(id, { relations });
//   }

  create(newProject: Project) {
    return this.projectsRespository.save(newProject);
  }

}
