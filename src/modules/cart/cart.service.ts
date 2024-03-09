import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cart, CartItem } from '@prisma/client';
import { CartItemService } from '../cart-item/cart-item.service';
import { CreateCartItemDTO } from '../cart-item/dto/request/create.cart-item.dto';
import { CartRepository } from './cart.repository';
import { CreateCartDTO } from './dto/request/create.cart.dto';
import { UpdateCartItemDTO } from './dto/request/update.cart-item.dto';
import { CartMapper } from './mapper/cart.mapper';
import { CartWithItems } from './types/cart.with-items.type';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly cartMapper: CartMapper,
    private readonly cartItemService: CartItemService,
  ) {}

  public async create(data: CreateCartDTO): Promise<Cart> {
    const mappedData = this.cartMapper.fromCreateToCreateInput(data);
    return this.cartRepository.create(mappedData);
  }

  public async delete(cartId: number): Promise<Cart> {
    await this.checkRecordExist(cartId);
    return this.cartRepository.delete(cartId);
  }

  public async getById(cartId: number): Promise<CartWithItems> {
    return this.checkRecordExist(cartId);
  }

  public async getMany(): Promise<CartWithItems[]> {
    return this.cartRepository.getMany();
  }

  public async addItem(data: CreateCartItemDTO): Promise<CartItem> {
    await this.checkRecordExist(data.cartId);
    return this.cartItemService.create(data);
  }

  public async removeItem(
    cartId: number,
    productId: number,
  ): Promise<CartItem> {
    await this.checkRecordExist(cartId);
    return this.cartItemService.deleteCartIdAndProductId(cartId, productId);
  }

  public async updateItem(
    cartId: number,
    productId: number,
    data: UpdateCartItemDTO,
  ) {
    return this.cartItemService.update({
      cartId,
      productId,
      quantity: data.quantity,
    });
  }

  public async checkRecordExist(cartId: number): Promise<CartWithItems> {
    const cartExist = await this.cartRepository.getById(cartId);
    if (!cartExist) {
      throw new HttpException('Cart Not Found', HttpStatus.NOT_FOUND);
    }
    return cartExist;
  }
}
