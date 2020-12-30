/* eslint-disable prettier/prettier */
import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Param, Patch, ForbiddenException, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FindUsersQuery } from 'src/Domain/Dto/FindUserQuery';
import { UpdateUserDto } from 'src/Domain/Dto/UpdateUser';
import { TB_User } from 'src/Domain/Entidades/TB_User';
import { UserRole } from 'src/Domain/Enumerador/User-Role.enum';
import { ReturnUser } from 'src/Domain/Message/Return-User';
import { UsersService } from 'src/Domain/Services/Users.Service';
import { Role } from 'src/Infrastructure/Decorator/Role.Decorator';
import { GetUser } from 'src/Infrastructure/Decorator/User.Decorator';
import { RolesGuard } from 'src/Infrastructure/Security/Roles.Guard';
import { User } from '../../Domain/Dto/User';



@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('createAdminUser')
  @Role(UserRole.ADMIN)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: User,
  ): Promise<ReturnUser> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  async findUserById(@Param('id') id): Promise<ReturnUser> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch(':id')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: TB_User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN && user.id.toString() != id) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    } else {
      return this.usersService.updateUser(updateUserDto, id);
    }
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }

  @Get()
  @Role(UserRole.ADMIN)
  async findUsers(@Query() query: FindUsersQuery) {
    const found = await this.usersService.findUsers(query);
    return {
      found,
      message: 'Usuários encontrados',
    };
  }
}