import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EmailRepository } from 'src/infrastructure/repositories/prisma/email.repository';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [
    {
      provide: EmailRepository,
      useFactory() {
        return new EmailRepository(new PrismaClient());
      },
    },
    PrismaClient,
  ],
})
export class DomainModule {}
