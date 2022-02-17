import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'server/entities/user.entity';
import { SessionsController } from '../controllers/sessions.controller';
import { UsersController } from 'server/controllers/users.controller';
import { UsersService } from '../providers/services/users.service';
import { RefreshTokensService } from '../providers/services/refresh_tokens.service';
import { RefreshToken } from 'server/entities/refresh_token.entity';
import { JwtService } from 'server/providers/services/jwt.service';
import { RefreshTokensController } from 'server/controllers/refresh_tokens.controller';
import { Role } from 'server/entities/role.entity';
import { Project } from 'server/entities/project.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { ProjectsController } from 'server/controllers/projects.controller';
import { RolesService } from 'server/providers/services/roles.service';
import { UserRole } from 'server/entities/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken, Role, UserRole, Project])],
  controllers: [SessionsController, UsersController, RefreshTokensController, ProjectsController],
  providers: [UsersService, RolesService, RefreshTokensService, JwtService, ProjectsService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
