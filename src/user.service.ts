import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const { email, password } = userDto;

    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 10); // Hash the password before saving

    return this.userRepository.save(user);
  }
}

interface CreateUserDto {
  email: string;
  password: string;
}
