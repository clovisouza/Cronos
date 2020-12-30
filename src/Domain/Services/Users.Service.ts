/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TB_User } from 'src/Domain/Entidades/TB_User';
import { UserRole } from 'src/Domain/Enumerador/User-Role.enum';
import { UserRepository } from 'src/Infrastructure/Repository/User.Repository';
import { FindUsersQuery } from '../Dto/FindUserQuery';
import { UpdateUserDto } from '../Dto/UpdateUser';
import { User } from '../Dto/User';


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

  async findUserById(userId: string): Promise<TB_User> {
    const user = await this.userRepository.findOne(userId, {
      select: ['email', 'name', 'role', 'id'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;    
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<TB_User> {
    const user = await this.findUserById(id);
    const { name, email, role, status } = updateUserDto;
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.role = role ? role : user.role;
    user.status = status === undefined ? user.status : status;
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async deleteUser(userId: string) {
    const result = await this.userRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }

  async findUsers(
    queryDto: FindUsersQuery,
  ): Promise<{ users: TB_User[]; total: number }> {
    const users = await this.userRepository.findUsers(queryDto);
    return users;
  }

}