import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '../services/jwt.service';
import { GuardUtil } from '../util/guard.util';
export declare class AuthGuard implements CanActivate {
    private guardUtil;
    private jwtService;
    constructor(guardUtil: GuardUtil, jwtService: JwtService);
    canActivate(context: ExecutionContext): boolean;
}
