/* eslint-disable prettier/prettier */
import { Controller, Post, Body,ValidationPipe } from '@nestjs/common';
import { ReturnUser } from 'src/Domain/Message/Return-User';
import { UsersService } from 'src/Services/Users.Service';
import { User } from '../../Domain/Dto/User';



@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('createAdminUser')
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: User,
  ): Promise<ReturnUser> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }
}