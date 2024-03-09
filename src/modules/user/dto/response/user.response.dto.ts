import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class UserResponseDTO {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'User ID', example: 1 })
  id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'User First Name', example: 'Joe' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'User Last Name', example: 'Doe' })
  surname: string;

  @IsDateString()
  @ApiProperty({
    type: String,
    description: 'Record creation date',
    example: '2020-12-23T12:45:00.000Z',
  })
  createdAt: string;

  @IsDateString()
  @ApiProperty({
    type: String,
    description: 'Record last update date',
    example: '2020-12-23T12:45:00.000Z',
  })
  updatedAt: string;
}
