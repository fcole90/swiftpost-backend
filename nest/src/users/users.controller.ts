import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<void> {
    if (username == null || password == null) {
      throw new BadRequestException('Missing username or password');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    await this.usersService.createUser(username, hashedPassword);

    return;
  }
}
