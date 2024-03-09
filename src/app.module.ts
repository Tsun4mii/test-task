import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartItemModule } from './modules/cart-item/cart-item.module';
import { CartModule } from './modules/cart/cart.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, ProductModule, CartModule, CartItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
