/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './Infrastructure/Configs/typeorm.config';
import { AuthModule } from './Infrastructure/Module/Auth/auth.module';
import { UsersModule } from './Infrastructure/Module/User/users.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
