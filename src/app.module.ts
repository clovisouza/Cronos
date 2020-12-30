/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Infrastructure/Module/Auth/auth.module';
import { typeOrmConfig } from './Infrastructure/Configs/typeorm.config';
import { UsersModule } from './Infrastructure/Module/User/users.module';
import { winstonConfig } from './Infrastructure/Configs/winston.config';
import { WinstonModule } from 'nest-winston';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './Infrastructure/logger/loggerInterceptor';



@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonConfig),
     UsersModule,
     AuthModule],
  controllers: [],
  providers: [
    {
    provide: APP_INTERCEPTOR,
    useClass: LoggerInterceptor,
  },],
})
export class AppModule {}
