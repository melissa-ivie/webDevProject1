import { RoleKey } from 'server/entities/role.entity';
export declare const ROLES_CONTEXT_KEY = "roles";
export declare const Roles: (...roles: RoleKey[]) => import("@nestjs/common").CustomDecorator<string>;
