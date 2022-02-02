import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesService } from '../services/roles.service';
import { UsersService } from '../services/users.service';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private usersService;
    private rolesService;
    constructor(reflector: Reflector, usersService: UsersService, rolesService: RolesService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
