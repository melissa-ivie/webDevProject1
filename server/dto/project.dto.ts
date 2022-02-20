export class CreateTaskDto {
  title: string;
  timeEstimation: number;
  description: string;
  status: boolean;
  assignedUser: string;
}
