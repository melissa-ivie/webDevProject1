import { RefreshToken } from './refresh_token.entity';
import { UserRole } from './user_role.entity';
import { Project } from './project.entity';
export declare class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    refreshTokens: RefreshToken[];
    userRoles: UserRole[];
    projects: Project[];
}
