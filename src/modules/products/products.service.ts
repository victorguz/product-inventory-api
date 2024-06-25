import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll(pageSize: number, pageNumber: number): Promise<Product[]> {
    return this.productRepository.find({ take: pageSize, skip: pageNumber });
  }

  async findByName(nombre: string): Promise<Product> {
    if (!nombre) {
      throw new BadRequestException('nombre is required');
    }

    const product = await this.productRepository.findOneBy({ nombre });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findOne(id: number): Promise<Product> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    await this.productRepository.update(product.id, updateProductDto);
    return this.findOne(product.id);
  }

  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);
    await this.productRepository.delete(product.id);
    return product;
  }
}
