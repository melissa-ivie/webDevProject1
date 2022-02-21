import { User } from 'server/entities/user.entity';

export class CreateTaskDto {
  title: string;
  timeEstimation: string;
  description: string;
  status: string;
  assignedUser: User;
}
