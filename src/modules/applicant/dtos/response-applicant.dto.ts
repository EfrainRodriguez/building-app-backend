import { ApiProperty } from '@nestjs/swagger';

export class ResponseApplicantDto {
  @ApiProperty({
    description: 'The id of the applicant',
    example: '5f5f5f5f5f5f5f5f5f5f5f5f'
  })
  _id: string;

  @ApiProperty({
    description: 'The provider of the applicant',
    example: '5f5f5f5f5f5f5f5f5f5f5f5f'
  })
  provider: string;

  @ApiProperty({
    description: 'The project of the applicant',
    example: '5f5f5f5f5f5f5f5f5f5f5f5f'
  })
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
  items: { name: string; unitValue: number; proposedValue: number }[];
}
