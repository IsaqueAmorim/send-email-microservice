import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Module({
  exports: [RepositoriesModule],
  providers: [PrismaClient],
})
export class RepositoriesModule {}
