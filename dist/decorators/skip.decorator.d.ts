import { CanActivate } from '@nestjs/common';
import { Class } from 'server/dto/class.dto';
export declare const SKIP_KEY = "skip";
export declare const Skip: (...guards: Class<CanActivate>[]) => import("@nestjs/common").CustomDecorator<string>;
