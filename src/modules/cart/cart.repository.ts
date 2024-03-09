import { Injectable } from '@nestjs/common';
import { Cart, CartItem, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CartWithItems } from './types/cart.with-items.type';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.CartCreateInput) {
    return this.prisma.cart.create({ data });
  }

  public async update(
    cartId: number,
    data: Prisma.CartUpdateInput,
  ): Promise<Cart> {
    return this.prisma.cart.update({
      where: { id: cartId },
      data,
    });
  }

  public async delete(cartId: number) {
    return this.prisma.cart.delete({ where: { id: cartId } });
  }

  public async getById(cartId: number): Promise<CartWithItems> {
    return this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: { include: { product: true } },
      },
    });
  }

  public async getMany(): Promise<CartWithItems[]> {
    return this.prisma.cart.findMany({
      include: {
        items: { include: { product: true } },
      },
    });
  }
}
