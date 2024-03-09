import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class ProductDTO {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Product ID', example: 1 })
  id: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Product title',
    example: 'Canon 250D',
  })
  title: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Product description',
    example: 'Mirror Camera',
  })
  description: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'Product price', example: 13.5 })
  price: number;

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
