import { Request } from 'express';
import { UsersService } from 'server/providers/services/users.service';
import { SignInDto } from 'server/dto/sign_in.dto';
import { JwtService } from 'server/providers/services/jwt.service';
import { RolesService } from 'server/providers/services/roles.service';
export declare class RefreshTokensController {
    private usersService;
    private rolesService;
    private jwtService;
    constructor(usersService: UsersService, rolesService: RolesService, jwtService: JwtService);
    get(body: SignInDto, req: Request): Promise<{
        token: string;
    }>;
}
