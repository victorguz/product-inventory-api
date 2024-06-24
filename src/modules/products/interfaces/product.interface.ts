import { ApiProperty } from "@nestjs/swagger";

export class ProductResponse {
    
    @ApiProperty({ example: 1, description: 'Product ID' })
    id: number;
    @ApiProperty({ example: 'Product 1', description: 'Product name' })
    nombre: string;
  
    @ApiProperty({
      example: 'This is a product',
      description: 'Product description',
      required: false,
    })
    descripcion: string;
  
    @ApiProperty({ example: 9.99, description: 'Product price' })
    precio: number;
  
    @ApiProperty({ example: 10, description: 'Product quantity' })
    cantidad: number;
  
    @ApiProperty({
      example: '2023-05-01T00:00:00Z',
      description: 'Product creation date',
    })
    fecha_creacion: Date;
  
    @ApiProperty({
      example: '2023-05-01T00:00:00Z',
      description: 'Product update date',
    })
    fecha_actualizacion: Date;
  }
  