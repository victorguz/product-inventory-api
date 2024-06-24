import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './core/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORM_CONFIG),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
