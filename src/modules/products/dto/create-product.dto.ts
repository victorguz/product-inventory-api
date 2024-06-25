import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the product', example: 'Product 1' })
  nombre: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The description of the product',
    example: 'This is a product',
    required: false,
  })
  descripcion?: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The price of the product', example: 9.99 })
  precio: number;

  @IsInt()
  @IsPositive()
  @Min(1)
  @ApiProperty({ description: 'The quantity of the product', example: 10 })
  cantidad: number;

  @IsIn(['B', 'A'])
  @ApiProperty({ description: 'Location of the product', example: 'A' })
  ubicacion: 'B' | 'A';
}
// Paginación en listAll
// Buscar por nombre
// Implementar JWT