import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() userDto: CreateUserDto) {
    console.log("reched auth controller")
    return this.authService.login(userDto);
  }
}
interface CreateUserDto {
  email: string;
  password: string;
}