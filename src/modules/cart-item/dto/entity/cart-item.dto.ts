import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { ProductDTO } from 'src/modules/product/dto/entity/product.dto';

export class CartItemDTO {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'CartItem ID', example: 1 })
  id: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'Product ID', example: 1 })
  productId: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'Cart ID', example: 1 })
  cartId: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'Product quantity', example: 1 })
  quantity: number;

  @ValidateNested()
  @Type(() => ProductDTO)
  @ApiProperty({ type: ProductDTO, description: 'Attached product' })
  product: ProductDTO;

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
