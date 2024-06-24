import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './core/database.config';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [TypeOrmModule.forRoot(TYPEORM_CONFIG), ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
