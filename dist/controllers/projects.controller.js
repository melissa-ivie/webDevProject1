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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const skip_decorator_1 = require("../decorators/skip.decorator");
const create_project_dto_1 = require("../dto/create_project.dto");
const project_entity_1 = require("../entities/project.entity");
const auth_guard_1 = require("../providers/guards/auth.guard");
const projects_service_1 = require("../providers/services/projects.service");
const end_dto_1 = require("../dto/end.dto");
let ProjectsController = class ProjectsController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async index() {
        const projects = await this.projectService.findAll();
        return { projects };
    }
    async getCurrentProject(projectBody) {
        const projectID = await this.projectService.find(projectBody.id);
        return { projectID };
    }
    async end(body, res) {
        try {
            let id = Number(body.id);
            const proj = await this.projectService.end(id);
            return { proj };
        }
        catch (e) {
            throw new common_1.HttpException(`Project Deletion Failed. ${e.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(body, res) {
        const newProject = new project_entity_1.Project();
        newProject.title = body.title;
        newProject.projectLeaderID = body.projectLeaderID;
        newProject.userEmails = body.users;
        try {
            const project = await this.projectService.create(newProject);
            return { project };
        }
        catch (e) {
            throw new common_1.HttpException(`Project creation failed. ${e.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)('/projects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/projectID'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_entity_1.Project]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getCurrentProject", null);
__decorate([
    (0, common_1.Post)('/endProj'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [end_dto_1.EndDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "end", null);
__decorate([
    (0, common_1.Post)('/project'),
    (0, skip_decorator_1.Skip)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
ProjectsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map