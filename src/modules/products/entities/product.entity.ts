import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
/**
 * Paginación en listAll 
 * Instalar JWT
 * Buscar por nombre OK
 */
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number): string => value.toString(),
      from: (value: string): number => parseFloat(value),
    },
  })
  precio: number;

  @Column({ type: 'int', nullable: false })
  cantidad: number;

  @Column({ type: 'char', nullable: false,default:"A" })
  ubicacion: 'B' | 'A';

  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_actualizacion: Date;
}
