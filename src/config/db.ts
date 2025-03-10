import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import * as process from 'node:process';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

export const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [
    'src/**/*.entity{.ts,.js}',
    'src/**/entities/**/*.entity{.ts,.js}',
  ],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('db', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
