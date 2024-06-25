import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumberString, IsOptional } from 'class-validator';

export class FindAllProductsDto {
  @IsNumberString({ no_symbols: true })
  @IsOptional()
  @ApiProperty({ description: 'The size of the page', example: 10 })
  pageSize: number;

  @IsNumberString({ no_symbols: true })
  @IsOptional()
  @ApiProperty({ description: 'The number of the page', example: 2 })
  pageNumber: number;
}
