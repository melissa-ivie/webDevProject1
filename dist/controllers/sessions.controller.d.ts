import { Response } from 'express';
import { UsersService } from 'server/providers/services/users.service';
import { SignInDto } from 'server/dto/sign_in.dto';
import { JwtService } from 'server/providers/services/jwt.service';
import { RefreshTokensService } from 'server/providers/services/refresh_tokens.service';
import { RolesService } from 'server/providers/services/roles.service';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
export declare class SessionsController {
    private usersService;
    private jwtService;
    private rolesService;
    private refreshTokenService;
    constructor(usersService: UsersService, jwtService: JwtService, rolesService: RolesService, refreshTokenService: RefreshTokensService);
    create(body: SignInDto, res: Response): Promise<{
        token: string;
    }>;
    destroy(res: Response, jwtBody: JwtBodyDto): Promise<{
        success: boolean;
    }>;
}
