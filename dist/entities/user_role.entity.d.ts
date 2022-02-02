import { Role } from './role.entity';
import { User } from './user.entity';
export declare class UserRole {
    id: number;
    roleId: number;
    userId: number;
    contextId: string;
    role: Role;
    user: User;
}
