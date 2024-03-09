import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductRepository } from './product.repository';
import { ProductMapper } from './mapper/product.mapper';

@Module({
  imports: [PrismaModule],
  providers: [ProductService, ProductRepository, ProductMapper],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
