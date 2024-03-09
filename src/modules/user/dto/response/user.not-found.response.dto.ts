import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserNotFoundResponseDTO {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Error status code', example: 404 })
  statusCode: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Error message',
    example: 'Not Found',
  })
  message: string;
}
