import { Task } from 'server/entities/task.entity';
import { Repository } from 'typeorm';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    findAll(relations?: string[]): Promise<Task[]>;
    find(seekid: number): Promise<Task>;
    update(newid: number, newstatus: string): Promise<import("typeorm").UpdateResult>;
    assign(newid: number, newAssignee: string): Promise<import("typeorm").UpdateResult>;
    create(newTask: Task): Promise<Task>;
}
