/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/Application/Controller/Users.Controller';
import { UsersService } from 'src/Domain/Services/Users.Service';
import { UserRepository } from 'src/Infrastructure/Repository/User.Repository';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
