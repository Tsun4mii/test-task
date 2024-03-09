import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { UserMapper } from './mapper/user.mapper';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  public async create(data: CreateUserDTO): Promise<User> {
    const mappedData = this.userMapper.fromCreateToCreateInput(data);
    return this.userRepository.create(mappedData);
  }

  public async update(userId: number, data: UpdateUserDTO): Promise<User> {
    const mappedData = this.userMapper.fromUpdateToUpdateInput(data);
    return this.userRepository.update(userId, mappedData);
  }

  public async delete(userId: number): Promise<User> {
    const userExist = await this.userRepository.getById(userId);
    if (!userExist) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.delete(userId);
  }

  public async getById(userId: number): Promise<User> {
    const userExist = await this.userRepository.getById(userId);
    if (!userExist) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return userExist;
  }

  public async getMany(): Promise<User[]> {
    return this.userRepository.getMany();
  }
}
