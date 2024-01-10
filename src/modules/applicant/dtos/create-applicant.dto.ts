import { IsString, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateItemDto {
  @ApiProperty({
    description: 'The name of the item',
    example: 'Item 1'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The unit value of the item',
    example: 10
  })
  @IsNumber()
  unitValue: number;

  @ApiProperty({
    description: 'The proposed value of the item',
    example: 15
  })
  @IsNumber()
  proposedValue: number;
}

export class CreateApplicantDto {
  @ApiProperty({
    description: 'The provider of the applicant',
    example: '5f5f5f5f5f5f5f5f5f5f5f5f'
  })
  @IsString()
  @IsMongoId()
  provider: string;

  @ApiProperty({
    description: 'The project of the applicant',
    example: '5f5f5f5f5f5f5f5f5f5f5f5f'
  })
  @IsString()
  @IsMongoId()
  project: string;

  @ApiProperty({
    description: 'The items of the applicant',
    example: [
      {
        name: 'Item 1',
        unitValue: 10,
        proposedValue: 15
      },
      {
        name: 'Item 2',
        unitValue: 20,
        proposedValue: 25
      }
    ]
  })
  items: CreateItemDto[];
}
