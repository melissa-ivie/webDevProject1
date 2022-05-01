"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../../entities/user.entity");
const role_entity_1 = require("../../entities/role.entity");
const user_role_entity_1 = require("../../entities/user_role.entity");
const lodash_1 = require("lodash");
let UsersService = class UsersService {
    constructor(usersRespository, userRolesRepository, rolesRepository) {
        this.usersRespository = usersRespository;
        this.userRolesRepository = userRolesRepository;
        this.rolesRepository = rolesRepository;
    }
    findAll(relations = []) {
        return this.usersRespository.find({ relations });
    }
    findBy(options, relations = []) {
        return this.usersRespository.findOne(options, { relations });
    }
    find(id, relations = []) {
        return this.usersRespository.findOne(id, { relations });
    }
    findEmail(address) {
        return this.usersRespository.findOne({ where: { email: address }
        });
    }
    create(user) {
        return this.usersRespository.save(user);
    }
    async verify(email, password) {
        const user = await this.usersRespository.findOne({ email }, { relations: ['refreshTokens', 'userRoles'] });
        if (!user)
            return { verified: false, user: null };
        const verified = await bcrypt.compare(password, user.passwordHash);
        return { verified, user: verified ? user : null };
    }
    addUserToRoleInContext(userId, contextId, ...roleKeys) {
        return Promise.all(roleKeys.map(async (key) => {
            const role = await this.rolesRepository.findOne({ key });
            const userRole = new user_role_entity_1.UserRole();
            userRole.userId = userId;
            userRole.contextId = contextId;
            userRole.role = role;
            await this.userRolesRepository.save(userRole);
        }));
    }
    addUserToRootRole(userId, ...roleKeys) {
        return this.addUserToRoleInContext(userId, 'root', ...roleKeys);
    }
    async hasRoleInContext(userId, contextId, ...roleKeys) {
        const userRoles = await this.userRolesRepository.find({
            where: { userId, contextId },
            relations: ['role'],
        });
        const usersRoleKeys = userRoles.map((userRole) => userRole.role.key);
        return !(0, lodash_1.isEmpty)((0, lodash_1.intersection)(roleKeys, usersRoleKeys));
    }
    async hasRootRole(userId, ...roleKeys) {
        return this.hasRoleInContext(userId, 'root', ...roleKeys);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __param(2, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map