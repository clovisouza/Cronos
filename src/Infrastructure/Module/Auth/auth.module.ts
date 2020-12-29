/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/Application/Controller/Auth.controller';
import { AuthService } from 'src/Domain/Services/auth.service';
import { UserRepository } from 'src/Infrastructure/Repository/User.Repository';
import { JwtStrategy } from 'src/Infrastructure/Security/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'super-secret',
    signOptions: {
      expiresIn: 18000,
    },
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
