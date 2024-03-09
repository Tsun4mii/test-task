import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CartRepository } from './cart.repository';
import { CartMapper } from './mapper/cart.mapper';
import { CartItemModule } from '../cart-item/cart-item.module';

@Module({
  imports: [PrismaModule, CartItemModule],
  providers: [CartService, CartRepository, CartMapper],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
