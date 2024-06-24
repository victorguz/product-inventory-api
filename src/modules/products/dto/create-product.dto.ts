import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";


export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The name of the product', example: 'Product 1' })
    nombre: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'The description of the product', example: 'This is a product', required: false })
    descripcion?: string;
  
    @IsNumber()
    @Min(0)
    @ApiProperty({ description: 'The price of the product', example: 9.99 })
    precio: number;
  
    @IsInt()
    @Min(0)
    @ApiProperty({ description: 'The quantity of the product', example: 10 })
    cantidad: number;
  }