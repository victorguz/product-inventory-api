import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiTags, PartialType } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { ProductResponse } from './interfaces/product.interface';
import { FindAllProductsDto } from './dto/find-all-products.dto';

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
  findAll(@Query() params: FindAllProductsDto) {
    return this.productsService.findAll(params.pageSize, params.pageNumber);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ProductResponse, description: 'Product detail' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('findByName/:nombre')
  @ApiCreatedResponse({ type: ProductResponse, description: 'Product detail' })
  findByName(@Param('nombre') nombre: string) {
    return this.productsService.findByName(nombre);
  }

  @Put(':id')
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
