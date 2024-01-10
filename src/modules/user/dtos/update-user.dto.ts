import {
  IsString,
  IsEmail,
  Length,
  IsOptional,
  Matches
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { UserType } from '../types/user.type';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    minLength: 3,
    maxLength: 30
  })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    minLength: 3,
    maxLength: 30
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    minLength: 3,
    maxLength: 30
  })
  @IsString()
  @IsOptional()
  @Length(3, 30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/, {
    message:
      'password must have at least one lowercase letter, one uppercase letter and one number'
  })
  password: string;

  @ApiProperty({
    description: 'The type of the user',
    enum: ['builder', 'provider']
  })
  @IsOptional()
  @IsString()
  type: UserType;
}
