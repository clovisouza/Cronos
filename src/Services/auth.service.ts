/* eslint-disable prettier/prettier */
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Domain/Dto/User';
import { TB_User } from 'src/Domain/Entidades/TB_User';
import { UserRole } from 'src/Domain/Enumerador/User-Role.enum';
import { UserRepository } from 'src/Infrastructure/Repository/User.Repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(createUserDto: User): Promise<TB_User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.userRepository.createUser(createUserDto, UserRole.USER);
    }
  }
}