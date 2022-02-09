import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { RefreshToken } from './refresh_token.entity';
import { UserRole } from './user_role.entity';
import { User } from './user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  projectID: number;

  @Column({ unique: true, nullable: false })
  Title: string;

  @Column()
  ProjectManagerID: string;

  // @OneToMany(() => RefreshToken, (token) => token.user)
  // refreshTokens: RefreshToken[];

  // @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  // userRoles: UserRole[];

  @ManyToMany(() => User, (user) => user.userRoles)
  users: User[];

}
