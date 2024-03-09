import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CartItem } from '@prisma/client';
import { ProductService } from '../product/product.service';
import { CartItemRepository } from './cart-item.repository';
import { CreateCartItemDTO } from './dto/request/create.cart-item.dto';
import { UpdateCartItemDTO } from './dto/request/update.cart-item.dto';
import { CartItemMapper } from './mapper/cart-item.mapper';

@Injectable()
export class CartItemService {
  constructor(
    private readonly cartItemRepository: CartItemRepository,
    private readonly cartItemMapper: CartItemMapper,
    private readonly productService: ProductService,
  ) {}

  public async create(data: CreateCartItemDTO): Promise<CartItem> {
    await this.productService.checkRecordExist(data.productId);
    const cartItemExist =
      await this.cartItemRepository.findByCartIdAndProductId(
        data.cartId,
        data.productId,
      );
    if (cartItemExist) {
      return this.cartItemRepository.update(cartItemExist.id, {
        quantity: cartItemExist.quantity + data.quantity,
      });
    }
    const mappedData = this.cartItemMapper.fromCreateToCreateInput(data);
    return this.cartItemRepository.create(mappedData);
  }

  public async update(data: UpdateCartItemDTO): Promise<CartItem> {
    await this.productService.checkRecordExist(data.productId);
    const cartItemExist =
      await this.cartItemRepository.findByCartIdAndProductId(
        data.cartId,
        data.productId,
      );
    if (!cartItemExist) {
      throw new HttpException('Cart Not Found', HttpStatus.NOT_FOUND);
    }
    const mappedData = this.cartItemMapper.fromUpdateToUpdateInput(data);
    return this.cartItemRepository.update(cartItemExist.id, mappedData);
  }

  public async delete(cartItemId: number): Promise<CartItem> {
    await this.checkRecordExist(cartItemId);
    return this.cartItemRepository.delete(cartItemId);
  }

  public async deleteCartIdAndProductId(cartId: number, productId: number) {
    const itemExist = await this.cartItemRepository.findByCartIdAndProductId(
      cartId,
      productId,
    );
    if (!itemExist) {
      throw new HttpException('Cart Not Found', HttpStatus.NOT_FOUND);
    }
    return this.cartItemRepository.delete(itemExist.id);
  }

  public async findById(cartItemId: number): Promise<CartItem> {
    return this.checkRecordExist(cartItemId);
  }

  public async checkRecordExist(cartItemId: number): Promise<CartItem> {
    const cartItemExist = await this.cartItemRepository.getById(cartItemId);
    if (!cartItemExist) {
      throw new HttpException('Cart Not Found', HttpStatus.NOT_FOUND);
    }
    return cartItemExist;
  }
}
