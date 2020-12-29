/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from 'src/Domain/Entidades/User.Entity';
import { UserRole } from '../../Domain/Enumerador/User-Role.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from 'src/Domain/Dto/User';

import {ConflictException,InternalServerErrorException} from '@nestjs/common';


@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(
    createUserDto: User,
    role: UserRole,
  ): Promise<UserEntity> {
    const { email, name, password } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}