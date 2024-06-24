import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TYPEORM_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 7000,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  autoLoadEntities: true,
  synchronize: true, 
};
