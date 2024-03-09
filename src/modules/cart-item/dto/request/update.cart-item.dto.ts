import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateCartItemDTO {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  cartId?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  productId?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity?: number;
}
