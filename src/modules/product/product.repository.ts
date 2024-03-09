import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  public async update(
    productId: number,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.prisma.product.update({ where: { id: productId }, data });
  }

  public async delete(productId: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id: productId } });
  }

  public async getById(productId: number): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id: productId } });
  }

  public async getMany() {
    return this.prisma.product.findMany();
  }
}
