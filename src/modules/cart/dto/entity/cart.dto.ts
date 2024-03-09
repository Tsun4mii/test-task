import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CartItemDTO } from 'src/modules/cart-item/dto/entity/cart-item.dto';

export class CartDTO {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Cart ID', example: 1 })
  id: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'UserId ID', example: 1 })
  userId: number;

  @ValidateNested()
  @Type(() => CartItemDTO)
  @IsArray()
  @ApiProperty({ type: [CartItemDTO], description: 'Items in cart' })
  items: CartItemDTO[];

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
