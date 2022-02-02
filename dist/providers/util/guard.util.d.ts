import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class GuardUtil {
    private reflector;
    constructor(reflector: Reflector);
    shouldSkip(guard: CanActivate, context: ExecutionContext): boolean;
}
