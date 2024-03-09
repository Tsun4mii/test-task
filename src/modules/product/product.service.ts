import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDTO } from './dto/request/create.product.dto';
import { UpdateProductDTO } from './dto/request/update.product.dto';
import { ProductMapper } from './mapper/product.mapper';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productMapper: ProductMapper,
  ) {}

  public async create(data: CreateProductDTO): Promise<Product> {
    const mappedData = this.productMapper.fromCreateToCreateInput(data);
    return this.productRepository.create(mappedData);
  }

  public async update(
    productId: number,
    data: UpdateProductDTO,
  ): Promise<Product> {
    await this.checkRecordExist(productId);
    const mappedData = this.productMapper.fromUpdateToUpdateInput(data);
    return this.productRepository.update(productId, mappedData);
  }

  public async delete(productId: number): Promise<Product> {
    await this.checkRecordExist(productId);
    return this.productRepository.delete(productId);
  }

  public async getById(productId: number): Promise<Product> {
    return this.checkRecordExist(productId);
  }

  public async getMany(): Promise<Product[]> {
    return this.productRepository.getMany();
  }

  public async checkRecordExist(productId: number): Promise<Product> {
    const productExist = await this.productRepository.getById(productId);
    if (!productExist) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return productExist;
  }
}
