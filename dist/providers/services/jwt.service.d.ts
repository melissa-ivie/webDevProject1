import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { RefreshTokenBody } from 'server/dto/refresh_token_body.dto';
export declare class JwtService {
    issueToken(body: JwtBodyDto | RefreshTokenBody, expiresIn?: string, key?: string): string;
    issueRefreshToken(body: RefreshTokenBody): string;
    parseToken(token: string, key?: string): JwtBodyDto | RefreshTokenBody;
    parseRefreshToken(token: string): JwtBodyDto | RefreshTokenBody;
}
