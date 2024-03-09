import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateCartItemDTO {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  cartId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
