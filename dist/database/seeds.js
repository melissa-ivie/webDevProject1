"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../entities/user.entity");
const role_entity_1 = require("../entities/role.entity");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const user_role_entity_1 = require("../entities/user_role.entity");
dotenv.config();
class Seeds {
    async run(factory, connection) {
        console.log('\nCreating Roles');
        const roleObjects = role_entity_1.Role.ROLES.map((key) => ({ key }));
        const roleRepository = connection.getRepository(role_entity_1.Role);
        for (const roleObj of roleObjects) {
            const role = await roleRepository.findOne(roleObj);
            if (!role) {
                console.log(`Creating role '${roleObj.key}'`);
                await roleRepository.insert(roleObj);
            }
            else {
                console.log(`Role '${role.key}' already exists`);
            }
        }
        const userRepository = connection.getRepository(user_entity_1.User);
        let adminUser = await userRepository.findOne({ email: process.env.ADMIN_EMAIL });
        if (!adminUser) {
            const adminRole = await roleRepository.findOne({ key: role_entity_1.RoleKey.ADMIN });
            console.log(`\nCreating Admin User with email ${process.env.ADMIN_EMAIL}`);
            console.log(adminRole);
            const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            adminUser = new user_entity_1.User();
            adminUser.email = process.env.ADMIN_EMAIL;
            adminUser.passwordHash = passwordHash;
            adminUser.firstName = 'Admin';
            adminUser.lastName = 'Site';
            const adminUserRole = new user_role_entity_1.UserRole();
            adminUserRole.role = adminRole;
            adminUser.userRoles = [adminUserRole];
            await userRepository.save(adminUser);
        }
        else {
            console.log(`\nAdmin User with email ${process.env.ADMIN_EMAIL} already exists`);
        }
    }
}
exports.default = Seeds;
//# sourceMappingURL=seeds.js.map