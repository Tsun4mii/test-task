import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Cart } from '@prisma/client';
import { EntityNotFoundDTO } from 'src/common/dto/response/entity.not-found.dto';
import { CartItemDTO } from '../cart-item/dto/entity/cart-item.dto';
import { CartService } from './cart.service';
import { AddCartItemDTO } from './dto/request/add.cart-item.dto';
import { CreateCartDTO } from './dto/request/create.cart.dto';
import { UpdateCartItemDTO } from './dto/request/update.cart-item.dto';
import { CartResponseDTO } from './dto/response/cart.response.dto';
import { CartWithItems } from './types/cart.with-items.type';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create cart record' })
  @ApiCreatedResponse({
    description: 'Created cart',
    type: CartResponseDTO,
  })
  async create(@Body() data: CreateCartDTO): Promise<Cart> {
    return this.cartService.create(data);
  }

  @Delete('/:cartId')
  @ApiOperation({ summary: 'Delete cart record' })
  async delete(
    @Param('cartId', new ParseIntPipe()) cartId: number,
  ): Promise<Cart> {
    return this.cartService.delete(cartId);
  }

  @Get('/:cartId')
  @ApiOperation({ summary: 'Get cart record by ID' })
  @ApiOkResponse({
    type: CartResponseDTO,
    description: 'Single cart record',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: EntityNotFoundDTO,
  })
  async getById(
    @Param('cartId', new ParseIntPipe()) cartId: number,
  ): Promise<CartWithItems> {
    return this.cartService.getById(cartId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all card records' })
  @ApiOkResponse({
    type: CartResponseDTO,
    description: 'Single cart record',
    isArray: true,
  })
  async getMany(): Promise<CartWithItems[]> {
    return this.cartService.getMany();
  }

  @Post('/:cartId/add/:productId')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiOkResponse({
    description: 'New item in cart',
    type: CartItemDTO,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: EntityNotFoundDTO,
  })
  async addItem(
    @Param('cartId', new ParseIntPipe()) cartId: number,
    @Param('productId', new ParseIntPipe()) productId: number,
    @Body() data: AddCartItemDTO,
  ) {
    return this.cartService.addItem({
      cartId,
      productId,
      quantity: data.quantity,
    });
  }

  @Delete('/:cartId/remove/:productId')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiOkResponse({
    description: 'Deleted item in cart',
    type: CartItemDTO,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: EntityNotFoundDTO,
  })
  async removeItem(
    @Param('cartId', new ParseIntPipe()) cartId: number,
    @Param('productId', new ParseIntPipe()) productId: number,
  ) {
    return this.cartService.removeItem(cartId, productId);
  }

  @Put('/:cartId/update/:productId')
  @ApiOperation({ summary: 'Update item in cart' })
  @ApiOkResponse({
    description: 'Updated item in cart',
    type: CartItemDTO,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: EntityNotFoundDTO,
  })
  async updateItem(
    @Param('cartId', new ParseIntPipe()) cartId: number,
    @Param('productId', new ParseIntPipe()) productId: number,
    @Body() data: UpdateCartItemDTO,
  ) {
    return this.cartService.updateItem(cartId, productId, data);
  }
}
