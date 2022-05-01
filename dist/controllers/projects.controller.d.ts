import { Response } from 'express';
import { CreateProjectDto } from 'server/dto/create_project.dto';
import { Project } from 'server/entities/project.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
export declare class ProjectsController {
    private projectService;
    constructor(projectService: ProjectsService);
    index(): Promise<{
        projects: Project[];
    }>;
    getCurrentProject(projectBody: Project): Promise<{
        projectID: Project;
    }>;
    create(body: CreateProjectDto, res: Response): Promise<{
        project: Project;
    }>;
}
