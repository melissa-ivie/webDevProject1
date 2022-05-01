import { Repository } from 'typeorm';
import { RefreshToken } from 'server/entities/refresh_token.entity';
export declare class RefreshTokensService {
    private refreshTokenRespository;
    constructor(refreshTokenRespository: Repository<RefreshToken>);
    create(refreshToken: RefreshToken): Promise<RefreshToken>;
    destroy(...refreshTokens: RefreshToken[]): Promise<RefreshToken[]>;
}
