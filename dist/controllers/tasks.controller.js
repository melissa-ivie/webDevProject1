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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const skip_decorator_1 = require("../decorators/skip.decorator");
const tasks_service_1 = require("../providers/services/tasks.service");
const auth_guard_1 = require("../providers/guards/auth.guard");
const task_entity_1 = require("../entities/task.entity");
const create_task_dto_1 = require("../dto/create_task.dto");
const update_task_dto_1 = require("../dto/update_task.dto");
const assign_task_dto_1 = require("../dto/assign_task.dto");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async index() {
        const tasks = await this.tasksService.findAll();
        return { tasks };
    }
    async update(body, res) {
        try {
            const task = await this.tasksService.update(body.id, body.status);
            return { task };
        }
        catch (e) {
            throw new common_1.HttpException(`Task update failed. ${e.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateAssign(body, res) {
        try {
            const task = await this.tasksService.assign(body.id, body.assignee);
            return { task };
        }
        catch (e) {
            throw new common_1.HttpException(`Task assign failed. ${e.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(body, res) {
        const newTask = new task_entity_1.Task();
        newTask.title = body.title;
        newTask.description = body.description;
        newTask.status = body.status;
        newTask.assignee = body.assignee;
        newTask.timeEstimation = body.timeEstimation;
        newTask.projectID = body.projectID;
        try {
            const task = await this.tasksService.create(newTask);
            return { task };
        }
        catch (e) {
            throw new common_1.HttpException(`Task creation failed. ${e.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)('/tasks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "index", null);
__decorate([
    (0, common_1.Post)('/updateTask'),
    (0, skip_decorator_1.Skip)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_task_dto_1.UpdateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/assignTask'),
    (0, skip_decorator_1.Skip)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_task_dto_1.AssignTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateAssign", null);
__decorate([
    (0, common_1.Post)('/task'),
    (0, skip_decorator_1.Skip)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
TasksController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map