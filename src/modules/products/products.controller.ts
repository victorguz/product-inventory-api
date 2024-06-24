import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiTags, PartialType } from '@nestjs/swagger';
import { GenericResponse } from 'src/interfaces/generic-response.interface';
import { Product } from './entities/product.entity';
import { ProductResponse } from './interfaces/product.interface';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductResponse, description: 'Product created' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiCreatedResponse({
    type: PartialType<Product[]>,
    description: 'Product list',
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ProductResponse, description: 'Product detail' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ProductResponse, description: 'Product updated' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ProductResponse, description: 'Product deleted' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
