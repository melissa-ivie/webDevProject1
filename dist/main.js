"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./env");
const fs = require("fs");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const morgan = require("morgan");
async function bootstrap() {
    let httpsOptions;
    if (process.env.USE_SSL === 'true') {
        httpsOptions = {
            key: fs.readFileSync('./private-key.pem'),
            cert: fs.readFileSync('./public-cert.pem'),
        };
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions,
        logger: ['verbose'],
    });
    app.use(cookieParser());
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'static'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    const logger = new common_1.Logger('Request');
    app.use(morgan('tiny', {
        stream: {
            write: (message) => logger.log(message.replace('\n', '')),
        },
    }));
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map