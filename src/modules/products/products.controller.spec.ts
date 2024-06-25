import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: 1,
          nombre: 'Product 1',
          descripcion: 'This is a product',
          precio: 9.99,
          cantidad: 10,
          fecha_creacion: new Date(),
          fecha_actualizacion: new Date(),
        },
      ];
    }),
    findOne: jest.fn((id) => {
      return {
        id,
        nombre: 'Product 1',
        descripcion: 'This is a product',
        precio: 9.99,
        cantidad: 10,
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date(),
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn((id) => {
      return { id };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto: CreateProductDto = {
      nombre: 'New Product',
      descripcion: 'New product description',
      precio: 10.99,
      cantidad: 5,
    };
    expect(await controller.create(createProductDto)).toEqual({
      id: expect.any(Number),
      ...createProductDto,
    });
    expect(service.create).toHaveBeenCalledWith(createProductDto);
  });

  it('should return an array of products', async () => {
    expect(await controller.findAll()).toEqual([
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
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single product', async () => {
    const id = 1;
    expect(await controller.findOne(id.toString())).toEqual({
      id,
      nombre: 'Product 1',
      descripcion: 'This is a product',
      precio: 9.99,
      cantidad: 10,
      fecha_creacion: expect.any(Date),
      fecha_actualizacion: expect.any(Date),
    });
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a product', async () => {
    const updateProductDto: UpdateProductDto = {
      nombre: 'Updated Product',
      descripcion: 'Updated product description',
      precio: 11.99,
      cantidad: 8,
    };
    const id = 1;
    expect(await controller.update(id.toString(), updateProductDto)).toEqual({
      id,
      ...updateProductDto,
    });
    expect(service.update).toHaveBeenCalledWith(id, updateProductDto);
  });

  it('should remove a product', async () => {
    const id = 1;
    expect(await controller.remove(id.toString())).toEqual({ id });
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
