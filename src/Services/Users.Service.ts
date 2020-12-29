/* eslint-disable prettier/prettier */
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TB_User } from 'src/Domain/Entidades/TB_User';
import { UserRole } from 'src/Domain/Enumerador/User-Role.enum';
import { UserRepository } from 'src/Infrastructure/Repository/User.Repository';
import { User } from '../Domain/Dto/User';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  
  async createAdminUser(createUserDto: User): Promise<TB_User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
    }
  }
}