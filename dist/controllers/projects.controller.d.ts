import { Response } from 'express';
import { CreateProjectDto } from 'server/dto/create_project.dto';
import { Project } from 'server/entities/project.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { EndDto } from 'server/dto/end.dto';
export declare class ProjectsController {
    private projectService;
    constructor(projectService: ProjectsService);
    index(): Promise<{
        projects: Project[];
    }>;
    getCurrentProject(projectBody: Project): Promise<{
        projectID: Project;
    }>;
    end(body: EndDto, res: Response): Promise<{
        proj: import("typeorm").UpdateResult;
    }>;
    create(body: CreateProjectDto, res: Response): Promise<{
        project: Project;
    }>;
}
