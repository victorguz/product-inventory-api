import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJs from 'crypto-js';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly repo: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    let { username, password } = createAuthDto;
    console.log(password);
    password = this.encrypt(password);
    console.log(password);
    console.log(this.decrypt(password));

    const user = this.repo.create({ username, password });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findBy({ id });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  encrypt(value: string) {
    return CryptoJs.AES.encrypt(value, 'myPassword').toString();
  }
  decrypt(value: string) {
    return CryptoJs.AES.decrypt(value, 'myPassword').toString(
      CryptoJs.enc.Utf8,
    );
  }

  async authenticate(username: string, password: string) {
    const user = await this.repo.findOneBy({ username });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const userPassword = this.decrypt(user.password);
    console.log(userPassword);

    if (userPassword !== password) {
      throw new BadRequestException(' wrong password');
    }
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '123455', expiresIn: '2h' },
    );
  }

  async isAuthenticated(token: string) {
    return this.jwtService.verify(token);
  }
}
