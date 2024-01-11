import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser({ email, password, ...rest }: CreateUserDto) {
    const user = await this.getUserByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      ...rest
    });
    return createdUser.save();
  }

  async getUser(id: string) {
    return this.userModel.findById(id);
  }

  async getUsers(query: PaginationDto) {
    const sort = query.order === 'asc' ? 1 : -1;
    const count = await this.userModel.countDocuments();
    const users = await this.userModel
      .find()
      .sort({ [query.orderBy]: sort })
      .skip(query.page * query.limit)
      .limit(query.limit)
      .exec();
    return {
      count,
      data: users,
      page: query.page,
      limit: query.limit
    };
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
