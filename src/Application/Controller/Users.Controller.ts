/* eslint-disable prettier/prettier */
import { Controller, Post, Body,ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/Domain/Enumerador/User-Role.enum';
import { ReturnUser } from 'src/Domain/Message/Return-User';
import { UsersService } from 'src/Domain/Services/Users.Service';
import { Role } from 'src/Infrastructure/Decorator/Role.Decorator';
import { RolesGuard } from 'src/Infrastructure/Security/Roles.Guard';
import { User } from '../../Domain/Dto/User';



@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('createAdminUser')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
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