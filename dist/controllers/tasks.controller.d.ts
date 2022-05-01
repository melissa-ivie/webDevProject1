import { TasksService } from '../providers/services/tasks.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create_task.dto';
import { UpdateTaskDto } from 'server/dto/update_task.dto';
import { Response } from 'express';
import { AssignTaskDto } from 'server/dto/assign_task.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    index(): Promise<{
        tasks: Task[];
    }>;
    update(body: UpdateTaskDto, res: Response): Promise<{
        task: import("typeorm").UpdateResult;
    }>;
    updateAssign(body: AssignTaskDto, res: Response): Promise<{
        task: import("typeorm").UpdateResult;
    }>;
    create(body: CreateTaskDto, res: Response): Promise<{
        task: Task;
    }>;
}
