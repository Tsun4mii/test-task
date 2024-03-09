import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  public async update(
    userId: number,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({ where: { id: userId }, data });
  }

  public async delete(userId: number): Promise<User> {
    return this.prisma.user.delete({ where: { id: userId } });
  }

  public async getById(userId: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  public async getMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
