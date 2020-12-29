import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/Application/Controller/Users.Controller';
import { UserRepository } from 'src/Infrastructure/Repository/User.Repository';
import { UsersService } from 'src/Services/Users.Service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
