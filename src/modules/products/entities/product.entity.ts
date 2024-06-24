import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
    
  @ApiProperty({ example: 1, description: 'Product ID' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'Product 1', description: 'Product name' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  nombre: string;

  @ApiProperty({
    example: 'This is a product',
    description: 'Product description',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ApiProperty({ example: 9.99, description: 'Product price' })
  @Column({ type: 'decimal', nullable: false })
  precio: number;

  @ApiProperty({ example: 10, description: 'Product quantity' })
  @Column({ type: 'int', nullable: false })
  cantidad: number;

  @ApiProperty({
    example: '2023-05-01T00:00:00Z',
    description: 'Product creation date',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @ApiProperty({
    example: '2023-05-01T00:00:00Z',
    description: 'Product update date',
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_actualizacion: Date;
}
