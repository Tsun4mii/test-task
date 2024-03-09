import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateCartDTO {
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: Number, description: 'Cart user owner ID', example: 1 })
  userId: number;
}
