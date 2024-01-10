import {
  IsString,
  MaxLength,
  MinLength,
  IsDateString,
  IsOptional,
  IsArray
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    minLength: 3,
    maxLength: 50,
    example: 'My Project'
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'The start date of the project',
    example: '2020-01-01'
  })
  @IsOptional()
  @IsString()
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'The end date of the project',
    example: '2020-12-31'
  })
  @IsOptional()
  @IsString()
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Images of the project',
    example: ['https://example.com/image1.jpg']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({
    description: 'Items of the project',
    example: [{ name: 'Item 1', unitValue: 100 }]
  })
  @IsOptional()
  @IsArray()
  items: {
    name: string;
    unitValue: number;
  }[];
}
