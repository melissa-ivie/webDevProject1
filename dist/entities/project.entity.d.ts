import { User } from './user.entity';
import { Task } from './task.entity';
export declare class Project {
    id: number;
    projectLeaderID: number;
    title: string;
    userEmails: string[];
    users: User[];
    tasks: Task[];
}
