import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Product title',
    example: 'Canon 250D',
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Product description',
    example: 'Mirror Camera',
  })
  description?: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional({
    type: Number,
    description: 'Product price',
    example: 13.5,
  })
  price?: number;
}
