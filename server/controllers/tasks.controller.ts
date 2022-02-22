import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../providers/services/users.service';
import { Skip } from '../decorators/skip.decorator';
import { ProjectsService } from '../providers/services/projects.service';
import { TasksService } from '../providers/services/tasks.service';
import { AuthGuard } from '../providers/guards/auth.guard';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create_task.dto';
import { UpdateTaskDto } from 'server/dto/update_task.dto';
import { Response } from 'express';

@Controller()
export class TasksController {
  constructor(
    private tasksService: TasksService,
  ) {}

  @Get('/tasks')
  async index() {
    const tasks = await this.tasksService.findAll();
    return { tasks };
  }

  @Post('/updateTask')
  @Skip(AuthGuard)
  async update(@Body() body: UpdateTaskDto, @Res({ passthrough: true }) res: Response) {
    const changeTask = await this.tasksService.find(body.id);
    console.log("called update Task");
    console.log(changeTask);
    changeTask.status = body.status;
    try {
      const task = await this.tasksService.update(changeTask);
      return { task };
    } catch (e) {
      throw new HttpException(`Task update failed. ${e.message}`, HttpStatus.BAD_REQUEST);
    }
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
    newTask.projectID = body.projectID;

    try {
      const task = await this.tasksService.create(newTask);
      return { task };
    } catch (e) {
      throw new HttpException(`Task creation failed. ${e.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
