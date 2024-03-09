import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductModule } from '../product/product.module';
import { CartItemRepository } from './cart-item.repository';
import { CartItemService } from './cart-item.service';
import { CartItemMapper } from './mapper/cart-item.mapper';

@Module({
  imports: [PrismaModule, ProductModule],
  providers: [CartItemService, CartItemRepository, CartItemMapper],
  exports: [CartItemService],
})
export class CartItemModule {}
