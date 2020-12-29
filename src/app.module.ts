import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './Infrastructure/Configs/typeorm.config';
import { UsersModule } from './Infrastructure/Module/User/users.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
