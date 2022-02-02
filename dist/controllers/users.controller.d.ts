import { Response } from 'express';
import { CreateUserDto } from 'server/dto/create_user.dto';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { User } from 'server/entities/user.entity';
import { JwtService } from 'server/providers/services/jwt.service';
import { RefreshTokensService } from 'server/providers/services/refresh_tokens.service';
import { RolesService } from 'server/providers/services/roles.service';
import { UsersService } from 'server/providers/services/users.service';
export declare class UsersController {
    private usersService;
    private rolesService;
    private jwtService;
    private refreshTokenService;
    constructor(usersService: UsersService, rolesService: RolesService, jwtService: JwtService, refreshTokenService: RefreshTokensService);
    index(): Promise<{
        users: User[];
    }>;
    getCurrentUser(jwtBody: JwtBodyDto): Promise<{
        user: User;
    }>;
    create(userPayload: CreateUserDto, res: Response): Promise<{
        user: User;
        token: string;
    }>;
}
