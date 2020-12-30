/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post,  UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/Domain/Dto/User';
import { TB_User } from 'src/Domain/Entidades/TB_User';
import { AuthService } from 'src/Domain/Services/auth.service';
import { GetUser } from 'src/Infrastructure/Decorator/User.Decorator';




@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: User,
  ): Promise<{ message: string }> {
    await this.authService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: User,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentiaslsDto);
  }
  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: TB_User): TB_User {
    return user;
  }
}