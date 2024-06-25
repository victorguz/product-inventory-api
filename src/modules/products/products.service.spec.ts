import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  const mockProductRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue((product) => ({
      id: Date.now(),
      ...product,
    })),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        nombre: 'Product 1',
        descripcion: 'This is a product',
        precio: 9.99,
        cantidad: 10,
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date(),
      },
    ]),
    findOneBy: jest.fn().mockImplementation(({ id }) => {
      if (id === 1) {
        return Promise.resolve({
          id: 1,
          nombre: 'Product 1',
          descripcion: 'This is a product',
          precio: 9.99,
          cantidad: 10,
          fecha_creacion: new Date(),
          fecha_actualizacion: new Date(),
        });
      }
      return Promise.resolve(null);
    }),
    update: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto: CreateProductDto = {
      nombre: 'New Product',
      descripcion: 'New product description',
      precio: 10.99,
      cantidad: 5,
    };
    expect(await service.create(createProductDto)).toEqual({
      id: expect.any(Number),
      ...createProductDto,
    });
    expect(repository.create).toHaveBeenCalledWith(createProductDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should return an array of products', async () => {
    expect(await service.findAll()).toEqual([
      {
        id: 1,
        nombre: 'Product 1',
        descripcion: 'This is a product',
        precio: 9.99,
        cantidad: 10,
        fecha_creacion: expect.any(Date),
        fecha_actualizacion: expect.any(Date),
      },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single product', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual({
      id,
      nombre: 'Product 1',
      descripcion: 'This is a product',
      precio: 9.99,
      cantidad: 10,
      fecha_creacion: expect.any(Date),
      fecha_actualizacion: expect.any(Date),
    });
    expect(repository.findOneBy).toHaveBeenCalledWith({ id });
  });

  it('should throw a NotFoundException if product not found', async () => {
    const id = 2;
    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('should update a product', async () => {
    const updateProductDto: UpdateProductDto = {
      nombre: 'Updated Product',
      descripcion: 'Updated product description',
      precio: 11.99,
      cantidad: 8,
    };
    const id = 1;
    expect(await service.update(id, updateProductDto)).toEqual({
      id,
      ...updateProductDto,
    });
    expect(repository.update).toHaveBeenCalledWith(id, updateProductDto);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id });
  });

  it('should remove a product', async () => {
    const id = 1;
    expect(await service.remove(id)).toEqual({
      id,
      nombre: 'Product 1',
      descripcion: 'This is a product',
      precio: 9.99,
      cantidad: 10,
      fecha_creacion: expect.any(Date),
      fecha_actualizacion: expect.any(Date),
    });
    expect(repository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw a BadRequestException if id is not provided', async () => {
    await expect(service.findOne(null)).rejects.toThrow(BadRequestException);
  });
});
