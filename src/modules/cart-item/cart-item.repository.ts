import { Injectable } from '@nestjs/common';
import { CartItem, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.CartItemCreateInput): Promise<CartItem> {
    return this.prisma.cartItem.create({ data, include: { product: true } });
  }

  public async update(
    cartItemId: number,
    data: Prisma.CartItemUpdateInput,
  ): Promise<CartItem> {
    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data,
      include: { product: true },
    });
  }

  public async delete(cartItemId: number): Promise<CartItem> {
    return this.prisma.cartItem.delete({
      where: { id: cartItemId },
      include: { product: true },
    });
  }

  public async getById(cartItemId: number): Promise<CartItem> {
    return this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
  }

  public async getMany(): Promise<CartItem[]> {
    return this.prisma.cartItem.findMany();
  }

  public async findByCartIdAndProductId(
    cartId: number,
    productId: number,
  ): Promise<CartItem> {
    return this.prisma.cartItem.findFirst({
      where: {
        cartId,
        productId,
      },
    });
  }
}
