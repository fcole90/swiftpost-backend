import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
    const userByUsername = await this.getUser({ username });
    if (userByUsername) {
      throw new BadRequestException('username already exists');
    }

    const userByEmail = await this.getUser({ email });
    if (userByEmail) {
      throw new BadRequestException('email already exists');
    }

    this.userModel.create({
      username,
      email,
      password,
    });

    return;
  }

  async getUser(query: object): Promise<User | null> {
    return this.userModel.findOne(query);
  }
}
