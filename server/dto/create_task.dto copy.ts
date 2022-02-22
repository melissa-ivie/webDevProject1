import { Project } from 'server/entities/project.entity';
import { User } from 'server/entities/user.entity';

export class UpdateTaskDto {
  title: string;
  timeEstimation: string;
  description: string;
  status: string;
  assignedUser: User;
  projectID: number;
  project: Project;
}
