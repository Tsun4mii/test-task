import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCartDTO } from '../dto/request/create.cart.dto';

@Injectable()
export class CartMapper {
  public fromCreateToCreateInput(data: CreateCartDTO): Prisma.CartCreateInput {
    return {
      user: { connect: { id: data.userId } },
    };
  }
}
