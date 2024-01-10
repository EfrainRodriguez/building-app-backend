import { IsOptional, IsString, Min, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    name: 'page',
    description: 'Current page of the list',
    example: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  page: number;

  @ApiProperty({
    name: 'limit',
    description: 'The limit of items to return',
    example: 10
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit: number;

  @ApiProperty({
    name: 'orderBy',
    description: 'Order by a specific field',
    example: 'createdAt'
  })
  @IsOptional()
  @IsString()
  orderBy: string;

  @ApiProperty({
    name: 'order',
    description: 'Order by ascending or descending',
    example: 'desc'
  })
  @IsOptional()
  @IsString()
  order: string;
}
