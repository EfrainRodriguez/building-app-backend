import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user._id, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }
}
