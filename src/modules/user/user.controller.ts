import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDTO } from './dto/create.user.dto';
import { UserNotFoundResponseDTO } from './dto/response/user.not-found.response.dto';
import { UserResponseDTO } from './dto/response/user.response.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new user',
  })
  @ApiCreatedResponse({
    description: 'Created user',
    type: UserResponseDTO,
  })
  async create(@Body() data: CreateUserDTO): Promise<User> {
    return this.userService.create(data);
  }

  @Patch('/:userId')
  @ApiOperation({
    summary: 'Partial update user record by id',
  })
  @ApiOkResponse({
    description: 'Updated user',
    type: UserResponseDTO,
  })
  public async update(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.update(userId, data);
  }

  @Delete('/:userId')
  @ApiOperation({
    summary: 'Delete user record',
  })
  @ApiOkResponse({
    description: 'Deleted user record by id',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User record not found by id',
    type: UserNotFoundResponseDTO,
  })
  public async delete(@Param('userId', new ParseIntPipe()) userId: number) {
    return this.userService.delete(userId);
  }

  @Get('/:userId')
  @ApiOperation({
    summary: 'Get user record by id',
  })
  @ApiOkResponse({
    description: 'Single user record',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User record not found by id',
    type: UserNotFoundResponseDTO,
  })
  public async getById(@Param('userId', new ParseIntPipe()) userId: number) {
    return this.userService.getById(userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all user records',
  })
  @ApiOkResponse({
    description: 'Multiple user records',
    type: UserResponseDTO,
    isArray: true,
  })
  public async getMany() {
    return this.userService.getMany();
  }
}
