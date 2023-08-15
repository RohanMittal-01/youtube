import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
}
interface CreateUserDto {
    email: string;
    password: string;
}