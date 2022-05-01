import '../env';
declare const _default: {
    type: string;
    host: string;
    port: number;
    database: string;
    autoLoadEntities: boolean;
    migrations: string[];
    seeds: string[];
    cli: {
        migrationsDir: string;
    };
    entities: string[];
    url?: undefined;
    ssl?: undefined;
} | {
    type: string;
    url: string;
    ssl: {
        rejectUnauthorized: boolean;
    };
    migrations: string[];
    seeds: string[];
    cli: {
        migrationsDir: string;
    };
    entities: string[];
    host?: undefined;
    port?: undefined;
    database?: undefined;
    autoLoadEntities?: undefined;
};
export = _default;
