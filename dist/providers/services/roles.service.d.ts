import { Repository } from 'typeorm';
import { Role, RoleKey } from 'server/entities/role.entity';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    findByKey(...keys: RoleKey[]): Promise<Role[]>;
    findByIds(ids: number[]): Promise<Role[]>;
    find(id: number, relations?: string[]): Promise<Role>;
}
