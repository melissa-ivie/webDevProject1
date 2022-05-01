import { UserRole } from './user_role.entity';
export declare enum RoleKey {
    ADMIN = "admin",
    USER = "user"
}
export declare class Role {
    static ROLES: RoleKey[];
    id: number;
    key: RoleKey;
    userRoles: UserRole[];
}
