import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartItemDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'Item quantity', example: 1 })
  quantity: number;
}
