import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const user = await this.getUser({ username });
    if (user) {
      throw new BadRequestException('username already exists');
    }

    return this.userModel.create({
      username,
      password,
    });
  }

  async getUser(query: object): Promise<User | null> {
    return this.userModel.findOne(query);
  }
}
