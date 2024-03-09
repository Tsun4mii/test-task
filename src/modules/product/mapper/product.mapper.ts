import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProductDTO } from '../dto/request/create.product.dto';
import { UpdateProductDTO } from '../dto/request/update.product.dto';

@Injectable()
export class ProductMapper {
  public fromCreateToCreateInput(
    data: CreateProductDTO,
  ): Prisma.ProductCreateInput {
    return {
      ...data,
    };
  }

  public fromUpdateToUpdateInput(
    data: UpdateProductDTO,
  ): Prisma.ProductUpdateInput {
    return {
      ...data,
    };
  }
}
