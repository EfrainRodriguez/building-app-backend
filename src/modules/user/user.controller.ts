import {
  Get,
  Put,
  Res,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Controller,
  HttpStatus,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ResponseUserDto } from './dtos/response-user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ type: ResponseUserDto })
  async createUser(
    @Body(new ValidationPipe()) user: CreateUserDto,
    @Res() res
  ) {
    const createdUser = await this.userService.createUser(user);
    return res.status(HttpStatus.CREATED).json(createdUser);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiOkResponse({ type: ResponseUserDto })
  async getUser(@Param('id') id: string, @Res() res) {
    const user = await this.userService.getUser(id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  async getUsers(@Query() query: PaginationDto, @Res() res) {
    const users = await this.userService.getUsers(query);
    return res.status(HttpStatus.OK).json(users);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiOkResponse({ type: ResponseUserDto })
  async updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) user: UpdateUserDto,
    @Res() res
  ) {
    const updatedUser = await this.userService.updateUser(id, user);
    return res.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiOkResponse({ description: 'The user has been successfully deleted' })
  async deleteUser(@Param('id') id: string, @Res() res) {
    const deletedUser = await this.userService.deleteUser(id);
    return res.status(HttpStatus.OK).json(deletedUser);
  }

  sanitizeUser(user: ResponseUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }
}
