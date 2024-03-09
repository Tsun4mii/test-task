import { Prisma } from '@prisma/client';
import { CreateCartItemDTO } from '../dto/request/create.cart-item.dto';
import { UpdateCartItemDTO } from '../dto/request/update.cart-item.dto';

export class CartItemMapper {
  public fromCreateToCreateInput(
    data: CreateCartItemDTO,
  ): Prisma.CartItemCreateInput {
    return {
      cart: { connect: { id: data.cartId } },
      product: { connect: { id: data.productId } },
      quantity: data.quantity,
    };
  }

  public fromUpdateToUpdateInput(
    data: UpdateCartItemDTO,
  ): Prisma.CartItemUpdateInput {
    return {
      ...(data.cartId && { cart: { connect: { id: data.cartId } } }),
      ...(data.productId && { product: { connect: { id: data.productId } } }),
      quantity: data.quantity,
    };
  }
}
