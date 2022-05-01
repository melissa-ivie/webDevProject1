"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("../env");
exports.config = process.env.NODE_ENV === 'development'
    ? {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: process.env.DATABASE_URL,
        autoLoadEntities: true,
    }
    : {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        ssl: { rejectUnauthorized: false },
    };
//# sourceMappingURL=config.js.map