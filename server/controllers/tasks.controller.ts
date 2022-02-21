import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../providers/services/users.service';
import { Skip } from '../decorators/skip.decorator';
import { ProjectsService } from '../providers/services/projects.service';
import { TasksService } from '../providers/services/tasks.service';
import { AuthGuard } from '../providers/guards/auth.guard';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create_task.dto';
import { Response } from 'express';

@Controller()
export class TasksController {
  constructor(
    private tasksServices: TasksService,
    private usersServices: UsersService,
    private projectService: ProjectsService,
  ) {}

  @Get('/projects/:id/task')
  async index() {
    const task = await this.tasksServices.findAll();
    return { task };
  }

  @Post('/task')
  @Skip(AuthGuard)
  async create(@Body() body: CreateTaskDto, @Res({ passthrough: true }) res: Response) {
    const newTask = new Task();
    newTask.title = body.title;
    newTask.description = body.description;
    newTask.status = body.status;
    newTask.timeEstimation = body.timeEstimation;
    newTask.assignedUser = body.assignedUser;

    try {
      const task = await this.tasksServices.create(newTask);
      return { task };
    } catch (e) {
      throw new HttpException(`Task creation failed. ${e.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
