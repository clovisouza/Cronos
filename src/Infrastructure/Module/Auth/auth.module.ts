/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/Application/Controller/Auth.controller';
import { AuthService } from 'src/Services/auth.service';
import { UserRepository } from 'src/Infrastructure/Repository/User.Repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
