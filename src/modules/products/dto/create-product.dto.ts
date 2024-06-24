import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
  
    @IsString()
    @IsOptional()
    descripcion?: string;
  
    @IsNumber()
    @Min(0)
    precio: number;
  
    @IsInt()
    @Min(0)
    cantidad: number;
  }