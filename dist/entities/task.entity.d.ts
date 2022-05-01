import { User } from './user.entity';
import { Project } from './project.entity';
export declare class Task {
    id: number;
    timeEstimation: string;
    title: string;
    description: string;
    status: string;
    projectID: number;
    assignee: string;
    assignedUser: User;
    project: Project;
}
