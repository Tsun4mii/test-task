import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDTO } from '../dto/create.user.dto';
import { UpdateUserDTO } from '../dto/update.user.dto';

@Injectable()
export class UserMapper {
  public fromCreateToCreateInput(data: CreateUserDTO): Prisma.UserCreateInput {
    return {
      ...data,
    };
  }

  public fromUpdateToUpdateInput(data: UpdateUserDTO): Prisma.UserUpdateInput {
    return {
      ...data,
    };
  }
}
