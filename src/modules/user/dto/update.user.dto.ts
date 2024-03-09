import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'User First Name',
    example: 'Joe',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'User Last Name',
    example: 'Doe',
  })
  surname?: string;
}
