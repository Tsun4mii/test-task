import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './user.repository';
import { UserMapper } from './mapper/user.mapper';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserRepository, UserMapper],
  controllers: [UserController],
})
export class UserModule {}
