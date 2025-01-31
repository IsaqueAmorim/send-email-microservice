import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { RepositoriesModule } from '../repositories/repositories.module';
import { EmailService } from 'src/domain/services/email/email.service';
import { DomainModule } from 'src/domain/domain.module';
import { EmailRepository } from '../repositories/prisma/email.repository';
import { PrismaClient } from '@prisma/client';
import { Controller } from './.controller';
import { RecipientController } from './recipient/recipient.controller';
import { TemplateController } from './template/template.controller';

@Module({
  imports: [DomainModule, RepositoriesModule],
  controllers: [EmailController, Controller, RecipientController, TemplateController],
  providers: [EmailRepository, EmailService, PrismaClient],
})
export class ControllersModule {}
