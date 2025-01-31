import { Module } from '@nestjs/common';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { EmailService } from './domain/services/email/email.service';
import { DomainModule } from './domain/domain.module';
import { EmailRepository } from './infrastructure/repositories/prisma/email.repository';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from './prisma/prisma.module';
import { SenderController } from './infrastructure/controllers/sender/sender.controller';

@Module({
  imports: [RepositoriesModule, ControllersModule, DomainModule, PrismaModule],
  providers: [EmailService, EmailRepository, PrismaClient],
  controllers: [SenderController],
})
export class AppModule {}
