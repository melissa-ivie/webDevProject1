import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Role, RoleKey } from 'server/entities/role.entity';
import { UserRole } from 'server/entities/user_role.entity';
export declare class UsersService {
    private usersRespository;
    private userRolesRepository;
    private rolesRepository;
    constructor(usersRespository: Repository<User>, userRolesRepository: Repository<UserRole>, rolesRepository: Repository<Role>);
    findAll(relations?: string[]): Promise<User[]>;
    findBy(options: Record<string, any>, relations?: string[]): Promise<User>;
    find(id: number, relations?: string[]): Promise<User>;
    create(user: User): Promise<User>;
    verify(email: string, password: string): Promise<{
        verified: boolean;
        user: User;
    }>;
    addUserToRoleInContext(userId: number, contextId: string, ...roleKeys: RoleKey[]): Promise<void[]>;
    addUserToRootRole(userId: number, ...roleKeys: RoleKey[]): Promise<void[]>;
    hasRoleInContext(userId: number, contextId: string, ...roleKeys: RoleKey[]): Promise<boolean>;
    hasRootRole(userId: number, ...roleKeys: RoleKey[]): Promise<boolean>;
}
