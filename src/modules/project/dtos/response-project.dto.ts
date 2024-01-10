import { ApiProperty } from '@nestjs/swagger';

export class ResponseProjectDto {
  @ApiProperty({
    description: 'The id of the project',
    example: '1'
  })
  _id: number;

  @ApiProperty({
    description: 'The name of the project',
    example: 'My Project'
  })
  name: string;

  @ApiProperty({
    description: 'The start date of the project',
    example: '2020-01-01'
  })
  startDate: string;

  @ApiProperty({
    description: 'The end date of the project',
    example: '2020-12-31'
  })
  endDate: string;

  @ApiProperty({
    description: 'Images of the project',
    example: ['https://example.com/image1.jpg']
  })
  images: string[];

  @ApiProperty({
    description: 'Items of the project',
    example: [{ name: 'Item 1', unitValue: 100 }]
  })
  items: {
    name: string;
    unitValue: number;
  }[];

  @ApiProperty({
    description: 'The creation date of the project',
    example: '2020-01-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last update date of the project',
    example: '2020-01-01T00:00:00.000Z'
  })
  updatedAt: Date;
}
