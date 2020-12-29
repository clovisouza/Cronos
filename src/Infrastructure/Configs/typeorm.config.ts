/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'nestjs',
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entities: [__dirname + '/../../Domain/Entidades/*.Entity.{js,ts}'],
  synchronize: true,
};