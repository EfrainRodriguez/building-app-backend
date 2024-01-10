import { ApiProperty } from '@nestjs/swagger';

import { UserType } from '../types/user.type';

export class ResponseUserDto {
  @ApiProperty({
    description: 'The id of the user',
    example: '1'
  })
  _id: number;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe'
  })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'email@email.com'
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '123456'
  })
  password: string;

  @ApiProperty({
    description: 'The type of the user',
    example: UserType.ADMIN
  })
  type: UserType;

  @ApiProperty({
    description: 'The created date of the user',
    example: '2021-01-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The updated date of the user',
    example: '2021-01-01T00:00:00.000Z'
  })
  updatedAt: Date;
}
