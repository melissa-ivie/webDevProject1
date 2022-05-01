import { Repository } from 'typeorm';
import { Project } from 'server/entities/project.entity';
import { Task } from 'server/entities/task.entity';
export declare class ProjectsService {
    private projectsRespository;
    private taskRepository;
    constructor(projectsRespository: Repository<Project>, taskRepository: Repository<Task>);
    findAll(relations?: string[]): Promise<Project[]>;
    findBy(options: Record<number, any>): Promise<Project>;
    find(id: number, relations?: string[]): Promise<Project>;
    create(newProject: Project): Promise<Project>;
    end(proID: number): Promise<import("typeorm").UpdateResult>;
}
