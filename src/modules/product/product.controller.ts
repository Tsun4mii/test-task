import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { EntityNotFoundDTO } from 'src/common/dto/response/entity.not-found.dto';
import { CreateProductDTO } from './dto/request/create.product.dto';
import { UpdateProductDTO } from './dto/request/update.product.dto';
import { ProductResponseDTO } from './dto/response/product.response.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create product record' })
  @ApiCreatedResponse({
    description: 'New product created',
    type: ProductResponseDTO,
  })
  public async create(@Body() data: CreateProductDTO): Promise<Product> {
    return this.productService.create(data);
  }

  @Patch('/:productId')
  @ApiOperation({ summary: 'Update product record' })
  @ApiOkResponse({
    description: 'Updated product record',
    type: ProductResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Record not found',
    type: EntityNotFoundDTO,
  })
  public async update(
    @Param('productId', new ParseIntPipe()) productId: number,
    @Body() data: UpdateProductDTO,
  ): Promise<Product> {
    return this.productService.update(productId, data);
  }

  @Delete('/:productId')
  @ApiOperation({ summary: 'Delete product record' })
  @ApiOkResponse({
    description: 'Deleted product record',
    type: ProductResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Record not found',
    type: EntityNotFoundDTO,
  })
  public async delete(
    @Param('productId', new ParseIntPipe()) productId: number,
  ): Promise<Product> {
    return this.productService.delete(productId);
  }

  @Get('/:productId')
  @ApiOperation({ summary: 'Get product record by id' })
  @ApiOkResponse({
    description: 'Single product record',
    type: ProductResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Record not found',
    type: EntityNotFoundDTO,
  })
  public async getById(
    @Param('productId', new ParseIntPipe()) productId: number,
  ): Promise<Product> {
    return this.productService.getById(productId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all product records' })
  @ApiOkResponse({
    description: 'Multiple product record',
    type: ProductResponseDTO,
    isArray: true,
  })
  public async getMany(): Promise<Product[]> {
    return this.productService.getMany();
  }
}
